import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';

import { Widget } from '@lumino/widgets';
import { getKibanaURL } from './utils';


/**
 * Initialization data for the ades-metrics-visualization extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'ades-metrics-visualization:plugin',
  autoStart: true,
  requires: [ICommandPalette],
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette, settingRegistry: ISettingRegistry | null) => {
    const { commands } = app;
    const command: string = 'ades:open';
    commands.addCommand(command, {
      label: 'ADES Metrics Visualization',
      execute: () => {
        const content = new Widget();
        const widget = new MainAreaWidget({ content });

        let kibanaUrl = ""

        let res = getKibanaURL()
        res.then((data) => {
          kibanaUrl = data["KIBANA_URL"]

          let div = document.createElement('div');
          div.classList.add('iframe-widget');
          let iframe = document.createElement('iframe');
          iframe.id = 'iframeid';
          iframe.src = kibanaUrl;
          div.appendChild(iframe);
          content.node.appendChild(div);

          widget.id = 'jupyter-ades';
          widget.title.label = 'ADES Metrics';
          widget.title.closable = true;

          app.shell.add(widget, 'main');
          app.shell.activateById(widget.id);

        })


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

    console.log('JupyterLab extension ades-metrics-visualization is activated!');
  }
};

export default plugin;
