import React, { useState } from "react";
import Navigation from '../layouts/Navigation'
import {Button, Modal, Form, FormControl, InputGroup, Container} from 'react-bootstrap'
import DynamicForm from '../utils/DynamicForm'
import Questions from '../utils/Questions'

const ColoredLine = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 1,
      }}
  />
);

function CreateQuiz (props){

    const [notes, setNotes] = useState([]);

    //Temp data to hold edit data
    const [tempNote, setTemp] = useState({
      id:0,
      Question: "",
      Type:"NA",
      Choice1: "",
      Choice2: "",
      Choice3: "",
      Choice4: "",
      Choice5: "",
      Choice6: "",
      AnswerKey:"",
      Sel2Open: true,
      Sel3Open: true,
      Sel4Open: true,
      Sel5Open: true,
      Sel6Open: true,
      AnsKeyOpen: true,
      show: false,
    });

    // function to sync the temp with actual data
    function tempSync(passedNotes){
      tempNote.Question = passedNotes[tempNote.id].Question
      tempNote.Type = passedNotes[tempNote.id].Type
      tempNote.Choice1 = passedNotes[tempNote.id].Choice1
      tempNote.Choice2 = passedNotes[tempNote.id].Choice2
      tempNote.Choice3 = passedNotes[tempNote.id].Choice3
      tempNote.Choice4 = passedNotes[tempNote.id].Choice4
      tempNote.Choice5 = passedNotes[tempNote.id].Choice5
      tempNote.Choice6 = passedNotes[tempNote.id].Choice6
      tempNote.AnswerKey = passedNotes[tempNote.id].AnswerKey
      tempNote.Sel1Open = passedNotes[tempNote.id].Sel1Open
      tempNote.Sel2Open = passedNotes[tempNote.id].Sel2Open
      tempNote.Sel3Open = passedNotes[tempNote.id].Sel3Open
      tempNote.Sel4Open = passedNotes[tempNote.id].Sel4Open
      tempNote.Sel5Open = passedNotes[tempNote.id].Sel5Open
      tempNote.Sel6Open = passedNotes[tempNote.id].Sel6Open
      tempNote.AnsKeyOpen = passedNotes[tempNote.id].AnsKeyOpen
    }

    //function to modal to get a new data input from a user
    function getUpdateData(questionArr){
      return(
        <div>
            <Modal size="lg" show = {tempNote.show}>
            <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Question:</Form.Label>
                    <Form.Control type="text" name ="Question" onChange={createTemp} defaultValue={tempNote.Question}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Select name="Type" onChange={createTemp} defaultValue={tempNote.Type}>
                        <option value="NA" selected hidden>Question type</option>
                        <option value="TF">True or False</option>
                        <option value="SC">Single Choice</option>
                        <option value="MC">Multiple Choice</option>
                        <option value="FA">Free Answer</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text" name = "Choice1" onChange={createTemp} defaultValue={tempNote.Choice1} placeholder='Selection 1' disabled={tempNote.Sel1Open}/>
                    <Form.Control type="text" name = "Choice2" onChange={createTemp} defaultValue={tempNote.Choice2} placeholder='Selection 2' disabled={tempNote.Sel2Open}/>
                    <Form.Control type="text" name = "Choice3" onChange={createTemp} defaultValue={tempNote.Choice3} placeholder='Selection 3' disabled={tempNote.Sel3Open}/>
                    <Form.Control type="text" name = "Choice4" onChange={createTemp} defaultValue={tempNote.Choice4} placeholder='Selection 4' disabled={tempNote.Sel4Open}/>
                    <Form.Control type="text" name = "Choice5" onChange={createTemp} defaultValue={tempNote.Choice5} placeholder='Selection 5' disabled={tempNote.Sel5Open}/>
                    <Form.Control type="text" name = "Choice6" onChange={createTemp} defaultValue={tempNote.Choice6} placeholder='Selection 6' disabled={tempNote.Sel6Open}/>
                </Form.Group>
                <InputGroup className="mb-3">
                    <FormControl type="text" name = "AnswerKey" onChange={createTemp} defaultValue={tempNote.AnswerKey} placeholder='AnswerKey' disabled={tempNote.AnsKeyOpen}/>
                    <Button variant="warning" id="button-addon2" onClick={() => changeData(questionArr[tempNote.id])}>
                        Save
                    </Button>
                    <Button variant="danger" id="button-addon2" value={"close"} onClick={editCnl}>
                        Cancel
                    </Button>
                </InputGroup>
            </Form>
            </Container>
          </Modal>
        </div>
      )
    }

    //this is a form input handler
    function handleInput(name, value) {
      switch(name) {
          case 'Type':
              if(value === "FA"){
                tempNote.addOpen = false
                tempNote.Choice1 = ""
                tempNote.Choice2 = ""
                tempNote.Choice3 = ""
                tempNote.Choice4 = ""
                tempNote.Choice5 = ""
                tempNote.Choice6 = ""
                tempNote.AnswerKey = ""
                tempNote.AnsKeyOpen = true
                tempNote.Sel1Open = true
                tempNote.Sel2Open = true
                tempNote.Sel3Open = true
                tempNote.Sel4Open = true
                tempNote.Sel5Open = true
                return tempNote.Sel6Open = true;
              }
              if(value === "TF"){
                tempNote.Choice1 = "True"
                tempNote.Choice2 = "False"
                tempNote.Choice3 = ""
                tempNote.Choice4 = ""
                tempNote.Choice5 = ""
                tempNote.Choice6 = ""
                tempNote.AnswerKey = ""
                tempNote.AnsKeyOpen = false
                tempNote.Sel1Open = true
                tempNote.Sel2Open = true
                tempNote.Sel3Open = true
                tempNote.Sel4Open = true
                tempNote.Sel5Open = true
                return tempNote.Sel6Open = true;
              }
              if(value === "SC"){
                  tempNote.AnsKeyOpen = true;
              }
              if(value === "MC"){
                  tempNote.AnsKeyOpen = true;  
              }
              return tempNote.Sel1Open = false;
          case 'Choice1':
            tempNote.AnsKeyOpen = false;
              return tempNote.Sel2Open = false;
          case 'Choice2':
              return tempNote.Sel3Open = false; 
          case 'Choice3':
              return tempNote.Sel4Open = false;
          case 'Choice4':
              return tempNote.Sel5Open = false;
          case 'Choice5':
              return tempNote.Sel6Open = false;
          case 'AnswerKey':
              return tempNote.addOpen = false;
      }
    }

    // it creats tempQuestion data
    function createTemp(event){
      const { name, value } = event.target;
      
      console.log(name, value)

      handleInput(name, value)
      setTemp((preveTemp) => {
        return{
          ...preveTemp,
          [name]:value
        };
      });
    }

    //just return current notes to re-render data
    function reRender()
    {
      setNotes(Notes => {
        return [...Notes];
      });
    }

    //Change actual data that needs to be saved
    function changeData(actualData){
      console.log(tempNote)
      actualData.Question = tempNote.Question
      actualData.Type = tempNote.Type
      actualData.Choice1 = tempNote.Choice1
      actualData.Choice2 = tempNote.Choice2
      actualData.Choice3 = tempNote.Choice3
      actualData.Choice4 = tempNote.Choice4
      actualData.Choice5 = tempNote.Choice5
      actualData.Choice6 = tempNote.Choice6
      actualData.AnswerKey = tempNote.AnswerKey
      actualData.Sel2Open = tempNote.Sel2Open
      actualData.Sel3Open = tempNote.Sel3Open
      actualData.Sel4Open = tempNote.Sel4Open
      actualData.Sel5Open = tempNote.Sel5Open
      actualData.Sel6Open = tempNote.Sel6Open
      actualData.AnsKeyOpene = tempNote.AnsKeyOpene
      setTemp({
        id:0,
        Question: "",
        Type:"NA",
        Choice1: "",
        Choice2: "",
        Choice3: "",
        Choice4: "",
        Choice5: "",
        Choice6: "",
        AnswerKey:"",
        Sel2Open: true,
        Sel3Open: true,
        Sel4Open: true,
        Sel5Open: true,
        Sel6Open: true,
        AnsKeyOpen: true,
        show: false,
      });
      reRender()
    }

    function addNote(newNote) {
      setNotes(prevNotes => {
        return [...prevNotes, newNote];
      });
    }
  
    function deleteNote(id) {
      console.log(id)
      setNotes(prevNotes => {
        return prevNotes.filter((noteItem, index) => {
          return index !== id;
        });
      });
    }
    
    function editNote(id){
        tempNote.show = true
        tempNote.id = id
        tempSync(notes)

        reRender()
    }

    function editCnl(){
      tempNote.show = false
      setTemp({
        id:0,
        Question: "",
        Type:"NA",
        Choice1: "",
        Choice2: "",
        Choice3: "",
        Choice4: "",
        Choice5: "",
        Choice6: "",
        AnswerKey:"",
        Sel2Open: true,
        Sel3Open: true,
        Sel4Open: true,
        Sel5Open: true,
        Sel6Open: true,
        AnsKeyOpen: true,
        show: false,
      });
      reRender()
    }

    function onSubmit(event){
      console.log(notes)
      event.preventDefault();
    }

    return (
        <div>
            <DynamicForm onAdd={addNote} /><br/>
            {notes.map((noteItem, index) => {
                return (
                  <div>
                    <Questions
                    key={index}
                    id={index}
                    Question={noteItem.Question}
                    Type={noteItem.Type}
                    Choice1 = {noteItem.Choice1}
                    Choice2 = {noteItem.Choice2}
                    Choice3 = {noteItem.Choice3}
                    Choice4 = {noteItem.Choice4}
                    Choice5 = {noteItem.Choice5}
                    Choice6 = {noteItem.Choice6}
                    AnswerKey = {noteItem.AnswerKey} 
                    onDelete = {deleteNote}
                    onEdit = {editNote}
                    />
                    <ColoredLine color = "grey"/>
                  </div>
                 );
            })}
            {notes.length >= 1 &&
              getUpdateData(notes)}
            {notes.length >= 1 &&
              <div style={{textAlign:'right'}}><Button variant="warning" onClick={onSubmit}>Complete</Button></div>
            }
      </div>
    );
}

export default CreateQuiz
