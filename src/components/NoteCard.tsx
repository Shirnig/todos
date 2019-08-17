import React, {Fragment} from "react";
// @ts-ignore
import styled from "styled-components";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import {Item,Note} from "../iterfaces/notes.interface";


export default function NoteCard({note, updateChecked, noteId, removeNote} : {note:Note,updateChecked:any,noteId:Number,removeNote:any}){
    return(
        <CardContainer className="col-xs-10 col-sm-6 col-lg-3 col-xl-3">
        <Card>
            <Card.Header className="header" onClick={()=>removeNote(noteId)}>
                <span className="title">{note.title}</span>
                <i className="fa fa-times removeIcon" title="Remove Note" aria-hidden="true"/>
            </Card.Header>
            <ListGroup variant="flush">
                {note.items.map((item: Item, idx: number)=>{

                    return (<Fragment key={idx}>

                            <ListGroup.Item className={item.checked ? 'list checked' : 'list'}>
                                <span>{item.content}</span>

                                <InputGroup className="checkboxWrapper">
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox checked={item.checked} onChange={({target})=>updateChecked(note.id,idx,target.checked)}/>
                                    </InputGroup.Prepend>
                                </InputGroup>
                            </ListGroup.Item>

                        </Fragment>

                    )
                })}
                <ListGroup.Item>
                    <span style={{fontSize:"15px"}}>Updated to {note.update_date}</span>
                </ListGroup.Item>
            </ListGroup>
        </Card>
        </CardContainer>
    )
}

const CardContainer = styled(Container)`  
@import url('https://fonts.googleapis.com/css?family=Bitter&display=swap');

     & {
        padding:2px;
        margin-top:2px;
        font-family: 'Bitter', serif;
     }
     
     .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;
     }
     
     .title {
        font-weight: bold;
     }
     
     .removeIcon:hover {
        cursor: pointer;
     }
     
     .list {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
     }
     
     .checked {
        background-color: #b3ffb3;
     }
     
     .checkboxWrapper {
        width: 15%;
     }
`;
