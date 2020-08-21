// Engine module to be run concurrently but exclusively of the
// React portion of the application. The engine module will hook
// into events defined by the UI layer and attach listener methods
// from the editor currently loaded into the engine. Interfacing
// with the UI layers outside of this event system is prohibited
// for the purpose of a modular design and compatibility going
// forward.
// - Layla A