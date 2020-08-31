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

    const cache = []; // Inactive Chart Editor array
    const errors = []; // Collection of runtime Errors / Warnings

    // Relies on the above private methods to function
    class Engine {
        static async spawnEditor(id = "") {
            // TODO - check for non-null editor and notify the user / save chart
            return new Promise((resolve, reject) => {
                if (!id) {
                    editor = null;
                    return resolve({code: 0});
                }

                let index = Object.keys(EditorCache).indexOf[id];
                if (index < 0) {
                    return reject({
                        code: 1,
                        msg: "Invalid Editor id"
                    });
                }

                editor = new Editor(EditorCache[id]);
                return resolve({
                    code: 0,
                    schema: editor.getSchema() // Return a schema object so the UI knows how to display the current editor
                });
            }).catch(err => {
                return err;
            });
        }

        static async loadChart(...args) {
            // TODO - Load a chart into currently loaded editor via user upload or backend storage
            // We'll only support user upload for now
        }

        static async saveChart(...args) {
            // TODO - Cache current chart in browser, store on backend if user has an account & space
        }

        static async exportChart(...args) {}
        static async addObject() {}
        static async rmvObject() {}
        static async addTimepoint() {}
        static async rmvTimepoint() {}
        static async setMeta() {}
        static async cycleSnap() {}
        static async cycleSpeed() {}
        static async timeShift() {}
        static async getSchema() {
            return editor.getSchema();
        }
        static async getView() {
            return editor.getView();
        }
        static async zoom(amount) {
            return editor.zoom(amount);
        }
    }
    return new Engine();
}

const Engine = SpawnEngine();
export default Engine;

