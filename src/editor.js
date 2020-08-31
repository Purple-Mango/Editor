"use strict";

import Chart from "./classes/chart.js"
export default Editor

class Editor {
    constructor(data) {
        // Viewport used by the renderer
        this.viewport = { // TODO - move these comments into editor.md docs
            zoom: 1, // Current Zoom level
            scroll: 0, // Scroll Direction 0 = down, 1 = up, 2 = left, 3 = right
            pitch: 0, // Scroll Pitch. controls Z-axis rotation of the notefield,
            timeline: 1 // Timeline state 0 = off, 1 = object density, 2 = object orientation, 3 = timing outline
        };

        // Currently Loaded chart data
        this.chart = new Chart(); // TODO - work out charts and their schema

        // Current State of the editor process
        this.state = {
            // TODO - Define Me
        };

        // Object definitions for Notes and Timings
        this.schema = data.schema;

        // TODO - implement addon functions
        this.logic = Editor.Logic(data.logic);

        // TODO - add support for chart serializers that handle note data
        this.serializer = Editor.Serializer(data.serializer);
    }

    // TODO - Implement these portions of the engine
    static Logic() {}
    static Serializer() {}
    static Unpack(id) {}
}