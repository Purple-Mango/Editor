"use strict";

// TODO - Write Schema docs

module.exports = {
    timing: [1, 2], // BPM & Relative
    input: {
        types: [
            {
                name: "Note", // Visible name
                class: "note", // Class used in style and layout
                value: 1 // Values are in binary and used for masking
            },
            {
                name: "Hold",
                class: "hold",
                value: 2,
                params: { // Extra parameters defining function
                    next: [3]
                }
            },
            {
                name: "Release",
                class: "release",
                value: 3,
                params: {
                    last: [2]
                }
            }
        ],
        structure: "1-18*", // 1-18 inputs all wildcarded (can be any type that abides type params)
    },
    descriptors: {
        scroll: [1, 2],
        pitch: 0
    },
    menus: {
        todo: true // kek TODO
    }
};