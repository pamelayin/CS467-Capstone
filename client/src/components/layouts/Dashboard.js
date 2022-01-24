import React from 'react'
import {Container, Table} from 'react-bootstrap';
import{NavLink as RouterNavLink} from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>         
            <Table responsive="md" borderless>
                <tbody align="center" justifyContent="center">
                    <tr height="200px">
                        <td>Create New Quiz</td>
                        <td>Past Quizzes</td>
                        <td>Mailing List</td>
                    </tr>
                    <tr>
                        <td>Manage Account</td>
                        <td>Customer Service</td>
                        <td>image placeholder</td>
                    </tr>
                </tbody>   
            </Table>         
        </div>
    )
}

export default Dashboard
