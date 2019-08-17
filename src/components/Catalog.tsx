import React from "react";
import {inject, observer} from "mobx-react";
import NoteCard from "./NoteCard";
import Container from "react-bootstrap/Container";
// @ts-ignore
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import {Note} from "../iterfaces/notes.interface";

@inject('NotesStore')
@observer
class Catalog extends React.Component<any>{

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: any) {
        super(props);
    }

    updateChecked(noteId: Number, itemId: Number, value: Boolean) {
        this.props.NotesStore.updateChecked(noteId, itemId, value);
    }

    removeNote(noteId: Number) {
        this.props.NotesStore.removeNote(noteId);
    }


    render(): JSX.Element {
        const {NotesStore} = this.props;
        return (<CatalogContainer>

                <Row>
                    {NotesStore.notes.map((note: Note)=>{
                        return <NoteCard key={note.id} note={note} noteId={note.id}
                                         updateChecked={(noteId: Number, itemId: Number, value: Boolean)=>this.updateChecked(noteId, itemId, value)}
                                         removeNote={(noteId: Number)=>this.removeNote(noteId)}
                                         />
                    })}
                </Row>

            </CatalogContainer>
        )
    }

    componentDidMount() {
        this.props.NotesStore.fetchNotes();
    }
}


const CatalogContainer = styled(Container)`  
     & {
        position: relative;
        top: 55px;
        height: 90vh;
        overflow-y: auto;
     }
`;


export default Catalog;
