/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */
import baseReactComponent from "./base-react-components";
import Code from './codeEditor';

export default (editor, opts = {}) => {
    const dc = editor.DomComponents;
    const defaultType = dc.getType("default");
	const defaultModel = defaultType.model;
	const defaultView = defaultType.view;
	const { baseReactComponentModel, baseReactComponentView } = baseReactComponent(
		editor
	);
    dc.addType(opts.name, {
		...baseReactComponentModel,
		model: {
			defaults: {
				component: Code,
				resizable: false,
				editable: false,
				draggable: true,
				droppable: true,
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
		},
		view: baseReactComponentView,
		isComponent: (el) => el.tagName === "Code"
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