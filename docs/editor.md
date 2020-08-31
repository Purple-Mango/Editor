# Editor Framework

The editor is an object that can exist within an instance of the Engine which handles UI events and manipulates the state of the currently loaded chart. It also contains all of the appearance and layout files the UI will need to draw the editor.

An Editor package will need to contain the following files:
* manifest.json - json file defining all editor files
* schema.js - javascript file defining chart schema, menus, and enumerations
* layout.html - custom html file that defines UI and Renderer Layout
* style.css - custom style sheet that defines UI and Renderer default appearance
* serializer.js - javascript file that handles loading and writing native chart formats

These files will be documented further below.