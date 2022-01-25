import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import Register from './components/auth/Register';
import PrivateRoute from './components/routes/PrivateRoute';
import ContactUs from './components/pages/ContactUs';
import Login from './components/auth/Login';
import ManageAccount from "./components/pages/ManageAccount";
import EditProfile from "./components/pages/EditProfile";
import QuizList from "./components/pages/QuizList";
import Dashboard from './components/layouts/Dashboard';
import Navigation from './components/layouts/Navigation';

import AuthState from './context/auth/AuthState';

function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <Fragment>
          <div className='container'>
            <Routes>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route 
                path='/' 
                element={<PrivateRoute 
                  component={
                    () => (<Navigation greeting={'Welcome'} />)
                  } />}>
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
                  path='contact' 
                  element={<PrivateRoute 
                  component={ContactUs} />} 
                />
              </Route>
            </Routes>
          </div>
        </Fragment>
      </BrowserRouter>
    </AuthState>
	);
}

export default App;
