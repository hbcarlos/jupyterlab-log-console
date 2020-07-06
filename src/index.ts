import { JupyterFrontEnd, JupyterFrontEndPlugin, ILayoutRestorer } from '@jupyterlab/application';
import { ICommandPalette, WidgetTracker } from '@jupyterlab/apputils';
import { addIcon, clearIcon, listIcon } from '@jupyterlab/ui-components';

import { LogConsoleWidget } from './logConsoleWidget';
import { LogMessage } from './log';

const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-log-console',
  autoStart: true,
  requires: [ICommandPalette, ILayoutRestorer],
  optional: [],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette, restorer: ILayoutRestorer) => {
    const { commands } = app;

    let widget: LogConsoleWidget = null;

    const tracker = new WidgetTracker<LogConsoleWidget>({
      namespace: 'jupyterlab-log-console'
    });

    restorer.restore(tracker, {
      command: 'jupyterlab-log-console:open',
      name: () => 'jupyterlab-log-console'
    });

    // Creating some buttons for the widget toolbar
    commands.addCommand('jupyterlab-log-console:checkpoint', {
      execute: () => widget?.checkpoint(),
      icon: addIcon,
      label: 'Add Checkpoint'
    });

    commands.addCommand('jupyterlab-log-console:clear', {
      execute: () =>  widget?.clear(),
      icon: clearIcon,
      label: 'Clear Log'
    });

    commands.addCommand('jupyterlab-log-console:sendMessage', {
      execute: (args: any) =>  widget?.sendMessage(args as LogMessage),
      icon: listIcon,
      label: 'Send log message'
    });

    commands.addCommand('jupyterlab-log-console:open', {
      label: 'Log Console',
      caption: 'Log console.',
      isVisible: () => true,
      isEnabled: () => true,
      isToggled: () => widget !== null,
      execute: () => {
        if (widget) {
          widget.dispose();
        } else {
          widget = new LogConsoleWidget(app);

          widget.disposed.connect(() => {
            widget = null;
            commands.notifyCommandChanged();
          });

          app.shell.add(widget, 'main', { mode: 'split-bottom' });
          tracker.add(widget);

          widget.update();
          commands.notifyCommandChanged();
        }
      }
    });

    palette.addItem({ command: 'jupyterlab-log-console:open', category: 'Extensions' });
  }
};

export default extension;