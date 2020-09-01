// This module will be responsible for controlling the html5 canvas
// portion of the editor UI. Functions of this module will be received
// from the UI layer (either directly for trivial events or after
// being processed by the engine layer and returned. This module should
// not be responsible for sending information to the engine layer and will
// not be used for tracking any of the editor's state- only the way
// it is being rendered. Some elements of the renderer may need to be
// referenced by the UI layer to emulate rendered elements inside of the
// DOM for event-handling.
// - Layla A

"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import Engine from "./engine.js"
export { Engine, Renderer }

function spawnCanvas(props) {
    // Privatized by closure

}
class Renderer extends React.Component {
    constructor(props) {
        super(props);
    }
}
