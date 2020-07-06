# jupyterlab log console

JupyterLab log console extension for other extensions and python programs using ipylab.


## Requirements

## Install

## Usage

```ts
// app: JupyterFrontEnd

const msg: any = {
    date: new Date(),
    level: 'debug', // 'debug' | 'info' | 'warning' | 'error' | 'critical'
    name: "Error: ...",
    file: "untitled.py",
    line: 1,
    msg: "Message trace",
    toggled: false
};

app.commands.execute('jupyterlab-log-console:sendMessage', msg);
```

## Contributing

### Install

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Move to jupyterlab-log-console directory

# Install frontend extension dependencies
jlpm
# Build Typescript frontend source
jlpm build
# Link your development version of the extension with JupyterLab
jupyter-labextension link .
```

You can watch the source directory and run JupyterLab in watch mode to watch for changes in the extension's source and automatically rebuild the extension and application.

```bash
# Watch the source directory in another terminal tab
jlpm watch
# Run jupyterlab in watch mode in one terminal tab
jupyter-lab --watch
```

### Uninstall

```bash
# Uninstalling the frontend extension
jupyter-labextension uninstall jupyterlab-ros

# Cleaning jupyterlab
jupyter lab clean
jupyter lab build
```
