import grapesjs from "grapesjs-clot";
import loadComponents from "./components";
import loadBlocks from "./blocks";

export default grapesjs.plugins.add("codeComponent", (editor, opts = {}) => {
  let options = {
    label: "Code",
    name: "Code",
    category: "Custom",
  };
  for (let name in options) {
    if (!(name in opts)) opts[name] = options[name];
  }

  loadBlocks(editor, options);
  loadComponents(editor, opts);
});
