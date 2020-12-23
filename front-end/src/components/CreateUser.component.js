import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {}, []);

  const onHandleChange = (ev) => {
    setUsername(ev.target.value);
  };

  const onHandleSubmit = async (ev) => {
    ev.preventDefault();
    const user = {
      username,
    };

    try {
      const { data } = await axios.post('http://localhost:5000/users/add', user);
      console.log(data);
    } catch (err) {
      console.log(err);
    }

    setUsername('');
  };

  return (
    <>
      <h3>Create New User</h3>
      <form onSubmit={onHandleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input required className="form-control" value={username} onChange={onHandleChange} />
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default CreateUser;
