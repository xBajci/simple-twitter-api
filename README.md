# Simple Twitter API

Simple node.js application which use koajs and mongoose frameworks.

## How to install

    git clone
    npm install

## Configuration
Application uses `config.js` file for defining variables like port or database connection string.
Default port is set in `package.json` in config section and can be overwritten by setting environment variable `PORT` to another value:

    set PORT=3003


## NPM commands
`npm start` - start application

`npm test` - run tests