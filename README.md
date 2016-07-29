![Trutoo AB Logo](https://drive.google.com/uc?export=view&id=0B5KlDmyjVFzZTlJrZmJKeXMyMEk)
#Welcome to Trutoo Starter Kit
This is a starter kit using [React](https://facebook.github.io/react/) on top of [Express](http://expressjs.com/) on top of [Node](https://nodejs.org/en/) to create a simple fullstack starter kit for all uses **commercial** and **non-commercial**. In this package there are multiple dependencies to aid development which are listed at the bottom of the page.

##Installation & Scripts
To get started you are going to need [Node](https://nodejs.org/en/) and [BASH](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) (for the npm scripts). Windows users can use a tool like: [CASH](https://github.com/dthree/cash) or [Cygwin](https://www.cygwin.com/). Then clone this repository either with a GUI or with the following command:

	$ git clone https://github.com/trutoo/trutoo-starter-kit.git

Finally install all dependencies with:

	$ npm install

Bellow are a list of NPM scripts that you can run to aid development.

|Command|Description|
|---|---|
|`npm run clean`|Removes old compilation|
|`npm run build [production]`|Compiles project against targeted environment|
|`npm run generate`|Helper to generate a (view \| component \| container)|
|`npm test`|Runs ESLint on the `src/` code using [Airbnb's Style Guide](https://github.com/airbnb/javascript)|
|`npm start [production]`|Runs clean, build and serves a local node against targeted environment|

Now you are ready to build with ❤!

##Notes
When developing **hot reload** is enabled which we have chosen to run locally and not in a **webpack-dev-server / webpack-dev-middlewear** which generates a `debug/` folder in `build/public/assets/`. Make sure to run `npm start production` before deploying `build/` to your server.

<!--
##Tips & Tricks
**Hot reloading** will cause warnings in the console for certain plugins such as **React Router** and **React Redux**. To hide them from the console use a **regex filter** similar to:

	^((?!cannot change|support changing).)+$
-->

##Folder Structure
This is the general structure with a few files omitted for clarity's sake.

	trutoo-starter-kit/
	├─── build/
	│    ├─── public/
	│    │    ├─── assets/
	│    │    │    ├─── debug/         Temp folder for hot reload files
	│    │    │    └─── *.*            All assets requested through require/import
	│    │    │
	│    │    ├─── main.js             JS entry point for browsers
	│    │    └─── main.css            CSS entry point for browsers (production only)
	│    │   
	│    ├─── assets.json              References to files hash id based on file name
	│    └─── server.js                Main express server compiled
	│
	├─── src/
	│    ├─── components/              PascalCased React components
	│    │    └─── App/                Typical component
	│    │         ├─── index.jsx
	│    │         └─── style.css
	│    │
	│    ├─── content/                 Global content such as email templates
	│    ├─── endpoints/               Express endpoints and controllers
	│    │    ├─── EmailController/    PascalCase with index.js as resolve point
	│    │    ├─── Endpoints.js        Express endpoints/routes
	│    │    └─── Routes.jsx          Express/React shared view routes
	│    │
	│    ├─── languages/               Folder for implementing own language logic
	│    ├─── libraries/               Folder for add own CSS and JS libraries
	│    ├─── public/                  Global assets to use through require/import
	│    │    ├─── favicons/
	│    │    ├─── fonts/
	│    │    ├─── images/
	│    │    └─── videos/
	│    │
	│    ├─── styles/                  Global mixins, vars, and entry for CSS libraries
	│    │    ├─── index.css           Reference CSS library main file
	│    │    ├─── mixins.css          Reference CSS library mixins file
	│    │    └─── vars.css            Reference CSS library vars file
	│    │
	│    ├─── utilities/               Any global JS helpers
	│    ├─── views/
	│    │    └─── HomeView/           Typical view contains following 3 files
	│    │         ├─── index.jsx
	│    │         ├─── style.css
	│    │         └─── content.jade
	│    │
	│    ├───client.jsx                Client rendering with hot reloading
	│    ├───config.js                 Global settings such as auth and analytics
	│    ├───index.jade                Base template with headers and entry points
	│    └───server.jsx                Server rendering in express with hot reloading
	│
	├───tools/                         Build configs and bash tools
	│
	└───package.json                   Dependencies, details and scripts

##Application Dependencies

|Plugin|Version|Inclusion Reason|
|---|---|---|
|body-parser|^1.15.1||
|emailjs|^1.0.5||
|express|^4.13.4||
|normalize.css|^4.2.0"||
|react|^15.2.1||
|react-dom|^15.2.1||
|react-helmet|^3.1.0||
|react-redux|^4.4.5||
|react-router|^2.5.2||
|react-router-redux|^4.0.5||
|redux|^3.5.2"||

##Development Dependencies

|Plugin|Version|Inclusion Reason|
|---|---|---|
|assets-webpack-plugin|^3.4.0||
|autoprefixer|^6.3.7||
|babel-core|^6.10.4||
|babel-loader|^6.2.4||
|babel-plugin-transform-react-constant-elements|^6.9.1||
|babel-plugin-transform-react-inline-elements|^6.8.0||
|babel-plugin-transform-react-remove-prop-types|^0.2.7||
|babel-plugin-transform-runtime|^6.9.0||
|babel-preset-es2015|^6.9.0||
|babel-preset-react|^6.5.0||
|css-loader|^0.23.1||
|eslint|^2.13.1||
|eslint-config-airbnb|^9.0.1||
|eslint-loader|^1.4.1||
|eslint-plugin-import|^1.10.3||
|eslint-plugin-jsx-a11y|^1.5.5||
|eslint-plugin-react|^5.2.2||
|extend|^3.0.0||
|extract-text-webpack-plugin|^1.0.1||
|file-loader|^0.9.0||
|jade|^1.11.0||
|jade-loader|^0.8.0||
|json-loader|^0.5.4||
|nodemon|^1.9.2||
|path|^0.12.7||
|pixrem|^3.0.1||
|pleeease-filters|^3.0.0||
|postcss|^5.1.0||
|postcss-assets|^4.1.0||
|postcss-calc|^5.3.0||
|postcss-color-function|^2.0.1||
|postcss-custom-media|^5.0.1||
|postcss-custom-selectors|^3.0.0||
|postcss-for-var|^1.0.3||
|postcss-import|^8.1.2||
|postcss-lh|^1.1.1||
|postcss-loader|^0.9.1||
|postcss-media-minmax|^2.1.2||
|postcss-mixins|^5.0.0||
|postcss-nested|^1.0.0||
|postcss-selector-matches|^2.0.1||
|postcss-selector-not|^2.0.0||
|postcss-simple-vars|^3.0.0||
|raw-loader|^0.5.1||
|react-hot-loader|^3.0.0-beta.2||
|style-loader|^0.13.1||
|url-loader|^0.5.7||
|webpack|^1.13.1||
|webpack-hot-middleware|^2.12.1||
