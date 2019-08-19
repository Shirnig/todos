import React from "react";
import {inject, observer} from "mobx-react";
import styled from "styled-components";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import {AddNoteState} from "../iterfaces/notes.interface";
const moment = require('moment');
const _ = require('lodash');



@inject('NotesStore')
@observer
class AddNote extends React.Component<any, AddNoteState> {
    constructor(props: any, context: any) {
        super(props, context);

        this.handleClose = this.handleClose.bind(this);

        this.state = {
            title: '',
            current_item: '',
            items: [],
            create_date: moment().format('YYYY-MM-DD HH:mm'),
            update_date: moment().format('YYYY-MM-DD HH:mm'),
            error: ''
        };
    }

    addItem() {
        if(this.state.current_item) {
            this.state.items.push(this.state.current_item);
            this.setState({current_item: '', error: ''});
        }
    }

    removeItem(idx: number){
        let updatedNotes = this.state.items;
        updatedNotes.splice(idx,1);
        this.setState({
            items: updatedNotes
        })
    }

    addNote() {
            if(this.validateFields()) {
                    let {title, items, create_date, update_date} = this.state;
                    items = items.map((item)=>{return{content:item, checked:false}});
                    this.props.NotesStore.addNote({title, create_date, update_date, items});
                    this.handleClose();
            }
    }


    validateFields(){
        if(!this.state.title || _.isEmpty(this.state.items)){
            this.setState({error:"All Fields Required"});
        }
        return this.state.title && !_.isEmpty(this.state.items)
    }


    handleClose() {
        this.props.setDisplayAddModal({displayAddModal: false})
    }

    onChange(field:any, value:any) {
        // @ts-ignore
        this.setState({
            [field]: value
        })
    }

    render(): JSX.Element {
        return (<Modal show={this.props.showModal} onHide={this.handleClose}>

                    <Modal.Header className="header" closeButton>
                        <Modal.Title className="title">
                            <Form.Group controlId="title" style={{margin:0}}>
                                <Form.Control type="text" placeholder="Title" value={this.state.title}
                                              onChange={({target}:{target:any}) => this.onChange('title', target.value)} />
                            </Form.Group>

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Row>

                                <Col xs="9" md="10" xl="10">
                                    <Form.Group controlId="current-item">
                                        <Form.Control type="text" placeholder="Note" value={this.state.current_item}
                                                      onChange={({target}:{target:any}) => this.onChange('current_item', target.value)} />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Button variant="success" onClick={()=>this.addItem()}>
                                        Add
                                    </Button>
                                </Col>

                            </Form.Row>
                        </Form>

                        <ListGroup>
                            {this.state.items.map((li, idx)=>
                                <LiStyled key={idx} className="item" title="Remove Item" onClick={()=>this.removeItem(idx)}>{li}</LiStyled>)}
                        </ListGroup>

                        {this.state.error? <p style={{color:"red"}}>{this.state.error}</p>:null}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>

                        <Button variant="primary" onClick={()=>this.addNote()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>

                </Modal>
        );
    }

    }


const LiStyled = styled(ListGroup.Item)`  
     &:hover {
        background-color: #cc0000;
        cursor: pointer;
     }
`;





export default AddNote;
