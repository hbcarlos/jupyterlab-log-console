import { ReactWidget } from '@jupyterlab/apputils';
import { HTMLSelect } from '@jupyterlab/ui-components';
import * as React from 'react';

import { LogConsolePanel } from './logConsolePanel';
import { Level } from './log';

export class LogLevelSwitcher extends ReactWidget {
  
  private logConsolePanel: LogConsolePanel;
  private level: Level;

  constructor(logConsolePanel: LogConsolePanel) {
    super();
    this.addClass('jp-LogConsole-toolbarLogLevel');
    this.logConsolePanel = logConsolePanel;
    this.level = 'debug';
  }

  /**
   * Handle `change` events for the HTMLSelect component.
   */
  handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    this.level = event.target.value as any;
    this.logConsolePanel.setLevel(this.level);
    this.update();
  };

  /**
   * Handle `keydown` events for the HTMLSelect component.
   */
  handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.keyCode === 13) this.logConsolePanel.activate();
    this.update();
  };

  render(): JSX.Element {
    return (
      <>
        <label>Level:</label>
        <HTMLSelect
          className="jp-LogConsole-toolbarLogLevelDropdown"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          value={this.level}
          aria-label="Log level"
          options={[
            { label: "Debug", value: 'debug' },
            { label: "Info", value: 'info' },
            { label: "Warning", value: 'warning' },
            { label: "Error", value: 'error' },
            { label: "Critical", value: 'critical' }
          ]}
        />
      </>
    );
  }
}