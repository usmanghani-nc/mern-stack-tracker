import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Exercise = ({ exercise, deleteExercises }) => {
  const { username, description, duration, date, _id } = exercise;
  return (
    <tr>
      <td>{username}</td>
      <td>{description}</td>
      <td>{duration}</td>
      <td>{date.substring(0, 10)}</td>
      <td>
        <Link to={`/edit/${_id}`}>edit</Link> |{' '}
        <a href="#" onClick={() => deleteExercises(_id)}>
          delete
        </a>
      </td>
    </tr>
  );
};

const ExerciseList = () => {
  const [state, setState] = useState({ exercises: [] });

  useEffect(() => {
    const getExercises = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/exercises');

        console.log('get', data);
        setState({
          ...state,
          exercises: data,
        });
      } catch (err) {
        console.log(err);
      }
    };

    getExercises();
  }, []);

  const deleteExercises = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:5000/exercises/${id}`);

      setState({
        ...state,
        exercises: state.exercises.filter((el) => el._id !== id),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3>Logged Exercise</h3>

      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.exercises.map((currExer) => {
            return (
              <Exercise exercise={currExer} deleteExercises={deleteExercises} key={currExer._id} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExerciseList;
