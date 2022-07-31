/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */
import baseReactComponent from "./base-react-components";
import Code from './codeEditor';

export default (editor, opts = {}) => {
    const domc = editor.DomComponents;
    const defaultType = domc.getType("default");
	const defaultModel = defaultType.model;
	const defaultView = defaultType.view;
	const { baseReactComponentModel, baseReactComponentView } = baseReactComponent(
		editor
	);
    domc.addType(opts.name, {
		//...baseReactComponentModel,
		model: defaultModel.extend({
			defaults: {
				...defaultModel.prototype.defaults,
				component: Code,
				/*resizable: false,
				editable: false,
				draggable: true,
				droppable: true,*/
				traits: [
					{
					  type: "select",
					  name: "Language",
					  label: "Language",
					  changeProp: 1,
					  options: [
						{ value: "js", name: "javascript" },
						{ value: "html", name: "html" },
					  ],
					},
				  ],
			}
		},{
			isComponent: (el) => el.tagName === "Code"
		}),
		view: baseReactComponentView,
		/*view: defaultView.extend({
			init() {
				const comps = this.model.get('components');
		
				// Add a basic countdown template if it's not yet initialized
				if (!comps.length) {
				  comps.reset();
				  comps.add(Code);
				}
		
			  }
			
		}),*/
		
	});
//   model: defaultModel.extend({
// 	defaults: {
// 		...defaultModel.prototype.defaults,
// 		startFrom: c.startTime,
// 		timerLabel: c.timerLabel,
// 		displayLabels: c.displayLabels,
// 		labels: {
// 			labelDays: c.labelDays,
// 			labelHours: c.labelHours,
// 			labelMinutes: c.labelMinutes,
// 			labelSeconds: c.labelSeconds,
// 		},
// 		droppable: false,
// 		traits: [{
// 			label: 'Start',
// 			name: 'startFrom',
// 			changeProp: 1,
// 			type: 'datetime-local', // can be 'date'
// 		}, {
// 			label: 'Label',
// 			name: 'timerLabel',
// 			changeProp: 1,
// 		}, {
// 			label: 'Display labels',
// 			name: 'displayLabels',
// 			type: 'checkbox',
// 			changeProp: 1,
// 		}]
// 	},
// },
}
/*
editor.DomComponents.addType("Apexchart", {
	model: {
	  ...baseReactComponentModel,
	  defaults: {
		component: Apexchart,
		stylable: false,
		resizable: false,
		editable: false,
		draggable: true,
		droppable: true
	  }
	},
	view: baseReactComponentView,
	isComponent: (el) => el.tagName === "APEXCHART"
  });
  */