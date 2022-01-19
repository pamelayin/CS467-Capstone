import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/pages/Home';
import ManageAccount from './components/pages/ManageAccount';
import EditProfile from './components/pages/EditProfile';
import QuizList from "./components/pages/QuizList";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className='container'>
      <Home />
    </div>
  );
}

export default App;
