import { JupyterFrontEnd } from '@jupyterlab/application';
import { MainAreaWidget, CommandToolbarButton } from '@jupyterlab/apputils';
import { listIcon, } from '@jupyterlab/ui-components';

import { LogConsolePanel } from './logConsolePanel';
import { LogLevelSwitcher } from './logLevelSwitcher';
import { LogMessage } from './log';

export class LogConsoleWidget extends MainAreaWidget<LogConsolePanel> {
  
  private levelSwitcher: LogLevelSwitcher;

  constructor(app: JupyterFrontEnd) {
    super({ content: new LogConsolePanel() });
    this.addClass('jp-logConsole');
    this.id = 'jupyterlab-log-console/widget';
    this.title.closable = true;
    this.title.label = 'Log console';
    this.title.icon = listIcon;

    this.levelSwitcher = new LogLevelSwitcher(this.content);

    // Adding the buttons in widget toolbar
    this.toolbar.addItem('checkpoint',
      new CommandToolbarButton({commands: app.commands, id: 'jupyterlab-log-console:checkpoint'})
    );
    this.toolbar.addItem('clear', 
      new CommandToolbarButton({commands: app.commands, id: 'jupyterlab-log-console:clear'})
    );
    this.toolbar.addItem('level', this.levelSwitcher);
  }

  public checkpoint = (): void => {
    const log: LogMessage = {
      date: new Date(),
      level: 'checkpoint',
      name: "",
      file: "",
      line: 0,
      msg: "",
      toggled: false
    };
    this.content.setLog(log);
  }
  
  public clear = (): void => {
    this.content.setLogs([]);
  }

  public sendMessage = (msg: LogMessage): void => {
    this.content.setLog(msg);
  }
}