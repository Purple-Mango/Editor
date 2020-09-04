// Engine module to be run concurrently but exclusively of the
// React portion of the application. The engine module will hook
// into events defined by the UI layer and attach listener methods
// from the editor currently loaded into the engine. Interfacing
// with the UI layers outside of this event system is prohibited
// for the purpose of a modular design and compatibility going
// forward.
// - Layla A

// TODO - Import Login Session from dedicated class
import Editor from "./editor.js"

// TODO - fix these filepaths, make this less ugly
// This is just to complete a task
const EditorCache = (() => {
    const fs = require("fs"), path = require("path");
    const dirs = fs.readdirSync("./editors");
    const editors = {};
    let manifest, curpath, editor;
    for (const dir of dirs) {

        // Load Manifest
        curpath = path.join(dir, "manifest.json");
        if (!fs.existsSync(curpath))
            continue; // Skip directory, no manifest
        try {
            manifest = JSON.parse(fs.readFileSync(curpath, "utf8"));
        } catch (err) {
            console.log(err);
            continue;
        }

        // Load Editor Data
        try {
            editor = {
                layout: fs.readFileSync(manifest.layout), // Work with Ethan to structure this
                style: fs.readFileSync(manifest.style), // This, too. this will be the default skin.
                schema: require(manifest.schema), // script file that exports object structure, game mode descriptors, and value enumerations
                serializer: require(manifest.serializer) // script file that handles converting, reading, and writing to and from local and native formats
            }
        } catch (err) {
            console.log(err);
            continue;
        }
        editors[manifest.id] = editor;
        console.log(`Editor ${manifest.id} loaded.`);
    }
    return editors;
});


// TODO - Move to its own file when we start working on this
class Login {
    constructor(data) {
        this.key = data.key || "";
        this.userid = data.userid || 0;
        this.username = data.username || "";
        this.group = data.group || 0;
        this.storage = data.storage || {
            total: 0,
            used: 0
        };
        this.since = data.since || Date.now();
    }
}


function SpawnEngine() {// Privatized by closure - only to be accessed by methods in _Engine
    let editor = null; // Active Chart Editor object
    let session = new Login(null); // Active Login-Session object
    let socket = null; // Socket that manages back-end connection
    let boundCtx = null; // Caller context required for user input events

    const cache = []; // Inactive Chart Editor array
    const errors = []; // Collection of runtime Errors / Warnings

    // TODO - figure out if these are being done synchronously or asynchronously
    const methods = {
        async spawnEditor(id = "") {
            // Disable editor spawning without a bound context
            if (boundCtx === null)
                return {
                    code: -2 // Caller Context unbound
                };

            // Check for existing editor instance and prompt a saveclose
            if (editor instanceof Editor) {
                // TODO - Implement these UI interface methods in the class making these engine calls.
                if (!await this.menu("saveclose", editor.chart.title))
                    return {
                        code: -1 // Cancelled by user
                    };
            }

            // Run spawneditor operation
            return new Promise((resolve, reject) => {
                // Handle editor close
                if (!id) {
                    editor = null;
                    return resolve({code: 0});
                }

                // Verify that requested editor exists in cache
                let index = Object.keys(EditorCache).indexOf[id];
                if (index < 0) {
                    return reject({
                        code: 1,
                        msg: "Invalid Editor id"
                    });
                }

                // Spawn editor and return schema to caller
                editor = new Editor(EditorCache[id]);
                return resolve({
                    code: 0,
                    schema: editor.getSchema() // Return a schema object so the UI knows how to display the current editor
                });
            }).catch(err => {
                return err;
            });
        },
        loadChart(...args) {
            // TODO - Load a chart into currently loaded editor via user upload or backend storage
            // We'll only support user upload for now
        },
        saveChart(...args) {
            // TODO - Cache current chart in browser, store on backend if user has an account & space
        },
        exportChart(...args) {},
        closeChart() { return editor.closeChart(); },
        setMeta(key, ...args) { return editor.setMeta(key, ...args); },
        addObject(time, ...args) { return editor.addObject(time, ...args); },
        rmvObject(time) { return editor.rmvObject(time); },
        addTimepoint(time, ...args) { return editor.addTimepoint(time, ...args); },
        rmvTimepoint(time) { return editor.rmvTimepoint(time); },
        cycleSnap(up) { return editor.cycleSnap(up); },
        async setSnap(a, b) { return editor.setSnap(a, b); },
        async cycleSpeed(up) { return editor.cycleSpeed(up); },
        async setSpeed(amount) { return editor.setSpeed(amount); },
        async timeShift(delta) { return editor.timeShift(delta); },
        async zoom(amount) { return editor.zoom(amount); },
        getSchema() { return editor.getSchema(); },
        async buildView() { return editor.buildView(); },
        async getView(/* delta */) { return editor.getView(); }
    };

    return Object.assign(
        new (class Engine{}), // Mostly for debugging and `instanceof`
        methods, // static class methods bound to the caller context
        function bindCtx(ctx) {
            boundCtx = ctx;
            // This might be bad practice. we'll find out i guess shrugemoji lul ecksdee
            // Hopefully this doesnt kill performance
            for (const [key, ptr] of Object.keys(this)) {
                if (key === "bindCtx") // Dont overwrite the context of this function or we'll break re-bindings
                    continue;
                this[key] = ptr.bind(boundCtx); // to bubble up things like menu events
            }
        });
}

export default SpawnEngine;

