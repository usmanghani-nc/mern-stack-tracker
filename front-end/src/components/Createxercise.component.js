import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Createxercise = () => {
  const [state, setState] = useState({
    username: '',
    description: '',
    duration: 0,
    users: [],
  });

  const [date, setStartDate] = useState(new Date());

  const history = useHistory();

  useEffect(() => {
    setState({ ...state, username: 'test users', users: ['test users', 'usmanghani'] });
  }, []);

  const onHandleChange = (ev) => {
    setState({ ...state, [ev.target.name]: ev.target.value });
  };

  const onHandleDate = (date) => {
    setStartDate(date);
  };

  const onHandleSubmit = (ev) => {
    ev.preventDefault();
    const { username, description, duration, users } = state;
    const exercise = {
      username,
      description,
      duration,
      date,
      users,
    };

    console.log(exercise, 'EXERCISE ??');

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
          <label>Date: </label> <DatePicker select={date} onChange={(date) => onHandleDate(date)} />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Createxercise;
