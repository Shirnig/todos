import React from "react";
import {inject, observer} from "mobx-react";
// @ts-ignore
import styled from "styled-components";
import AddNote from "./AddNote";
import {HeaderState} from "../iterfaces/notes.interface";



@inject('NotesStore')
@observer
class Header extends React.Component<any, HeaderState>{

    constructor(props: any) {
        super(props);
        this.state = {
            displayAddModal: false
        }
    }

    checkNotesCount(){
        if(this.props.NotesStore.notes.length === 10) {
            alert("Only 10 notes allowed, please remove one before inserting new")
        }else {
            this.setState({displayAddModal: true})
        }
    }

    render(): JSX.Element {
        return (<NavBarStyled>
            <ul id="menu-bar">

                <li className="title">Todos! So You Won't Lose</li>

                <li className="add" onClick={()=>this.checkNotesCount()}>
                    <i className="fa fa-plus-square" title="Add Note" aria-hidden="true"/>
                </li>

            </ul>

            {this.state.displayAddModal?
                <AddNote showModal={this.state.displayAddModal} setDisplayAddModal={(value: HeaderState)=>{this.setState(value)}}/>:null}
        </NavBarStyled>)
    }

}



const NavBarStyled = styled.div`
@import url('https://fonts.googleapis.com/css?family=Bitter&display=swap');

  & {
    position: fixed;
    width: 100%;
    z-index: 10;
  }

 #menu-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 6px 6px 4px 6px;
  height: 40px;
  line-height: 100%;
  box-shadow: 2px 2px 3px #666666;
  -webkit-box-shadow: 2px 2px 3px #666666;
  -moz-box-shadow: 2px 2px 3px #666666;
  background: #44528B;
  border: solid 1px #6D6D6D;
 }
 
 #menu-bar li {
  position: relative;
  list-style: none;
  font-weight: normal;
  font-family: 'Bitter', serif;
  font-style: oblique;
  color: #FBFFF7;
  display: block;
}



.add {
  cursor: pointer;
  font-size: xx-large;
}

.fa-plus-square {
  font-size: xx-large;
}
`;

export default Header;
