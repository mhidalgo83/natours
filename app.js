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

app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id'
    });
  }
  const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    results: tour,
    data: {
      tour
    }
  });
});

//Create new tour
app.post('/api/v1/tours', (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id'
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'updated tour'
    }
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`App is running on ${port}...`);
});
