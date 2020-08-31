
export { NoteObject, TimingObject }

class ChartObject {
    constructor(timePoint) {
        this.timePoint = timePoint; // Where in the timeline this object occurs at. not indexable globally but used as local map key
    }
}

class NoteObject extends ChartObject {
    constructor(timePoint, data) {
        super(timePoint);
        this.value = data.value; // Value of note object in enumerated format
    }

    update() {
        // TODO - The way this function works depends on Note schema
    }
}

class TimingObject extends ChartObject {
    constructor(timePoint) {
        super(timePoint);
        // TODO define base timing class
    }
}