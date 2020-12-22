import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// components...
import Navbar from './components/Navbar.component';
import ExerciseList from './components/ExerciseList.component';
import EditExercise from './components/EditExercise.component';
import Createxercise from './components/Createxercise.component';
import CreateUser from './components/CreateUser.component';

function App() {
  return (
    <div className="container">
      <Navbar />
      <br />
      <Switch>
        <Route path="/" exact component={ExerciseList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={Createxercise} />
        <Route path="/user" component={CreateUser} />
      </Switch>
    </div>
  );
}

export default App;
