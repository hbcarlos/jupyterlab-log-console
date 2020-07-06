import { ReactWidget } from '@jupyterlab/apputils';
import { UUID } from '@lumino/coreutils';
import React from 'react';

import { Log, Checkpoint, LogMessage, Level } from './log';

export class LogConsolePanel extends ReactWidget {
  
  private level: Level;
  private logs: LogMessage[];

  constructor() {
    super();
    this.addClass('jp-LogConsolePanel');

    this.level = 'debug';
    this.logs = [];
  }

  public setLevel = (level: Level): void => {
    this.level = level;
    this.update();
  }

  public setLogs = (logs: LogMessage[]): void => {
    this.logs = logs;
    this.update();
  }

  public setLog = (log: LogMessage): void => {
    this.logs.push(log);
    this.update();
  }

  render(): JSX.Element {
    const logsLevel: JSX.Element[] = [];

    for(let i=0; i<this.logs.length; i++) {
      if (this.logs[i].level == 'checkpoint') {
        logsLevel.push(<Checkpoint key={UUID.uuid4()} log={this.logs[i]}/>);
      
      } else if (this.logs[i].level >= this.level) {
        logsLevel.push(<Log key={UUID.uuid4()} log={this.logs[i]}/>);
      }
    }

    return (
      <div className="lm-Widget p-Widget jp-Scrolling lm-StackedPanel-child p-StackedPanel-child">
        <div className="lm-Widget p-Widget jp-OutputArea">
          { logsLevel }
        </div>
      </div>
    );
  }
}