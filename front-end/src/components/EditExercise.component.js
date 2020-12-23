import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const EditExercise = ({ match }) => {
  const [state, setState] = useState({
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    isloading: true,
  });

  const [users, setUser] = useState([]);

  const history = useHistory();

  const getExercise = async () => {
    try {
      const {
        data: { username, description, duration, date },
      } = await axios.get(`http://localhost:5000/exercises/${match.params.id}`);

      setState({
        ...state,
        username,
        description,
        duration,
        date: new Date(date),
        isloading: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/users');
      const arr = data.map((user) => user.username);
      if (data.length > 0) setUser(arr);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
    getExercise();
  }, []);

  const onHandleChange = (ev) => {
    setState({ ...state, [ev.target.name]: ev.target.value });
  };

  const onHandleSubmit = async (ev) => {
    ev.preventDefault();
    const { username, description, duration, users, date } = state;
    const exercise = {
      username,
      description,
      duration,
      date,
      users,
    };

    try {
      const { data } = await axios.post(
        `http://localhost:5000/exercises/update/${match.params.id}`,
        exercise,
      );
    } catch (err) {
      console.log(err);
    }

    history.push('/');
  };

  return (
    <>
      <h3>Edit Exercise Log</h3>
      {!state.isloading ? (
        <form onSubmit={onHandleSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              required
              className="form-control"
              value={state.username}
              name="username"
              onChange={onHandleChange}>
              {users.length &&
                users.map((user, idx) => {
                  return (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="form-group">
            <label>Description: </label>
            <input
              required
              className="form-control"
              value={state.description}
              name="description"
              onChange={onHandleChange}
            />
          </div>

          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              required
              className="form-control"
              value={state.duration}
              name="duration"
              onChange={onHandleChange}
            />
          </div>

          <div className="form-group">
            <label>Date: </label>
            <input type="date" value={state.date} name="date" onChange={onHandleChange} />
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default EditExercise;
