#Mango Engine

The Mango Engine acts as the centralized logic component of the application and handles all non-UI related operations. Engine operations occur internally and cannot be called by or influenced by external scopes. To perform an engine operation you must call one of the public methods that will be listed and detailed below.

### Private Members

Please note that all members of Engine are privatized by closure and cannot be referenced from the imported Engine object. this includes with functions used by the Object global.

* Editor - Object containing the current state of the actively loaded chart editor. See more about this in editor.md
* Session - Object containing the login data (or lack thereof) for the current session. Currently a dummy object.
* Socket - Object managing the connection to backend server.
* Cache - Loaded Editor objects that are currently inactive, but available to be reloaded. This feature is optional and can be disabled by the user.
* Errors - Array of errors collected during runtime. Can optionally be sent to the server, logged locally on application closed, or viewed in-app during debug mode.

### Communication with the Engine

All public methods are asynchronous and return a promise that, when fulfilled, contain a "response object".

####Response
* Code - Status code of the operation. 0 denotes success, whereas anything else reports an error code. See more on error codes below.
* Message - String field that accompanies an error code, usually containing details about the error. A copy of this message is found inside of the Engine.#errors array.
* Data - A JSON formatted object containing requested data for the UI or Renderer on a successful operation  (if nessecary).

####Error Codes
    0: Success
    1: Rejected argument in function call

### Public Methods
    
`async` spawnEditor (`string id - default ""`):

Spawns an Editor object corresponding to the provided editor ID. No editor ID will result in a null editor that will cause any editor related Engine methods to gracefully fail with response code 0. Optionally, an editor that is already loaded can be saved to the cache when a new editor is opened, allowing for tabbed sessions. With tabs disabled the user will be prompted to save an ongoing project before opening a new editor. Note that the editor object is never exposed outside the object and an externally  build editor cannot be passed to the Engine.

---

`async` loadChart (`...args`):

TODO

---



### Private Methods
 TO-DO