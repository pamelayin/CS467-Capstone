import React, { useState } from "react";
import {
	Form,
	Button,
	Container,
	InputGroup,
	FormControl,
} from "react-bootstrap";

const ColoredLine = ({ color }) => (
	<hr
		style={{
			color: color,
			backgroundColor: color,
			height: 4,
			marginTop: 0,
		}}
	/>
);

const instyle = {
	marginBottom: 5,
};

function DynamicForm(props) {
	//question data need to be saved
	const [note, setNote] = useState({
		Question: "",
        points: 0,
		Type: "NA",
		Choice1: "",
		Choice2: "",
		Choice3: "",
		Choice4: "",
		Choice5: "",
		Choice6: "",
		AnswerKey: "",
		//below is for form control vars
		Sel1Open: true,
		Sel2Open: true,
		Sel3Open: true,
		Sel4Open: true,
		Sel5Open: true,
		Sel6Open: true,
		AnsKeyOpen: true,
		addOpen: true,
	});

	function handleInput(name, value) {
		switch (name) {
			case "Type":
				if (value === "FA") {
					note.addOpen = false;
					note.Choice1 = "";
					note.Choice2 = "";
					note.Choice3 = "";
					note.Choice4 = "";
					note.Choice5 = "";
					note.Choice6 = "";
					note.AnswerKey = "";
					note.AnsKeyOpen = true;
					note.Sel1Open = true;
					note.Sel2Open = true;
					note.Sel3Open = true;
					note.Sel4Open = true;
					note.Sel5Open = true;
					return (note.Sel6Open = true);
				}
				if (value === "TF") {
					note.Choice1 = "True";
					note.Choice2 = "False";
					note.Choice3 = "";
					note.Choice4 = "";
					note.Choice5 = "";
					note.Choice6 = "";
					note.AnsKeyOpen = false;
					note.Sel1Open = true;
					note.Sel2Open = true;
					note.Sel3Open = true;
					note.Sel4Open = true;
					note.Sel5Open = true;
					return (note.Sel6Open = true);
				}
				if (value === "SC") {
					note.AnsKeyOpen = true;
				}
				if (value === "MC") {
					note.AnsKeyOpen = true;
				}
				return (note.Sel1Open = false);
			case "Choice1":
				note.AnsKeyOpen = false;
				return (note.Sel2Open = false);
			case "Choice2":
				return (note.Sel3Open = false);
			case "Choice3":
				return (note.Sel4Open = false);
			case "Choice4":
				return (note.Sel5Open = false);
			case "Choice5":
				return (note.Sel6Open = false);
			case "AnswerKey":
				return (note.addOpen = false);
            default:
                return;
		}
	}

	function handleChange(event) {
		const { name, value } = event.target;
		handleInput(name, value);
		setNote((prevNote) => {
			return {
				...prevNote,
				[name]: value,
			};
		});
	}

	function submitNote(event) {
		props.onAdd(note);

		setNote({
			Question: "",
            points: 0,
			Type: "NA",
			Choice1: "",
			Choice2: "",
			Choice3: "",
			Choice4: "",
			Choice5: "",
			Choice6: "",
			AnswerKey: "",
			Sel2Open: true,
			Sel3Open: true,
			Sel4Open: true,
			Sel5Open: true,
			Sel6Open: true,
			AnsKeyOpen: true,
			addOpen: true,
		});
		event.preventDefault();
	}

	return (
		<div>
			<div
				style={{
					marginBottom: "auto",
					width: "100%",
					height: "auto",
					display: "block",
				}}
			>
				<div style={{ float: "left", width: "25%" }}>
					<Container style={{ marginBottom: 15 }}>
						<span className="mb-0 h3">Create your quiz</span>
					</Container>
					<Container>
						Please read this carefully and follow the instruction to create your
						quiz <br />
						<br />
						1. Enter your Question <br />
						2. Select a type <br />
						3. Fill the choices up to choice 6<br />
						4. Give a answer key <br />
						5. Please review contents before add <br />
						6. Provide your Answer Key with Integer Value <br />
						7. If you feel good to add, click add
						<br />
						<br />
						After create as much questions as you want, please review and edit
						your questions if you want to change your question. Once you
						finalized your review, please click "Complete"
					</Container>
				</div>
				<div style={{ float: "left", width: '75%' }}>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Question:</Form.Label>
							<Form.Control
								type="text"
								name="Question"
								onChange={handleChange}
								value={note.Question}
							/>
						</Form.Group>
                        <Form.Group className="mb-3">
							<Form.Label>Points:</Form.Label>
							<Form.Control
								type="text"
								name="points"
								onChange={handleChange}
								value={note.points}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Select
								name="Type"
								onChange={handleChange}
								value={note.Type}
							>
								<option value="NA" selected hidden>
									Question type
								</option>
								<option value="TF">True or False</option>
								<option value="SC">Single Choice</option>
								<option value="MC">Multiple Choice</option>
								<option value="FA">Free Response</option>
							</Form.Select>
						</Form.Group>
						<Form.Group>
							<Form.Control
								type="text"
								name="Choice1"
								onChange={handleChange}
								value={note.Choice1}
								placeholder="Selection 1"
								style={instyle}
								disabled={note.Sel1Open}
							/>
							<Form.Control
								type="text"
								name="Choice2"
								onChange={handleChange}
								value={note.Choice2}
								placeholder="Selection 2"
								style={instyle}
								disabled={note.Sel2Open}
							/>
							<Form.Control
								type="text"
								name="Choice3"
								onChange={handleChange}
								value={note.Choice3}
								placeholder="Selection 3"
								style={instyle}
								disabled={note.Sel3Open}
							/>
							<Form.Control
								type="text"
								name="Choice4"
								onChange={handleChange}
								value={note.Choice4}
								placeholder="Selection 4"
								style={instyle}
								disabled={note.Sel4Open}
							/>
							<Form.Control
								type="text"
								name="Choice5"
								onChange={handleChange}
								value={note.Choice5}
								placeholder="Selection 5"
								style={instyle}
								disabled={note.Sel5Open}
							/>
							<Form.Control
								type="text"
								name="Choice6"
								onChange={handleChange}
								value={note.Choice6}
								placeholder="Selection 6"
								style={instyle}
								disabled={note.Sel6Open}
							/>
						</Form.Group>
						<InputGroup className="mb-3">
							<FormControl
								type="text"
								name="AnswerKey"
								onChange={handleChange}
								value={note.AnswerKey}
								placeholder="AnswerKey"
								disabled={note.AnsKeyOpen}
							/>
							<Button
								variant="warning"
								id="button-addon2"
								onClick={submitNote}
								disabled={note.addOpen}
							>
								Add Question
							</Button>
						</InputGroup>
					</Form>
				</div>
			</div>
			<div
				style={{
					marginBottom: "auto",
					width: "100%",
					height: "auto",
					display: "",
				}}
			>
				<p>&nbsp;</p>
				<ColoredLine color="#FFC300" />
			</div>
		</div>
	);
}

export default DynamicForm;
