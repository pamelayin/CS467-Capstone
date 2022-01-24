import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './components/auth/Register';
import PrivateRoute from './components/routes/PrivateRoute';
import Home from './components/pages/Home';
import ContactUs from './components/pages/ContactUs';
import Login from './components/auth/Login';

import AuthState from './context/auth/AuthState';

function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <Fragment>
          <div className='container'>
            <Routes>
              <Route path='/' element={<PrivateRoute component={Home} />} /> 
              <Route index path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/ContactUs' element={<ContactUs />} />
              <Route path='/Home' element={<Home />} />

            </Routes>
          </div>
        </Fragment>
      </BrowserRouter>
    </AuthState>
  );
}

export default App;
