import React, { useEffect, useState } from 'react';

const CreateUser = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {}, []);

  const onHandleChange = (ev) => {
    setUsername(ev.target.value);
  };

  const onHandleSubmit = (ev) => {
    ev.preventDefault();
    const user = {
      username,
    };

    console.log(user, 'user ??');

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
