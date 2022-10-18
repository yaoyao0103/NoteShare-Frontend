import iconA from 'tui-image-editor/dist/svg/icon-a.svg';
import iconB from 'tui-image-editor/dist/svg/icon-b.svg';
import iconC from 'tui-image-editor/dist/svg/icon-c.svg';
import iconD from 'tui-image-editor/dist/svg/icon-d.svg';
import Cookie from '../../components/Cookies/Cookies';
import axios from '../../components/axios/axios';
import { message } from 'antd';

export default (editor, options = {}) => {
    const cookieParser = new Cookie(document.cookie)
    const remoteIcons = 'https://raw.githubusercontent.com/nhnent/tui.image-editor/production/dist/svg/';
    const opts = { ...{
      // TOAST UI's configurations
      // http://nhnent.github.io/tui.image-editor/latest/ImageEditor.html
      config: {},
  
      // Pass the editor constructor. By default, the `tui.ImageEditor` will be called
      constructor: '',
  
      // Label for the image editor (used in the modal)
      labelImageEditor: 'Image Editor',

      // Label for the OCR (used in the modal)
      labelOCR: 'OCR (Convert image to text)',
  
      // Label used on the apply button
      labelApply: 'Apply',

      // Label used on the run OCR button
      labelRunOCR: 'Run OCR',
  
      // Default editor height
      height: '650px',
  
      // Default editor width
      width: '100%',
  
      // Id to use to create the image editor command
      commandId1: 'tui-image-editor',

      // Id to use OCR command
      commandId2: 'OCR',
  
      // Icon used in the component toolbar
      toolbarIcon1: `<svg viewBox="0 0 24 24">
                      <path d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83 3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25z">
                      </path>
                    </svg>`,

      toolbarIcon2: `<svg width="24" height="24" viewBox="160 0 550 550">
      <g>
       <path d="m474.32 295.68h-248.64c-8.3984 0-15.68-6.7188-15.68-15.68 0-8.3984 6.7188-15.68 15.68-15.68h248.64c8.3984 0 15.68 6.7188 15.68 15.68 0 8.3984-6.7188 15.68-15.68 15.68z"/>
       <path d="m454.16 182-53.199-53.199c-2.8008-2.8008-6.7188-4.4805-11.199-4.4805h-117.6c-17.359 0-31.359 14-31.359 31.359v108.64h31.359v-100.8c0-4.4805 3.3594-7.8398 7.8398-7.8398h77.84v42c0 15.68 12.32 28 28 28h42v38.641h31.359v-71.121c-0.55859-4.4805-1.6797-8.3984-5.0391-11.199zm-65.52 12.32v-33.602l33.602 33.602z"/>
       <path d="m427.84 396.48c0 4.4805-3.3594 7.8398-7.8398 7.8398h-140c-4.4805 0-7.8398-3.3594-7.8398-7.8398v-54.32c0-8.3984-6.7188-15.68-15.68-15.68-8.3984 0-15.68 6.7188-15.68 15.68v62.16c0 17.359 14 31.359 31.359 31.359h155.68c17.359 0 31.359-14 31.359-31.359v-62.16c0-8.3984-6.7188-15.68-15.68-15.68-8.3984 0-15.68 6.7188-15.68 15.68z"/>
       <path d="m370.16 326.48h-66.641c-4.4805 0-7.8398-3.3594-7.8398-7.8398s3.3594-7.8398 7.8398-7.8398h66.641c4.4805 0 7.8398 3.3594 7.8398 7.8398s-3.9219 7.8398-7.8398 7.8398z"/>
       <path d="m350 357.84h-46.48c-4.4805 0-7.8398-3.3594-7.8398-7.8398s3.3594-7.8398 7.8398-7.8398h46.48c4.4805 0 7.8398 3.3594 7.8398 7.8398s-3.3594 7.8398-7.8398 7.8398z"/>
      </g>
     </svg>`,     
  
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
      onApplyButton: () => {},
  
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
    },  ...options };
  
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
  
    // Update image component toolbar
    const domc = editor.DomComponents;
    const typeImage = domc.getType('image').model;
    domc.addType('image', {
      model: {
        initToolbar() {
          typeImage.prototype.initToolbar.apply(this, arguments);
          const tb = this.get('toolbar');
          const tb1Exists = tb.some(item => item.command === commandId1);
          const tb2Exists = tb.some(item => item.command === commandId2);
  
          if (!tb1Exists) {
            tb.unshift({
              command: commandId1,
              label: opts.toolbarIcon1,
            });
            if (!tb2Exists){
              tb.unshift({
                command: commandId2,
                label: opts.toolbarIcon2,
              });
            }
            this.set('toolbar', tb);
          }
        }
      }
    })
  
    // Add the image editor command
    editor.Commands.add(commandId1, {
      run(ed, s, options = {}) {
        const { id } = this;
  
        if (!constr) {
          ed.log('TOAST UI Image editor not found', {
            level: 'error',
            ns: commandId1,
          });
          return ed.stopCommand(id);
        }
  
        this.editor = ed;
        this.target = options.target || ed.getSelected();
        const content = this.createContent();
        const title = opts.labelImageEditor;
        const btn = content.children[1];
        ed.Modal.open({ title, content })
          .getModel().once('change:open', () => ed.stopCommand(id));
        this.imageEditor = new constr(content.children[0], this.getEditorConfig());
        ed.getModel().setEditing(1);
        btn.onclick = () => this.applyChanges();
        opts.onApplyButton(btn);
      },
  
      stop(ed) {
        const { imageEditor } = this;
        imageEditor && imageEditor.destroy();
        ed.getModel().setEditing(0);
      },
  
      getEditorConfig() {
        const config = { ...opts.config };
        const path = this.target.get('src');
  
        if (!config.includeUI) config.includeUI = {};
        config.includeUI = {
          theme: {},
          ...config.includeUI,
          loadImage: { path, name: 1 },
          uiSize: { height, width },
        };
        if (hideHeader) config.includeUI.theme['header.display'] = 'none';
        if (icons) config.includeUI.theme = {
          ...config.includeUI.theme,
          ...icons,
        }
  
        return config;
      },
  
      createContent() {
        const content = document.createElement('div');
        content.style = 'position: relative';
        content.innerHTML = `
          <div></div>
          <button class="tui-image-editor__apply-btn" style="
            position: absolute;
            top: 0; right: 0;
            margin: 10px;
            background-color: #fff;
            font-size: 1rem;
            border-radius: 3px;
            border: none;
            padding: 10px 20px;
            cursor: pointer
          ">
            ${opts.labelApply}
          </button>
        `;
  
        return content;
      },
  
      applyChanges() {
        const { imageEditor, target, editor } = this;
        const { AssetManager } = editor;
  
        if (onApply) {
          onApply(imageEditor, target);
        } else {
          if (imageEditor.getDrawingMode() === 'CROPPER') {
            imageEditor.crop(imageEditor.getCropzoneRect()).then(() => {
              this.uploadImage(imageEditor, target, AssetManager);
            });
          } else {
            this.uploadImage(imageEditor, target, AssetManager);
          }
        }
      },
  
      uploadImage(imageEditor, target, am) {
        const dataURL = imageEditor.toDataURL();
        axios.put( '/picture/imgur', { base64: dataURL.split(',')[1] },
          {
            headers: {
              Authorization: 'Bearer ' + cookieParser.getCookieByName('token'),
            },
          }
        )
        .then(res => {
          let link = res.data.link;
          console.log("link", link)
          if (upload) {
            const file = this.dataUrlToBlob(dataURL);
            am.FileUploader().uploadFile({
              dataTransfer: { files: [file] }
            }, res => {
              const obj = res && res.data && res.data[0];
              const src = obj && (typeof obj === 'string' ? obj : obj.src);
              src && this.applyToTarget(src);
            });
          } else {
            addToAssets && am.add({
              src: link,
              name: (target.get('src') || '').split('/').pop(),
            });
            this.applyToTarget(link);
          }
        })
        .catch(err => {
          console.log(err);
        });
        
      },
  
      applyToTarget(result) {
        this.target.set({ src: result });
        this.editor.Modal.close();
      },
  
      dataUrlToBlob(dataURL) {
        const data = dataURL.split(',');
        const byteStr = window.atob(data[1]);
        const type = data[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteStr.length);
        const ia = new Uint8Array(ab);
  
        for (let i = 0; i < byteStr.length; i++) {
            ia[i] = byteStr.charCodeAt(i);
        }
  
        return new Blob([ab], { type });
      },
    });

    // Add the image editor command
    editor.Commands.add(commandId2, {
      run(ed, s, options = {}) {
        this.target = options.target || ed.getSelected();
        this.url = this.target.attributes.attributes.src;
        const { id } = this;
        const content = this.createContent();
        const title = opts.labelOCR;
        const applyBtn = content.children[1];
        const OCRBtn = content.children[2];

        ed.Modal.open({ title, content })
          .getModel().once('change:open', () => ed.stopCommand(id));
        applyBtn.onclick = () => this.applyOCR(ed);
        OCRBtn.onclick = () => this.OCR();
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
          <img src=${this.url} id="OCR-image" crossorigin="anonymous" style="
            position: relative;
            float: left;
            width: 48%;
            margin-left: .2em;
            margin-right: 1em;
          "></img>
          <div style="position: relative; border-color: #888; float: left;">
            <div>OCR Result</div>
            <textarea id = "OCR-result" rows="8" cols="42" style="
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

      OCR(){
        axios.get( `https://noteshare-backend.soselab.tw/ocr/getText?imageUrl=${this.url}`,
          {
            headers: {
              Authorization: 'Bearer ' + cookieParser.getCookieByName('token'),
            },
          }
        )
        .then(res => {
          message.destroy()
          message.success("Success!")
          this.OCRText = res.data.res;
          document.getElementById("OCR-result").value = this.OCRText;
          

        })
        .catch(err => {
          console.log(err);
        });
      },

      applyOCR(ed){
        const text = document.getElementById("OCR-result").value.replaceAll('\n', '<br />');
        const selected = ed.getSelected()
        const collection = selected.collection;
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
            style: { padding: '10px'},
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