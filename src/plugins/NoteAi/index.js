import iconA from 'tui-image-editor/dist/svg/icon-a.svg';
import iconB from 'tui-image-editor/dist/svg/icon-b.svg';
import iconC from 'tui-image-editor/dist/svg/icon-c.svg';
import iconD from 'tui-image-editor/dist/svg/icon-d.svg';
import Cookie from '../../components/Cookies/Cookies';
import axios from '../../components/axios/axios';
import { message } from 'antd';
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

export default (editor, options = {}) => {
  require('dotenv').config()

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  delete configuration.baseOptions.headers['User-Agent'];
  const openai = new OpenAIApi(configuration);
  const cookieParser = new Cookie(document.cookie)

  const opts = {
    ...{
      // TOAST UI's configurations
      // http://nhnent.github.io/tui.image-editor/latest/ImageEditor.html
      config: {},

      // Pass the editor constructor. By default, the `tui.ImageEditor` will be called
      constructor: '',

      // Label for the image editor (used in the modal)
      labelImageEditor: 'Image Editor',

      // Label for the OCR (used in the modal)
      labelOCR: 'NS Auto Summary',

      // Label used on the apply button
      labelApply: 'Apply',

      // Label used on the run OCR button
      labelRunOCR: 'Send',

      // Default editor height
      height: '650px',

      // Default editor width
      width: '100%',

      // Id to use to create the image editor command
      commandId1: 'tui-image-editor',

      // Id to use OCR command
      commandId2: 'NSChatbot',

      // Icon used in the component toolbar
      toolbarIcon1: `<?xml version="1.0" ?><svg fill="none" height="15" viewBox="0 0 15 15" width="15" xmlns="http://www.w3.org/2000/svg"><path d="M5 8.5C5 8.22386 5.22386 8 5.5 8C5.77614 8 6 8.22386 6 8.5C6 8.77614 5.77614 9 5.5 9C5.22386 9 5 8.77614 5 8.5Z" fill="black"/><path d="M9 8.5C9 8.22386 9.22386 8 9.5 8C9.77614 8 10 8.22386 10 8.5C10 8.77614 9.77614 9 9.5 9C9.22386 9 9 8.77614 9 8.5Z" fill="black"/><path clip-rule="evenodd" d="M8 2.02242C10.8033 2.27504 13 4.63098 13 7.5V13.5C13 14.3284 12.3284 15 11.5 15H3.5C2.67157 15 2 14.3284 2 13.5V7.5C2 4.63098 4.19675 2.27504 7 2.02242V0H8V2.02242ZM5.5 7C4.67157 7 4 7.67157 4 8.5C4 9.32843 4.67157 10 5.5 10C6.32843 10 7 9.32843 7 8.5C7 7.67157 6.32843 7 5.5 7ZM9.5 7C8.67157 7 8 7.67157 8 8.5C8 9.32843 8.67157 10 9.5 10C10.3284 10 11 9.32843 11 8.5C11 7.67157 10.3284 7 9.5 7ZM11 12H4V11H11V12Z" fill="black" fill-rule="evenodd"/><path d="M0 8V12H1V8H0Z" fill="black"/><path d="M15 8H14V12H15V8Z" fill="black"/></svg>`,

      toolbarIcon2: `<?xml version="1.0" ?><svg fill="none" height="15" viewBox="0 0 15 15" width="15" xmlns="http://www.w3.org/2000/svg"><path d="M5 8.5C5 8.22386 5.22386 8 5.5 8C5.77614 8 6 8.22386 6 8.5C6 8.77614 5.77614 9 5.5 9C5.22386 9 5 8.77614 5 8.5Z" fill="black"/><path d="M9 8.5C9 8.22386 9.22386 8 9.5 8C9.77614 8 10 8.22386 10 8.5C10 8.77614 9.77614 9 9.5 9C9.22386 9 9 8.77614 9 8.5Z" fill="black"/><path clip-rule="evenodd" d="M8 2.02242C10.8033 2.27504 13 4.63098 13 7.5V13.5C13 14.3284 12.3284 15 11.5 15H3.5C2.67157 15 2 14.3284 2 13.5V7.5C2 4.63098 4.19675 2.27504 7 2.02242V0H8V2.02242ZM5.5 7C4.67157 7 4 7.67157 4 8.5C4 9.32843 4.67157 10 5.5 10C6.32843 10 7 9.32843 7 8.5C7 7.67157 6.32843 7 5.5 7ZM9.5 7C8.67157 7 8 7.67157 8 8.5C8 9.32843 8.67157 10 9.5 10C10.3284 10 11 9.32843 11 8.5C11 7.67157 10.3284 7 9.5 7ZM11 12H4V11H11V12Z" fill="black" fill-rule="evenodd"/><path d="M0 8V12H1V8H0Z" fill="black"/><path d="M15 8H14V12H15V8Z" fill="black"/></svg>`,

      // Hide the default editor header
      hideHeader: 1,

      // By default, GrapesJS takes the modified image, adds it to the Asset Manager and update the target.
      // If you need some custom logic you can use this custom 'onApply' function
      // eg.
      // onApply: (imageEditor, imageModel) => {
      //   const dataUrl = imageEditor.toDataURL();
      //   editor.AssetManager.add({ src: dataUrl }); // Add it to Assets
      //   imageModel.set('src', dataUrl); // Update the image component
      // }
      onApply: 0,

      // If no custom `onApply` is passed and this option is `true`, the result image will be added to assets
      addToAssets: 1,

      // If no custom `onApply` is passed, on confirm, the edited image, will be passed to the AssetManager's
      // uploader and the result (eg. instead of having the dataURL you'll have the URL) will be
      // passed to the default `onApply` process (update target, etc.)
      upload: 0,

      // The apply button (HTMLElement) will be passed as an argument to this function, once created.
      // This will allow you a higher customization.
      onApplyButton: () => { },

      // The TOAST UI editor isn't compiled with icons, so generally, you should download them and indicate
      // the local path in the `includeUI.theme` configurations.
      // Use this option to change them or set it to `false` to keep what is come in `includeUI.theme`
      // By default, the plugin will try to use the editor's remote icons (which involves a cross-origin async
      // request, indicated as unsafe by most of the browsers)
      icons: {
        'menu.normalIcon.path': iconD,
        'menu.activeIcon.path': iconB,
        'menu.disabledIcon.path': iconA,
        'menu.hoverIcon.path': iconC,
        'submenu.normalIcon.path': iconD,
        'submenu.activeIcon.path': iconC,
      },

      // Scripts to load dynamically in case no TOAST UI editor instance was found
      script: [
        'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.6.7/fabric.min.js',
        'https://uicdn.toast.com/tui.code-snippet/v1.5.0/tui-code-snippet.min.js',
        'https://uicdn.toast.com/tui-color-picker/v2.2.0/tui-color-picker.min.js',
        'https://uicdn.toast.com/tui-image-editor/v3.4.0/tui-image-editor.min.js'
      ],

      // In case the script is loaded this style will be loaded too
      style: [
        'https://uicdn.toast.com/tui-color-picker/v2.2.0/tui-color-picker.min.css',
        'https://uicdn.toast.com/tui-image-editor/v3.4.0/tui-image-editor.min.css'
      ],
    }, ...options
  };

  const { script, style, height, width, hideHeader, icons, onApply, upload, addToAssets, commandId1, commandId2 } = opts;
  const getConstructor = () => opts.constructor || (window.tui && window.tui.ImageEditor);
  let constr = getConstructor();

  // Dynamic loading of the image editor scripts and styles
  if (!constr && script) {
    const { head } = document;
    const scripts = Array.isArray(script) ? [...script] : [script];
    const styles = Array.isArray(style) ? [...style] : [style];
    const appendStyle = styles => {
      if (styles.length) {
        const link = document.createElement('link');
        link.href = styles.shift();
        link.rel = 'stylesheet';
        head.appendChild(link);
        appendStyle(styles);
      }
    }
    const appendScript = scripts => {
      if (scripts.length) {
        const scr = document.createElement('script');
        scr.src = scripts.shift();
        scr.onerror = scr.onload = appendScript.bind(null, scripts);
        head.appendChild(scr);
      } else {
        constr = getConstructor();
      }
    }
    appendStyle(styles);
    appendScript(scripts);
  }

  // Update text component toolbar
  const domc = editor.DomComponents;
  const typeImage = domc.getType('text').model;
  domc.addType('text', {
    model: {
      initToolbar() {
        typeImage.prototype.initToolbar.apply(this, arguments);
        const tb = this.get('toolbar');

        const tb2Exists = tb.some(item => item.command === commandId2);



        if (!tb2Exists) {
          tb.unshift({
            command: commandId2,
            label: opts.toolbarIcon2,
          });

          this.set('toolbar', tb);
        }
      }
    }
  })

  // Add the image editor command
  editor.Commands.add(commandId2, {
    run(ed, s, options = {}) {
      this.target = options.target || ed.getSelected();
      this.url = this.target.attributes.attributes.src;
      const { id } = this;
      const content = this.createContent();
      const title = opts.labelOCR;
      const applyBtn = content.children[1];
      const SendBtn = content.children[2];

      ed.Modal.open({ title, content })
        .getModel().once('change:open', () => ed.stopCommand(id));
      applyBtn.onclick = () => this.applyOCR(ed);
      SendBtn.onclick = () => this.handleSubmit(ed);
    },

    createContent() {
      const url = this.target.attributes.attributes.src;
      const content = document.createElement('div');
      content.style = 'position: relative';
      content.innerHTML = `
          <div style="
            position: relative;
            width: 100%;
            height: 100%;
            
        ">
      
          <div style="position: relative; border-color: #888; float: left;">
            <div>Summarize</div>
            <textarea id = "Ai-result" rows="8" cols="42" style="
              position: relative;
              border-color: #888;"
            ></textarea>
          </div>
          
        </div>
          <button class="tui-image-editor__run-btn" style="
            position: relative;
            float: right;
            margin: 10px;
            background-color: #fff;
            font-size: 1rem;
            border-radius: 3px;
            border: solid thin;
            padding: 10px 20px;
            cursor: pointer
          ">
            ${opts.labelApply}
          </button>
          <button class="tui-image-editor__run-btn" style="
            position: relative;
            float: right;
            margin: 10px;
            background-color: #fff;
            font-size: 1rem;
            border-radius: 3px;
            border: solid thin;
            padding: 10px 20px;
            cursor: pointer
          ">
            ${opts.labelRunOCR}
          </button>
        `;

      return content;
    },
    async handleSubmit(ed) {
      const selected = ed.getSelected()
      const selectedId = selected.attributes.attributes.id;

      const selectedHtml = selected.collection.em.cacheLoad.html
      console.log(selectedHtml)
      const parser = new DOMParser();
      let tempObject = parser.parseFromString(selectedHtml, 'text/html');
      console.log(tempObject)
      let originalText = tempObject.getElementById(selectedId).innerText;
      console.log(originalText)
      try {
        let result = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{
            "role": "system",
            "content": "Create advanced bullet-point notes summarizing the important parts of the reading or topic. Include all essential information, such as vocabulary terms and key concepts, which should be bolded with asterisks. Remove any extraneous language, focusing only on the critical aspects of the passage or topic. Strictly base your notes on the provided text, without adding any external information."
          },
          { role: "user", content: `{${originalText}}` }],
          temperature: 0.5,
          max_tokens: 1024,

        });
        result=result.data.choices[0].message.content;
        console.log(result)
        //console.log("response", result.data.choices[0].text);
        this.AiMessage = result
        message.destroy()
        message.success("Success!");
        document.getElementById("Ai-result").value = this.AiMessage;
      } catch (error) {
        console.log(error);
        this.AiMessage = "Something is going wrong, Please try again.";
      }
    },
    // getAllChildText(node){
    //   if(node.hasChildNodes){


    //   }



    // },
    applyOCR(ed) {
      let text = document.getElementById("Ai-result").value.replaceAll('\n', '<br />');
      const selected = ed.getSelected()
      const collection = selected.collection;
      const selectedId = selected.attributes.attributes.id;
      const selectedHtml = selected.collection.em.cacheLoad.html
      const parser = new DOMParser();
      let tempObject = parser.parseFromString(selectedHtml, 'text/html');
      let originalText = tempObject.getElementById(selectedId).innerText;
      console.log(originalText)
      text = originalText + '<br />' + text
      const index = collection.indexOf(selected);
      const parent = selected.parent();
      const dstId = parent.ccid;
      const dst = parent.view.$el[0];
      let tmpNode = document.createElement('div');
      tmpNode.appendChild(dst.cloneNode());
      let dstString = tmpNode.innerHTML;
      console.log("dat", dstString)
      const opts = {
        dragInfo: true,
        draggable: true,
        dropContent: {
          activeOnRender: 1,
          content: text,
          style: { padding: '10px' },
          type: "text",
        },
        dropInfo: true,
        droppable: true,
        dst: dstString,
        dstId: dstId,
        pos: {
          index: index,
          indexEl: index,
          method: 'before'
        },
        idArray: []
      }
      console.log("...opts", opts)
      const droppable = ed.getModel().getCurrentFrame().droppable;
      droppable.applyAppendText(opts, 'add-component');

      ed.runCommand('core:component-delete');
      ed.Modal.close();
    }

  })
};