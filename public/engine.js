// Engine module to be run concurrently but exclusively of the
// React portion of the application. The engine module will hook
// into events defined by the UI layer and attach listener methods
// from the editor currently loaded into the engine. Interfacing
// with the UI layers outside of this event system is prohibited
// for the purpose of a modular design and compatibility going
// forward.
// - Layla A

class Editor {
    constructor(data) {
        // Viewport used by the renderer
        this.viewport = {
            // TODO - Define Me
        };

        // Currently Loaded chart data
        this.chart = null;

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
}

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

class Engine {
    #editor = null; // Active Chart Editor object
    #session = new Login(null); // Active Login-Session object
    constructor() {

    }

    async spawnEditor(id = "") {
        // TODO - check for non-null editor and notify the user / save chart
        return new Promise((resolve, reject) => {
            if (!id) {
                this.#editor = null;
                return resolve({code: 0});
            }

            // TODO - Send Request to backend to collect current editor data.
            // For now it will be hard-coded
            let editorData = {}; // Assume this was fetched from backend and parsed as json

            let index = editorData.indexOf[id];
            if (index < 0) {
                return reject({
                    code: 1,
                    msg: "Invalid Editor id"
                });
            }

            this.#editor = new Editor(editorData[index]);
            return resolve({code: 0})
        }).catch(err => {
            return err;
        });
    }

    async loadChart(...args) {
        // TODO - Load a chart into currently loaded editor via user upload or backend storage
        // We'll only support user upload for now
    }

    async saveChart(...args) {
        // TODO - Cache current chart in browser, store on backend if user has an account & space
    }

    async exportChart(...args) {}
    async addObject() {}
    async rmvObject() {}
    async addTimepoint() {}
    async rmvTimepoint() {}
    async setMeta() {}
    async cycleSnap() {}
    async cycleSpeed() {}
    async timeShift() {}
    async getSchema() {}
    async getView() {}
    async zoom() {}
}

