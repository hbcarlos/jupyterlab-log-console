import React, { useState } from 'react';

export type Level = 'checkpoint' | 'debug' | 'info' | 'warning' | 'error' | 'critical';

export type LogMessage = {
  date: Date,
  level: Level,
  name: string,
  file: string,
  line: number,
  msg: string,
  toggled: boolean
};

type Props = {
  log: LogMessage;
};

export const Log: React.FC<Props> = (props): JSX.Element => {
  const { log } = props;
  const [toggled, setToggled] = useState(log.toggled);

  const open = ():void => {
    log.toggled = !log.toggled;
    setToggled(log.toggled);
  }

  const title = log.date.toLocaleDateString()+" "+log.date.toLocaleTimeString()+"; "+log.level+" level";

  return (
    <a href="#" onClick={open} className="lm-Widget p-Widget lm-Panel p-Panel jp-OutputArea-child">
      <div title={title}
          data-log-level={log.level}
          className="jp-OutputArea-prompt"
          style={{width: "55px"}}>
        { !toggled ?
          <div style={{width: "55px"}}>{log.date.toLocaleTimeString()}</div>
          :
          <div style={{width: "55px"}}>{log.date.toLocaleTimeString()}</div>
        }
      </div>
      { !toggled ?
        <div className="jp-RenderedText jp-OutputArea-output">
          <pre>
            <span>{log.name}; {log.file.split('/').pop()}:ln {log.line}</span>
          </pre>
          <pre>
            { log.msg.length < 50 ?
              <span>{log.msg}</span>
              :
              <span>{log.msg.substr(0, 50)}...</span>
            }
          </pre>
        </div>
        :
        <div className="jp-RenderedText jp-OutputArea-output">
          <table>
            <tbody>
              <tr>
                <th>Node:</th>
                <td>{log.name}</td>
              </tr>
              <tr>
                <th>File:</th>
                <td>{log.file}:ln {log.line}</td>
              </tr>
              <tr>
                <th>Message:</th>
                <td><pre>{log.msg}</pre></td>
              </tr>
            </tbody>
          </table>
        </div>
      }
    </a>
  );
}

export const Checkpoint: React.FC<Props> = (props): JSX.Element => {
  const { log } = props;

  const title = log.date.toLocaleDateString()+" "+log.date.toLocaleTimeString()+"; debug level";

  return (
    <div className="lm-Widget p-Widget lm-Panel p-Panel jp-OutputArea-child">
      <div title={title}
          data-log-level={'debug'}
          style={{ width: "80px"}}
          className="lm-Widget p-Widget jp-OutputArea-prompt" >
        <div>{log.date.toLocaleTimeString()}</div>
      </div>
      <div className="lm-Widget p-Widget jp-RenderedText jp-OutputArea-output">
        <pre>
          <hr/>
        </pre>
      </div>
    </div>
  );
}