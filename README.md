# Simple Twitter API

Simple node.js application that uses koajs and mongoose frameworks.

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

`npm run watch` - start application using nodemon (require nodemon to be installed globally)


## FAQ
#### How to create new user?
For simplification, new user is create just with `id` parametr in request body. This `id` is than used in routes.

`POST /users`

    {
        "id": "Martin"
    }
    
#### How to post a tweet?
`POST /users/Martin/tweets`

    {
        "tweet": "Hey hou"
    }
