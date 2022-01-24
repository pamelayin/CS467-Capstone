import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Table } from "react-bootstrap";

function QuizList() {
	const [id, setId] = useState("");
	// useEffect(
	// 	function () {
	// 		axios.get("https://localhost:7000/api/auth")
	// 			.then((res) => {
	// 				console.log(res.data);
	// 			})
	// 			.catch((err) => {
	// 				console.log(err.message);
	// 		})
	// 	}
	// )
	return (
		<Container>
			<h1 className="my-5">Past Quizzes</h1>
			<Table striped bordered hover responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>Quiz ID</th>
						<th>Quiz Title</th>
						<th>Date Created</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>object ID 1</td>
						<td>Freshmen/Sophomores - OSU</td>
						<td>1/20/2022</td>
						<td>
							<a href="/">view/edit</a>&nbsp;&nbsp;<a href="/">delete</a>
						</td>
					</tr>
					<tr>
						<td>2</td>
						<td>object ID 2</td>
						<td>Juniors/Seniors - OSU</td>
						<td>1/21/2022</td>
						<td>
							<a href="/">view/edit</a>&nbsp;&nbsp;<a href="/">delete</a>
						</td>
					</tr>
					<tr>
						<td>3</td>
						<td>object ID 3</td>
						<td>New Grad - OSU</td>
						<td>1/22/2022</td>
						<td>
							<a href="/">view/edit</a>&nbsp;&nbsp;<a href="/">delete</a>
						</td>
					</tr>
				</tbody>
			</Table>
		</Container>
	);
}

export default QuizList;
