import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Createxercise = () => {
  const [state, setState] = useState({
    username: '',
    description: '',
    duration: 0,
    users: [],
    date: new Date(),
  });

  const [date, setStartDate] = useState(new Date());

  const history = useHistory();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/users');

        setState({
          ...state,
          username: data[0].username,
          users: data.map((user) => user.username),
        });
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, []);

  const onHandleChange = (ev) => {
    setState({ ...state, [ev.target.name]: ev.target.value });
  };

  const onHandleDate = (date) => {
    setStartDate(date);
  };

  const onHandleSubmit = async (ev) => {
    ev.preventDefault();
    const { username, description, duration, users } = state;
    const exercise = {
      username,
      description,
      duration,
      date,
      users,
    };

    console.log(exercise, 'exercise add');

    try {
      const { data } = await axios.post('http://localhost:5000/exercises/add', exercise);
      console.log(data);
    } catch (err) {
      console.log(err);
    }

    history.push('/');
  };

  return (
    <>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onHandleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={state.username}
            name="username"
            onChange={onHandleChange}>
            {state.users.map((user, idx) => {
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
          <input type="date" value={date} name="date" onChange={onHandleChange} />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Createxercise;
