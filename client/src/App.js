import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/auth/Register';
import PrivateRoute from './components/routes/PrivateRoute';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import ManageAccount from "./components/pages/ManageAccount";
import EditProfile from "./components/pages/EditProfile";
import QuizList from "./components/pages/QuizList";
import AuthState from './context/auth/AuthState';

function App() {
  return (
		<AuthState>
			<BrowserRouter>
				<Fragment>
					<div className="container">
						<Routes>
							<Route path="/" element={<PrivateRoute component={Home} />} />
							<Route index path="/register" element={<Register />} />
							<Route path="/login" element={<Login />} />
							<Route
								path="/account"
								element={<PrivateRoute component={ManageAccount} />}
							/>
							<Route
								path="/editprofile"
								element={<PrivateRoute component={EditProfile} />}
							/>
							<Route path="/quizlist" element={<PrivateRoute component={QuizList} />} />
						</Routes>
					</div>
				</Fragment>
			</BrowserRouter>
		</AuthState>
	);
}

export default App;
