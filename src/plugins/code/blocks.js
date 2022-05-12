/* eslint-disable import/no-anonymous-default-export */
export default (editor, opts = {}) => {
    const bm = editor.BlockManager;
    const style = `<style>
    </style>
    `;
    bm.add(opts.name, {
      label: `
      <i class="fa fa-code"></i>
      <div class="gjs-block-label">
        ${opts.label}
      </div> 
      `,
      category: opts.category,
      content: `<div class = "code-container" data-gjs-type=${opts.name}>` ,
    });
  };
  