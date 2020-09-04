"use strict";

 // TODO - Everything

import Chart from "./classes/chart.js"
export default Editor

class Editor {
    constructor(data) { // data is a resolved version of manifest.json- see editor.md for more details
        // Viewport used by the renderer
        this.viewport = { // TODO - move these comments into editor.md docs
            // Local Settings, TODO - reload me between sessions
            zoom: 1, // Current Zoom level
            timeline: 1, // Timeline state 0 = off, 1 = object density, 2 = object orientation, 3 = timing outline

            // Editor defined viewport settings, TODO - allow for overwriting via local skins
            scroll: data.schema.descriptors.scroll, // Scroll Direction 0 = down, 1 = up, 2 = left, 3 = right
            pitch: data.schema.descriptors.pitch // Scroll Pitch. controls Z-axis rotation of the notefield,
        };

        // Currently Loaded chart data
        this.chart = null; // TODO - autoload recent chart

        // Current State of the editor process
        this.state = {
            // TODO - Define Me
        };

        this.layout = data.layout;
        this.style = data.style;

        // Object definitions for Notes and Timings
        // Addon functions and menu definitions live here too
        this.schema = data.schema;

        // TODO - add support for chart serializers that handle note data
        this.serializer = data.serializer;
    }

    // TODO - write all of these ;-;
    // Chart Admin
    async loadChart(...args) {}
    async saveChart(...args) {}
    async exportChart(...args) {}
    async closeChart() {}
    async setMeta(key, ...args) {}

    // Edit
    async addObject(time, ...args) {}
    async rmvObject(time) {}
    async addTimepoint(time, ...args) {}
    async rmvTimepoint(time) {}

    // Editor State
    async cycleSnap(up) {}
    async setSnap(a, b) {}
    async cycleSpeed(up) {}
    async setSpeed(amount) {}
    async timeShift(delta) {}
    async zoom(amount) {}

    // UI / Renderer Calls
    getSchema() {
        return {
            layout: this.layout,
            style: this.style,
            input: this.schema.input,
            menus: this.schema.menus
        };
    }
    async buildView() {}
    async getView(/* delta */) {}
}