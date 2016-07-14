
#Welcome to Trutoo Starter Kit
This is a starter kit using **ReactJS** on top of **ExpressJS** on top of **NodeJS** to create a simple fullstack starter kit for all uses **commercial** and **non-commercial**. In this package there are multiple dependencies to aid development which are listed at the bottom of the page.

##Scripts
|Command|Description|
|---|---|
|`npm run clean`|Removes old compilation|
|`npm run build [production]`|Compiles project against targeted environment|
|`npm run generate`|Helper to generate (view / presentation / container) component|
|`npm run test`|Runs tests on code **!Not yet implemented!**|
|`npm start [production]`|Runs clean, build and serves a local node against targeted environment|

##Notes
When developing **hot reload** is enabled which we have chosen to run locally and not in a **webpack-dev-server / webpack-dev-middlewear** which generates a `debug/` folder in `build/public/assets/`. Make sure to run `npm start production` to before deploying `build/` to your server.

##Tips and Tricks
**Hot reloading** will cause warnings in the console for certain plugins such as **React Router** and **React Redux**. To hide them from the console use a **regex filter** similar to:

	^((?!cannot change|support changing).)+$

##Folder Structure
This is the general structure with a few files omitted for clarity's sake.

	trutoo-starter-kit/
	|---build/
	|   |---public/
	|   |   |---assets/
	|   |   |   |---debug/          Temp folder for hot reload files
	|   |   |   |--- *.*            All assets requested through require/import
	|   |   |
	|   |   |---main.js             JS entry point for browsers
	|   |   |---main.css            CSS entry point for browsers (production only)
	|   |   
	|   |---assets.json             References to files hash id based on file name
	|   |---server.js               Main express server compiled
	|
	|---src/
	|   |---components/             PascalCased React components
	|   |   |---App/                Typical component
	|   |       |---index.jsx
	|   |       |---style.css
	|   |
	|   |---content/                Global content such as email templates
	|   |---endpoints/              Express endpoints and controllers
	|   |   |---EmailController/    PascalCase with index.js as resolve point
	|   |   |---Endpoints.js        Express endpoints/routes
	|   |   |---Routes.jsx          Express/React shared view routes
	|   |
	|   |---languages/              Folder for implementing own language logic
	|   |---libs/                   Folder for add own CSS and JS libraries
	|   |---public/                 Global assets to use through require/import
	|   |---styles/                 Global mixins, vars, and entry for CSS libraries
	|   |   |---index.css           Reference CSS library main file
	|   |   |---mixins.css          Reference CSS library mixins file
	|   |   |---vars.css            Reference CSS library vars file
	|   |
	|   |---utils/                  Any global JS helpers
	|   |---views/
	|   |   |---HomeView/           Typical view contains following 3 files
	|   |       |---index.jsx
	|   |       |---style.css
	|   |       |---content.jade
	|   |
	|   |---client.jsx              Client rendering with hot reloading
	|   |---config.js               Global settings such as auth and analytics
	|   |---index.jade              Base template with headers and entry points
	|   |---server.jsx              Server rendering in express with hot reloading
	|
	|---tools/                      Build configs and bash tools
	|
	|---package.json                Dependencies, details and scripts

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
|babel-preset-node5|^11.1.0||
|babel-preset-react|^6.5.0||
|babel-preset-stage-0|^6.5.0||
|css-loader|^0.23.1||
|extend|^3.0.0||
|extract-text-webpack-plugin|^1.0.1||
|file-loader|^0.9.0||
|isomorphic-style-loader|^1.0.0||
|jade|^1.11.0||
|jade-loader|^0.8.0||
|json-loader|^0.5.4||
|nodemon|^1.9.2||
|path|^0.12.7||
|pixrem|^3.0.1||
|pleeease-filters|^3.0.0||
|postcss|^5.1.0||
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
|postcss-nesting|^2.3.1||
|postcss-selector-matches|^2.0.1||
|postcss-selector-not|^2.0.0||
|postcss-simple-vars|^3.0.0||
|raw-loader|^0.5.1||
|react-hot-loader|^3.0.0-beta.2||
|style-loader|^0.13.1||
|url-loader|^0.5.7||
|webpack|^1.13.1||
|webpack-hot-middleware|^2.12.1||
