/**
 * Created by camp-vhe on 15.07.2016.
 */
const testsContext = require.context('./test/', true, /test/);
testsContext.keys().forEach(testsContext);

// require all the .js and .jsx files in app so they will be included in coverage
const componentsContext = require.context('./app/', true, /js?$/);
let componentsContextKeysWithoutIndexJsx = componentsContext.keys().filter(function (filePath) { return filePath !== './app.js' });
componentsContextKeysWithoutIndexJsx.forEach(componentsContext);