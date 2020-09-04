/*
 * This module is the main controller for the editor's user interface
 * this module or modules loaded by this module need to process input
 * and fire events that can be caught during runtime on the frontend
 * by the engine-layer of the framework and passed to a concurrently
 * loaded editor object. This module will also handle importing and
 * embedding the renderer and it's html5 canvas into the editor's DOM
 */

/*
 * This module does not need to contain any page behavior for
 * the renderer layer. The ui module will interact with the renderer
 * by calling trivial events in the renderer (such as a viewport zoom)
 * or by receiving data from the engine layer and sending relevant
 * renderer updates to the layer for processing there.
 */

/*
 * More information on this module and the events it will need to
 * be able to handle will be provided in /docs/ui.md
 * - Layla A
 */

// TODO - Refactor this entire thing so its less of a nightmare to look at

// Import react depends and factory functions for engine and renderer
import React from 'react';
import ReactDOM from 'react-dom';
import spawnEngine from './engine.js';
import spawnRenderer from './renderer.js';

// Spawn other layers
const Engine = spawnEngine();
const Renderer = spawnRenderer(Engine);

// UI Class declaration - either a non-react wrapper class for the UI layer or a react object containing engine event methods
class UI { // TODO - Determine if this needs to be an instance of a react object
    constructor() {

    }

    popup() {

    }

    menu() {

    }
} // TODO Implement me!!!

// Spawn UI Layer and bind to Engine
const ui = new UI();
Engine.bindCtx(ui); // This is nessecary

// export default // TODO - Export a React Class to be applied to index.js

// TODO - This file is mostly under the jurisdiction of Ethan.
// Further information to be included in /docs/ui.md
