# Project Runner

A Node.js tool built to emulate the functionality of the NPM package nodemon, which automatically re-executes scripts on change.

## Usage

Use the command `runit` followed by an optional file name. If no file name is provided, the tool will default to monitoring the current directory's `index.js` file. Tool will execute the specified file whenever it detects a change.

```sh
runit [optional-file-name]
```

Examples:

```sh
# Run the tool and monitor the current directory
runit

# Run the tool and monitor a specific file
runit app.js
```

## Dependencies

This project relies on the following:

- **caporal**: Framework for Node CLI tools.
- **chalk**: Terminal styling.
- **chokidar**: Minimal x-platform file watching library.
- **lodash.debounce**: Debouncer.
