"use strict";
(self["webpackChunk_maap_jupyterlab_ades_metrics_visualization_jupyter_extension"] = self["webpackChunk_maap_jupyterlab_ades_metrics_visualization_jupyter_extension"] || []).push([["lib_index_js"],{

/***/ "./lib/constants.js":
/*!**************************!*\
  !*** ./lib/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LOCAL_KIBANA_URL": () => (/* binding */ LOCAL_KIBANA_URL)
/* harmony export */ });
const LOCAL_KIBANA_URL = "http://127.0.0.1:5601/app/kibana#/dashboard/b36164e0-084a-11ed-b94b-3fac263ccc8c?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow%2Fw%2Cto%3Anow%2Fw))";


/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./lib/constants.js");




/**
 * Initialization data for the ades-metrics-visualization extension.
 */
const plugin = {
    id: 'ades-metrics-visualization:plugin',
    autoStart: true,
    requires: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette],
    optional: [_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0__.ISettingRegistry],
    activate: (app, palette, settingRegistry) => {
        console.log('JupyterLab extension ades-metrics-visualization is activated!');
        const content = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Widget();
        content.addClass('ades-widget');
        const widget = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MainAreaWidget({ content });
        let div = document.createElement('div');
        div.classList.add('iframe-widget');
        let iframe = document.createElement('iframe');
        iframe.id = 'iframeid';
        iframe.src = _constants__WEBPACK_IMPORTED_MODULE_3__.LOCAL_KIBANA_URL;
        div.appendChild(iframe);
        content.node.appendChild(div);
        widget.id = 'jupyter-ades';
        widget.title.label = 'ADES Metrics';
        widget.title.closable = true;
        const { commands } = app;
        const command = 'ades:open';
        commands.addCommand(command, {
            label: 'ADES Metrics Visualization',
            execute: () => {
                if (!widget.isAttached) {
                    // Attach the widget to the main work area if it's not there
                    app.shell.add(widget, 'main');
                }
                // Activate the widget
                app.shell.activateById(widget.id);
            },
        });
        if (settingRegistry) {
            settingRegistry
                .load(plugin.id)
                .then(settings => {
                console.log('ades-metrics-visualization settings loaded:', settings.composite);
            })
                .catch(reason => {
                console.error('Failed to load settings for ades-metrics-visualization.', reason);
            });
        }
        palette.addItem({ command, category: 'Tutorial' });
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);


/***/ })

}]);
//# sourceMappingURL=lib_index_js.5fee0ff40a978d6fd6d3.js.map