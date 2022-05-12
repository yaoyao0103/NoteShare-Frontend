import ReactDOM from "react-dom";
import React from "react";

const Wrapper = (props) => {
  return React.createElement("wrapper");
};

export default (editor) => {
  const defaultType = editor.DomComponents.getType("default");

  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  const model = {
    ...defaultModel,
    toHTML(opts = {}) {
      this.attributes.tagName = this.attributes.type;
      return defaultModel.prototype.toHTML.apply(this, opts);
    }
  };

  const view = {
    ...defaultView,
    tagName: "div",
    init: function () {
      this._render();
      this.listenTo(
        this.model,
        "change:attributes change:src",
        this._render.bind(this)
      );

      this.model.get("components").on("add remove", this._render.bind(this));
    },

    getRenderTarget() {
      const { renderTarget } = this;
      if (renderTarget) return renderTarget;

      this.renderTarget = document.createElement("div");
      this.renderTarget.setAttribute("target", true);
      return this.renderTarget;
    },

    getChildrenContainer() {
      const { childrenContainer } = this;
      if (childrenContainer) return childrenContainer;

      this.childrenContainer = document.createElement("childc");

      return this.childrenContainer;
    },

    _getComponent() {
      const childrenWrapper = Wrapper();

      const props = {
        ...this.model.get("attributes"),
        children: [childrenWrapper]
      };

      const component = this.model.get("component");

      return React.createElement(component, props);
    },

    mount(c) {
      ReactDOM.render(c, this.getRenderTarget());
    },

    _render: function () {
      this.renderChildren();

      const c = this._getComponent();

      this.mount(c);

      const $childContainer = editor.$(this.getRenderTarget()).find("wrapper");
      $childContainer.empty();

      $childContainer.append(this.model.get("content"));

      this.model.get("components").each((child, i) => {
        $childContainer.append(child.view.el, { key: i });
      });

      this.el.appendChild(this.getRenderTarget());

      return c;
    },

    render: function () {
      this._render();
      return this;
    }
  };

  return {
    baseReactComponentModel: model,
    baseReactComponentView: view
  };
};
