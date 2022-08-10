import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';

import { Widget } from '@lumino/widgets';


import { LOCAL_KIBANA_URL } from './constants';

/**
 * Initialization data for the ades-metrics-visualization extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'ades-metrics-visualization:plugin',
  autoStart: true,
  requires: [ICommandPalette],
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension ades-metrics-visualization is activated!');

    const content = new Widget();
    content.addClass('ades-widget');
    const widget = new MainAreaWidget({ content });

    let div = document.createElement('div');
    div.classList.add('iframe-widget');
    let iframe = document.createElement('iframe');
    iframe.id = 'iframeid';
    iframe.src = LOCAL_KIBANA_URL;
    div.appendChild(iframe);
    content.node.appendChild(div);


    widget.id = 'jupyter-ades';
    widget.title.label = 'ADES Metrics';
    widget.title.closable = true;

    const { commands } = app;
    const command: string = 'ades:open';
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

export default plugin;
