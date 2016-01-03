import angular from 'angular';

class LocalStorageService {
    constructor(a) {
        this.notesList = this.getNotesList();
    }
    getNotesList() {
        if (!window.localStorage) {
            throw new Error('App requires localStorage.');
        }
        let ngNotesList = window.localStorage.getItem('ngNotesList');
        if (ngNotesList !== null) {
            return JSON.parse(ngNotesList);
        } else {
            return [];
        }
    }
    get notesData() {
        if (!window.localStorage) {
            throw new Error('App requires localStorage.');
        }
        let notesData = window.localStorage.getItem('ngNotesData');
        if (notesData !== null) {
            return JSON.parse(notesData);
        } else {
            return [];
        }
    }
    getNotesByID(id) {
        let noteMetaData = this.notesList.filter(note => {
            return note.id === id
        });
        if (noteMetaData.length !== 1) {
            return {};
        }
        let noteData = this.notesData.filter(note => {
            return note.id === id
        });
        let content;
        if (noteData.length === 0) {
            noteData.push({
                id,
                content: ''
            });
        }
        return {
            id,
            metadata: noteMetaData[0],
            data: noteData[0]
        };
    }
    updateNotesContentById(id, content) {
        let newNotesData = this.notesData;
        let noteData = this.notesData.filter(note => {
            return note.id === id
        });
        if (noteData.length !== 0) {
            newNotesData = this.notesData.map(note => {
                if (note.id === id) {
                    note.content = content;
                }
                return note;
            });
        } else {
            newNotesData.push({
                id,
                content
            });
        }
        window.localStorage.setItem('ngNotesData', angular.toJson(newNotesData));
    }
    updateNotesTitleById(id, title) {
        let newNotesMetaData = this.notesList.map(note => {
            if (note.id === id) {
                note.title = title;
            }
            return note;
        });
        window.localStorage.setItem('ngNotesList', angular.toJson(newNotesMetaData));
    }
    addNewNote() {
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
        this.notesList.push({
            id: guid(),
            title: 'New Note',
            created: (new Date()).getTime()
        });
        window.localStorage.setItem('ngNotesList', angular.toJson(this.notesList));
    }
    deleteNoteById(id) {
        let noteMetadataIndex = this.notesList.map(notes => notes.id).indexOf(id);
        let notesData = this.notesData.filter(note => note.id !== id);
        if (noteMetadataIndex >= 0) {
            this.notesList.splice(1,noteMetadataIndex);
            window.localStorage.setItem('ngNotesList', angular.toJson(this.notesList));
            window.localStorage.setItem('ngNotesData', angular.toJson(notesData));
        } else {
            throw new Error('Invalid store state');
        }
    }
}

let localStorageService = new LocalStorageService();

export default localStorageService;