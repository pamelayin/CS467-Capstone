import React, { useState } from "react";
import {Form, Button, Container, Row, Col} from 'react-bootstrap'

const instyle = {
  marginBottom: '5px'
}

function Questions(props) {

  function handleClick() {
    props.onDelete(props.id);
  }

  function handleEdit() {
    props.onEdit(props.id)
  }

  return (
    <div>
        <Container>
          <Row>
            <Col sm={9}> <span style={{fontWeight:500, fontSize:25}}>{props.id + 1}.{props.Question}</span></Col>
            <Col sm={3} style = {{textAlign:"right"}}>
              <Button  variant="danger" size="sm" onClick={handleClick}>Delete</Button>{' '}
              <Button  variant="secondary" size="sm" onClick={handleEdit}>Edit</Button>
            </Col>
          </Row>
        </Container>
        <Container>
        Question Type: {props.Type === "TF" &&
            <span>True or False</span> ||
            props.Type === "SC" &&
            <span>Single Choice</span> ||
            props.Type === "MC" &&
            <span>Multiple Choice</span> ||
            props.Type === "SC" &&
            <span>Free Answer</span>
          }

        {props.Choice1 !== "" && <p style={instyle}>1. {props.Choice1}</p>}
        {props.Choice2 !== "" && <p style={instyle}>2. {props.Choice2}</p>}
        {props.Choice3 !== "" && <p style={instyle}>3. {props.Choice3}</p>}
        {props.Choice4 !== "" && <p style={instyle}>4. {props.Choice4}</p>}
        {props.Choice5 !== "" && <p style={instyle}>5. {props.Choice5}</p>}
        {props.Choice6 !== "" && <p style={instyle}>6. {props.Choice6}</p>}
        {props.AnswerKey !== "" && <p>Answer Key: {props.AnswerKey}</p>}
        </Container>
    </div>
  );
}

export default Questions;
