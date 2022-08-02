/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */
import baseReactComponent from "./base-react-components";
import Code from './codeEditor';

export default function(editor, opt = {}) {
	const c = opt;
	const domc = editor.DomComponents;
	const defaultType = domc.getType('default');
	const defaultModel = defaultType.model;
	const defaultView = defaultType.view;
	const CODE_TYPE = 'code';

	domc.addType(CODE_TYPE, {
  
	  model: defaultModel.extend({
		defaults: {
		  ...defaultModel.prototype.defaults,
		  resizable: true,
		  component: Code,
		  language: 'js',
		  traits: [
			{
			  type: "select",
			  name: "language",
			  label: "Language",
			  changeProp: 1,
			  options: [
				{ value: "js", name: "javascript" },
				{ value: "html", name: "html" },
			  ],
			},
		  ],
		  script: function() {
			var language = '{[ language ]}';
			const setCodeMode = () => {
				console.log("Set:", language)
			}
			setCodeMode(language)
		  }
		},
	  }),
  
  
	  view: defaultView.extend({
		init() {
			this.listenTo(this.model, 'change:language', this.updateScript);
			const comps = this.model.get('components');
		}
	  }),

	isComponent(el) {
		if(el.getAttribute &&
		el.getAttribute('data-gjs-type') == CODE_TYPE) {
		return {
			type: CODE_TYPE
		};
		}
	},
	});
  }
  