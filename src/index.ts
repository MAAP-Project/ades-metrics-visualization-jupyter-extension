import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';

import { LOCAL_KIBANA_URL_FLAT } from './constants';

// import { Message } from '@lumino/messaging';

import { Widget } from '@lumino/widgets';

/**
 * Activate the widgets example extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'ades-metrics-visualization',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    // Create a blank content widget inside of a MainAreaWidget
    const content = new Widget();
    content.addClass('ades-widget'); // new line
    const widget = new MainAreaWidget({ content });
    // Add an image element to the content
    // let iframe = document.createElement('iframe');
    // let text = document.createTextNode("Hello World");

    let div = document.createElement('div');
    div.classList.add('iframe-widget');
    let iframe = document.createElement('iframe');
    iframe.id = 'iframeid';
    iframe.src = LOCAL_KIBANA_URL_FLAT;
    div.appendChild(iframe);
    content.node.appendChild(div);
    // content.node.appendChild(text);

    widget.id = 'jupyter-ades';
    widget.title.label = 'ADES Metrics Visualization';
    widget.title.closable = true;

    // Add an application command
    const command: string = 'ades:open';
    app.commands.addCommand(command, {
      label: '',
      execute: () => {
        if (!widget.isAttached) {
          // Attach the widget to the main work area if it's not there
          app.shell.add(widget, 'main');
        }
        // Activate the widget
        app.shell.activateById(widget.id);
      },
    });

    // Add the command to the palette.
    palette.addItem({ command, category: 'Visualization' });
  },
};

export default extension;

// class ExampleWidget extends Widget {
//   constructor() {
//     super();
//     this.addClass('jp-example-view');
//     this.id = 'simple-widget-example';
//     this.title.label = 'AAH!';
//     this.title.closable = true;
//   }
//   readonly summary: HTMLParagraphElement;
//   async onUpdateRequest(): Promise<void> {
//     this.summary.innerText = "Hello World";
//  }
