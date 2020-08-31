"use strict";

import { NoteObject, TimingObject } from "./objects.js"
export default Chart

class Chart {
    contructor(data, schema) {
        this.timeObjects = new Map(data.timeObjects || []);
        this.noteObjects = new Map(data.noteObjects || []);
        this._NoteObject = null; // Extend NoteObject class to include schema.note properties
        this._TimingObject = null; // Extend TimingObject class to include schema.timing properties
    }

    addNote(timePoint = 0, data = null) {
        if (!this.verifyNoteSchema(data))
            return false;
        if (this.noteObjects.has(timePoint))
            this.noteObjects.get(timePoint).update(data);
        else
            this.noteObjects.set(timePoint, new this._NoteObject(timePoint, data));
        return true;
    }

    verifyNoteSchema(data) {
        // TODO compare loaded note object scheme with the data being used to spawn a new note
    }

    static Load() {
        // TODO - Rebuild a chart object from a .ucf file
    }
}