import grapesjs from "grapesjs";
import gjsBlockBasic from "grapesjs-blocks-basic";
import $ from "jquery";
import { API_HOST } from ".";

//import typed from "grapesjs-typed";
//import tUIImageEditor from "grapesjs-tui-image-editor";
//import styleGradient from "grapesjs-style-gradient";
//import tabs from "grapesjs-tabs";
//import ckeditor from "grapesjs-plugin-ckeditor";
import tooltip from "grapesjs-tooltip";
import countdown from "grapesjs-component-countdown";
//import lorySlider from "grapesjs-lory-slider";
import styleFilter from "grapesjs-style-filter";

//import grapesjsBlockBootstrap from "grapesjs-blocks-bootstrap4";
import grapesjsPluginExport from "grapesjs-plugin-export";
import grapesjsStyleBg from "grapesjs-style-bg"
import grapesjsTouch from 'grapesjs-touch';

import {
  addEditorCommand,
  deviceManager,
  layerManager,
  panels,
  scripts,
  selectorManager,
  storageSetting,
  styleManager,
  styles,
  traitManager,
} from "./geditor_utils";
import tailwindComponent from "../plugins/tailwind";
import codeComponent from "../plugins/code";
import tUIImageEditor from "../plugins/tUIImageEditor";
import NoteAi from "../plugins/NoteAi";

export var editor = null;

async function geditorConfig(assets, noteId, version, isCollab, email, username, avatar, setQueue, previewMode){
  $(".panel__devices").html("");
  $(".panel__basic-actions").html("");
  $(".panel__editor").html("");
  $("#blocks").html("");
  $("#styles-container").html("");
  $("#layers-container").html("");
  $("#trait-container").html("");

  // Content for Preview
  const navbar = $("#navbar");
  const mainContent = $("#main-content");
  const panelTopBar = $("#main-content > .navbar-light");

  editor = grapesjs.init({
    noteId: noteId,
    isCollab: isCollab,
    email: email,
    username: username,
    avatar: avatar,
    setQueue: setQueue,
    url:`${API_HOST}`,
    container: "#editor",
    blockManager: {
      appendTo: "#blocks",
    },
    styleManager: styleManager,
    //layerManager: layerManager,
    traitManager: traitManager,
    //selectorManager: selectorManager,
    panels: panels,
    deviceManager: deviceManager,
    assetManager: { assets: assets, upload: false },
    storageManager: storageSetting(noteId, version),
    canvas: {
      styles: styles,
      scripts: scripts,
    },
    plugins: [
      tailwindComponent,
      gjsBlockBasic,
      //swiperComponent,
      //codeComponent,
      //typed,
      //styleGradient,
      //tabs,
      tooltip,
      countdown,
      tUIImageEditor,
      NoteAi,
      styleFilter,
      //grapesjsBlockBootstrap,
      grapesjsPluginExport,
      grapesjsStyleBg,
      grapesjsTouch,
    ],
    pluginsOpts: {
      tailwindComponent: {},
      gjsBlockBasic: {},
      codeComponent: {},
      countdown: {},
      styleGradient: {},
      tabs: {},
      tooltip: { blockTooltip: { label: 'Tooltip', category: 'Basic'}},
      countdown: {},
      tUIImageEditor: {},
      NoteAi:{},
      styleFilter: {},
      grapesjsBlockBootstrap: {},
      grapesjsPluginExport: {},
      grapesjsStyleBg: {},
    },
  });

  addEditorCommand(editor);

  editor.on("run:preview", () => {
    console.log("It will trigger when we click on preview icon");
    // This will be used to hide border
    editor.stopCommand("sw-visibility");
    // This will hide the sidebar view
    navbar.removeClass("sidebar");
    // This will make the main-content to be full width
    mainContent.removeClass("main-content");

    // This will hide top panel where we have added the button
    panelTopBar.addClass("d-none");
  });
  editor.on("stop:preview", () => {
    // This event is reverse of the above event.
    console.log("It will trigger when we click on cancel preview icon");
    editor.runCommand("sw-visibility");
    navbar.addClass("sidebar");
    mainContent.addClass("main-content");
    panelTopBar.removeClass("d-none");
  });

  let myCommand = editor.Commands.get("preview")

  setTimeout(() => {
    let categories = editor.BlockManager.getCategories();
    categories.each((category) => category.set("open", false));
    if(previewMode) myCommand.run(editor, {isDetailPreview:true})
  }, 1000);
  return editor;
};

export default geditorConfig;
