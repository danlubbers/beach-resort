import React from 'react';
import './App.css';

import Home from './pages/Home'
import Rooms from './pages/Rooms'
import SingleRoom from './pages/SingleRoom'
import Error from './pages/Error'
import Navbar from './components/Navbar';

import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <>
      {/* Placing the Navbar outside of the Switch allows it to be accessed across all pages */}
      <Navbar />
      {/* Switch is placed so if no route matches a component, the page that will be displayed is going to be the Route without a path, specifically the Error Component */}
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/rooms/" component={Rooms}/>
        <Route exact path="/rooms/:slug" component={SingleRoom}/>
        <Route component={Error}/> 
      </Switch>
    
    </>
  )
}

export default App;
