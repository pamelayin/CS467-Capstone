import React, { Fragment, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./components/auth/Register";
import PrivateRoute from "./components/routes/PrivateRoute";
import ContactUs from "./components/pages/ContactUs";
import Login from "./components/auth/Login";
import ManageAccount from "./components/pages/ManageAccount";
import EditProfile from "./components/pages/EditProfile";
import QuizList from "./components/pages/QuizList";
import Dashboard from "./components/layouts/Dashboard";
import Navigation from "./components/layouts/Navigation";
import CreateQuiz from "./components/pages/CreateQuiz";
import QuizDashboard from "./components/pages/QuizDashboard";
import RespondentInfo from "./components/pages/RespondentInfo";
import RespondentQuiz from "./components/pages/RespondentQuiz";

import AuthState from "./context/auth/AuthState";
import QuizState from "./context/quiz/QuizState";
import GreetContext from "./context/NavText/GreetContext";
import RespondentState from "./context/respondent/RespondentState";


function App() {
	const [greeting, setGreeting] = useState("Welcome");
	const value = { greeting, setGreeting };
	return (
		<AuthState>
			<GreetContext.Provider value={value}>
				<QuizState>
                    <RespondentState>
                        <BrowserRouter>
                            <Fragment>
                                <div className="container">
                                    <Routes>
                                        <Route path="/register" element={<Register />} />
                                        <Route path="/login" element={<Login />} />
                                        <Route path='/userInfo/:userId/quiz/:quizId' element={<RespondentInfo />} />
                                        <Route path="/user/:userId/quiz/:quizId" element={<RespondentQuiz />} />
                                        <Route
                                            path="/"
                                            element={<PrivateRoute component={Navigation} />}
                                        >
                                            <Route
                                                index
                                                element={<PrivateRoute component={Dashboard} />}
                                            />
                                            <Route
                                                path="/account"
                                                element={<PrivateRoute component={ManageAccount} />}
                                            />
                                            <Route
                                                path="/editprofile"
                                                element={<PrivateRoute component={EditProfile} />}
                                            />
                                            <Route
                                                path="/quizlist"
                                                element={<PrivateRoute component={QuizList} />}
                                            />
                                            <Route
                                                path="/contact"
                                                element={<PrivateRoute component={ContactUs} />}
                                            />
                                            <Route
                                                path="/createquiz"
                                                element={<PrivateRoute component={CreateQuiz} />}
                                            />
                                            <Route
                                                path="/quiz/:id"
                                                element={<PrivateRoute component={QuizDashboard} />}
                                            />
                                        </Route>
                                    </Routes>
                                </div>
                            </Fragment>
                        </BrowserRouter>
                    </RespondentState>
				</QuizState>
			</GreetContext.Provider>
		</AuthState>
	);
}

export default App;
