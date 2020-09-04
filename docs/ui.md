# UI Layer

The UI Layer of the Mango Editor handles displaying of all DOM elements and their interactions with the engine layer via User events and serving user input requests from the Engine layer.

### Startup Routine

When the UI Layer is being generated at runtime, a pointer to the UI controller will need to be passed to the Engine layer for binding. Some methods require serving menus and popups from the Engine layer and doing so requires a pointer to the UI to access UI.popup and UI.Menu

If the UI Layer needs to be respawned in place at runtime (for whatever reason), the Engine needs to be rebound to the new UI context to serve menus properly.

### Wrapper Layout

The DOM is split into 2 parts in respect to the UI Layer- A wrapper and the Editor.

The UI Wrapper contains the global elements of the DOM which are to be displayed and bound regardless of the current editor state and should only need to be initialized once. Things that fall into the Wrapper include:
* Login (status bar, menu, and engine event bindings- not super relevant as of v0.1.0)
* Toolbar (inline with login status, holds dropdown menus for basic tasks such as chart / editor administration and debugging tools- to be expanded in later versions)
* Editor Container (DOM object which holds the Editor HTML and Canvas Object to be loaded and reloaded in-place as requested by user events)

The Wrapper of the UI will be the first thing generated on initialization and is static aside from User-skinning (to be introduced later)

### Editor Layout

The Editor portion of the DOM is nested inside of the Wrapper, the contents of which are reliant on which Editor has been loaded into the Engine. When no Editor is active, a default landing page will be displayed instead (without a renderer) which provides buttons and menus for creating a new chart or loading an existing one and thus spawning an Editor.

The HTML that will be loaded in the Editor portion of the UI is stored in the engine layer and parsed at runtime. More information on Editor layouts can be found in docs/editor.md.

The Editor Layer includes:
* Editor UI Elements for controlling the viewport and altering chart data
* Event bindings for any runtime keyboard input (either set to a default binding or rebound via user settings)
* A Canvas object to be referenced by and controlled by the Render Layer (see docs/renderer.md for more details on the Render Layer)
* Any menus or popups being served from user events in the UI or via the Engine layer prompt

This is loaded after the Wrapper and Engine initialization as well as whenever the Engine loads a new Editor. The Engine will Cache loaded Editors that are not presently active, this may be a feature worth including in the UI Layer as well.
