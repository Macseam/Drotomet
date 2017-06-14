# BaikalPlate
### Clean and Simple FrontEnd Boilerplate
React/Redux with LESS and Babel/Webpack. Just clone this repo and immediately start building your new project.<br />
<br />
Recent version: 1.0.0
***
**Author**: *Maxim Shvetsov*<br />
**Website**: <http://macseam.ru>
***
#### Installation
```
$ git clone git@github.com:Macseam/Simple-Clean-Redux-Boilerplate.git [your_folder_name_here]
$ cd [your_folder_name_here]
$ npm install
```
#### Scripts
`node server` : Launch `webpack-dev-server` with Hot Module Replacement - http://localhost:8080<br />
`npm run pack` : Compile scripts from **/app** folder to bundle.js and place it into **/build** folder<br />
#### Structure
```
/app
    |- /components
        |- /IndexPage
            |- MenuItem.js
            |- MenuList.js
        |- /ListPage
            |- ItemsList.js
            |- SingleItem.js
        |- Details.js
        |- NotFound.js
    |- /containers
        |- AppContainer.js
        |- IndexContainer.js
        |- ListContainer.js
    |- /redux
        |- /actions
            |- actionUtils.js
            |- sampleActions.js
        |- /reducers
            |- index.js
            |- sampleReducer.js
    |- /sample_data
        |- sample.json
    |- /store
        |- configureStore.js
    |- app.jsx
    |- routes.jsx
    |- settings.js
/style
    |- app.less
|- index.html
|- server.js
```