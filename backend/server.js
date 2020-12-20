const express = require('express');
const cors = require('cors');
const { connect, connection } = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

connect(uri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const userRouter = require('./routes/users');
const exerciseRouter = require('./routes/exercises');

app.use('/users', userRouter);
app.use('/exercises', exerciseRouter);

app.listen(port, () => console.log(`Server runing on ${port}`));
