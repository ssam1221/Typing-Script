import Debug from "./Debug";

const debug = new Debug({
    filename: `NoteCreator`
})

export default class NoteCreator {

    static MUSIC_NOTE_CLASS_NAME = `MUSIC_NOTE`;
    static PRESSED_CLASS_NAME = `PRESSED_NOTE`;
    static MAX_KEYPRESS_NOTES = 100;
    static KEYPRESS_FPS = 1000 / this.MAX_KEYPRESS_NOTES;
    static currentKeyPressNoteIndex = 0;

    static keypressDivInterval;

    static isPaused = false;
    static noteList = [];
    static musicNoteList = [];
    static keypressNotes = [];
    static timeoutFunctionList = [];

    static keynotesContainer = null;
    static pressedkeynotesContainer = null;

    static StartTime = null;
    static PointCheck = {
        Perfect: 0,
        Good: 0,
        Bad: 0,
        Miss: 0
    }

    static initialize() {
        debug.log(`Initializing...`);
        this.keynotesContainer = document.getElementById(`keynotesContainer`);
        this.pressedkeynotesContainer = document.getElementById(`keynotePressedContainer`);
        this.createkeypressNotes();
        this.keypressDivInterval = setInterval(() => {
            this.currentKeyPressNoteIndex = (++this.currentKeyPressNoteIndex) % this.MAX_KEYPRESS_NOTES;
        }, this.KEYPRESS_FPS);
    }

    static async setNotes(bgmTitle) {
        debug.log(`Set notes for title : [${bgmTitle}]...`);
        this.noteList = await (await fetch(`data/notes/${bgmTitle}.json`)).json();
    }

    static createkeypressNotes() {
        for (let i = 0; i < this.MAX_KEYPRESS_NOTES; i++) {
            const musicNoteDiv = document.createElement(`div`);
            musicNoteDiv.id = `musicNote_${i}`;
            musicNoteDiv.setAttribute(`class`, this.MUSIC_NOTE_CLASS_NAME);
            this.keynotesContainer.appendChild(musicNoteDiv);

            const pressedNotediv = document.createElement(`div`);
            pressedNotediv.id = `keypressNote_${i}`;
            pressedNotediv.setAttribute(`class`, this.PRESSED_CLASS_NAME);
            this.pressedkeynotesContainer.appendChild(pressedNotediv);
        }
    }

    static add({
        what,
        timestamp
    }) {

    }

    static read() {

    }

    // Render
    static create() {

    }

    // If typed
    static pop() {
        const timestamp = this.StartTime.getTime() - new Date().getTime();
    }

    static async start() {
        debug.log(`Start to create notes...`);
        await this.setNotes(`A Fallen Leaf`);
        for (const _note of this.noteList) {
            ((note) => {
                this.timeoutFunctionList.push(
                    setTimeout(() => {
                        this.renderMusicNote(note.key);
                    }, note.timestamp)
                )
            })(_note);
        }
        this.StartTime = new Date();
    }

    static stop() {
        for (const timeoutFunc of this.timeoutFunctionList) {
            clearTimeout(timeoutFunc);
        }
    }

    static renderMusicNote(_key) {
        ((key) => {
            const note = document.getElementById(`musicNote_${this.currentKeyPressNoteIndex}`);
            note.innerText = key;

            note.setAttribute(`class`, `${this.MUSIC_NOTE_CLASS_NAME} showNote`);

            setTimeout(() => {
                // keypressedNote.setAttribute(`class`, `hideNote`);
                note.setAttribute(`class`, `${this.MUSIC_NOTE_CLASS_NAME}`);
                note.innerText = ``;
            }, 1000)
            debug.log(key)
        })(_key);
    }

    static keypressNote(_key) {
        ((key) => {
            const keypressedNote = document.getElementById(`keypressNote_${this.currentKeyPressNoteIndex}`);
            debug.log(`keypressNote : [${key}] : Assigned to : ${this.currentKeyPressNoteIndex}`);
            keypressedNote.innerText = key;

            keypressedNote.setAttribute(`class`, `${this.PRESSED_CLASS_NAME} showNote`);

            // setTimeout(() => {
            //     // keypressedNote.setAttribute(`class`, `hideNote`);
            //     keypressedNote.setAttribute(`class`, `${this.PRESSED_CLASS_NAME}`);
            //     keypressedNote.innerText = ``;
            // }, 1000)
        })(_key);
    }

    static checkPressedKeyCorrected(key) {

    }

    static onkeypress(e) {
        if (e.key.length === 1) {
            this.keypressNote(e.key)
        }
    }
}