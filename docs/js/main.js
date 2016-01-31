'use strict';

import 'babel/polyfill';
import './mainmenu.js';

// For development purposes
import DemoScene from '../../src/DemoScene';
// For release
//import DemoScene from '../lib/DemoScene';

var cargoship = new DemoScene({}, 'lib/');

cargoship.setProperties({
    controls: true,
    pointerlock: true,
    audio: true,
    stats: true,
    debug: true
});

cargoship.addGenericScript("Physijs", "js/physijs/physi.js", true);
cargoship.addGenericScript("Triggers", "js/triggers/triggers.js", false);

// Add scene
cargoship.addScene({
    shaders: [
        {name: "basic.vs", file: "shaders/basic.vs.glsl"},
        {name: "basic.fs", file: "shaders/basic.fs.glsl"},
        {name: "snow.vs", file: "shaders/snow.vs.glsl"},
        {name: "snow.fs", file: "shaders/snow.fs.glsl"}
    ],
    models: [
        {name: "Freighter",     file: "models/Freighter.js"},
        {name: "FishingShack",  file: "models/FishingShack.js"},
        {name: "Character",     file: "models/Character.js"},
        {name: "Ground",        file: "models/Ground.js"},
        {name: "ShaderBox",     file: "models/ShaderBox.js"},
        {name: "Snowfall",      file: "models/Snowfall.js"},
        {name: "Mai",           file: "models/Mai.js"}
    ],
    scene: {name: "Glacier", file: "scenes/Glacier.js"},
    initial: false
});

$(document).ready(function() {
    cargoship.start();
});
