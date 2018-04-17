# generator-feathers

[![Greenkeeper badge](https://badges.greenkeeper.io/feathersjs/generator-feathers.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/feathersjs/generator-feathers.png?branch=master)](https://travis-ci.org/feathersjs/generator-feathers)

> A Yeoman generator for a Feathers application 🍪 with
> standard-settings, spacebro, standard linting and a dev mode for hot
> reloading src.

## Installation

First you need install [yeoman](http://yeoman.io/).

```bash
npm install -g yo
```

Then clone the feathers generator.

```bash
git clone git@github.com:soixantecircuits/generator-feathers.git
```

And use it locally:

```bash
cd generator-feathers
npm link
```

## Usage

Create a directory for your new app.

```bash
mkdir my-new-app; cd my-new-app/
```

Generate your app and follow the prompts.

```bash
yo feathers
```

Start your brand new app! 💥

```bash
npm start
```

## Available commands

```bash
# short alias for generate new application
yo feathers

# set up authentication
yo feathers:authentication

# set up a database connection
yo feathers:connection

# generate new hook
yo feathers:hook

# generate new middleware
yo feathers:middleware

# generate new service
yo feathers:service
```

## Additional informations on mods

### standard

Do not use ;
The generated files should not contain standard errors, but it may
happen sometimes, fix it locally.

### standard-settings

Use standard-settings for everything instead of `app.get`.  
The generator still generates config files, you can safely remove them.

### dev mode

```
yarn dev
```

Sometimes it doesn't reload properly with newly created files. Please
restart if you see an abnormal error after changing a file.  

### spacebro

All socket.io events are sent on spacebro.  
Make sure to edit `client.in` and `client.out` in `settings.default.json`.  
Spacebro does not support authentification for now, so every message are
published to anonymous users by default.

### logs
By default, the log mode is debug, you can change it in
`settings.default.json`

## Production
[feathers/feathers-configuration](https://github.com/feathersjs/feathers-configuration) uses `NODE_ENV` to find a configuration file under `config/`. After updating `config/production.js` you can run 

```bash
NODE_ENV=production npm start
```

## Contributing

To contribute PRs for these generators, you will need to clone the repo
then inside the repo's directory, run `npm link`. This sets up a global
link to your local package for running tests (`npm test`) and generating
new feathers apps/services/hooks/etc.

When finished testing, optionally run `npm uninstall generator-feathers` to remove
the link.

## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).
