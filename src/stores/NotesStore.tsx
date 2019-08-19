import {observable, action, computed} from "mobx";
import axios from 'axios';
import {newNote, Note} from "../iterfaces/notes.interface";
const _ = require('lodash');
const moment = require('moment');


class NotesStore {
    @observable notes: Array<any> = [];

    @action addNote = (note: newNote) => {
        axios.post('http://localhost:3004/notes',note,{
            headers: {
                'Content-Type': 'application/json'
            }}).then(()=>{
            this.fetchNotes()
        });
    };

   @action updateChecked = (noteId: number, itemId: number, value: Boolean) => {
       const i = _.findIndex(this.notes, (note: Note)=>{return note.id === noteId});
       let items = this.handleItems(i, itemId, value);
       let update_date = this.dateUpdating(i);

       axios.patch(`http://localhost:3004/notes/${noteId}`,{items,update_date},{
           headers: {
               'Content-Type': 'application/json'
           }}).then(()=>{
           this.fetchNotes()
       });
    };


    @action removeNote = (noteId: number) => {
        axios.delete(`http://localhost:3004/notes/${noteId}`,{
            headers: {
                'Content-Type': 'application/json'
            }}).then(()=>{
            this.fetchNotes()
        });
    };


    @action fetchNotes(){
        return axios.get('http://localhost:3004/notes').then(({data})=>{
            this.notes = data;
        })
    }


    @computed get notesCount() {
        return this.notes.length;
    }


   handleItems(i: number, itemId: number, value: Boolean) {
       this.notes[i].items[itemId].checked = value;
       return this.notes[i].items;
   }

   dateUpdating(i: number){
       this.notes[i].update_date = moment().format('YYYY-MM-DD HH:mm');
       return this.notes[i].update_date;
   }
}

const store = new NotesStore();
export default store;
