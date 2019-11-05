const fs = require('fs');
const express = require('express');

const app = express();

//Middleware
app.use(express.json());

/*
app.get(`/`, (req, res) => {
  res.status(200).json({ message: `Hello from the server`, app: `Natours` });
});
app.post(`/`, (req, res) => {
  res.send(`You can post to this end point...`);
});
*/

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//Get all tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
});

//Create new tour
app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);
  res.send('Updating...');
});

const port = 3000;

app.listen(port, () => {
  console.log(`App is running on ${port}...`);
});
