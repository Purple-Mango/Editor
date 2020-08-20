#Mango Editor App Structure

Mango Editor is a React.js built app which contains 3 key pieces within its Frameworks:
* UI Layer
* Renderer Layer
* Engine Layer

The function of each of the pieces listen above will be briefly described in this document as well as in their own dedicated files. This document will act as a summary of the app structure.

### Overview

When Mango Editor is loaded, a startup routine for each of the individual layers will be run. The first of which is the UI layer- which is only loaded once and functions independantly from the other layers.

While the UI layer is being loaded, a basic render layer will be initialized and a pointer to that renderer will be provided to the UI layer for the purposes of processing input and mirroring rendered elements with DOM events for those elements.

Once the UI and renderers have been initialized, the engine layer will spawn in an uninitialized state. After providing default event listeners for the UI layer the UI becomes accessible to the User, whom will initialize the Engine layer via UI events. This process will be detailed more in Editor.md.

### UI Layer

TODO

### Renderer Layer

TODO

### Engine Layer

TODO