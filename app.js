const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  
})

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    res.status(404).json({ message: 'failure', error: 'Invalid ID' });
  } else {
    res.status(200).json({
      status: 'success',
      results: 1,
      data: {
        tour,
      },
    });
  }
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(500).send({ status: 'New tour not saved', error: err });
      } else {
        res.status(201).json({ status: 'success', tour: newTour });
      }
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    res.status(404).json({ status: 'failure', message: 'Invalid ID' });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here>',
      },
    });
  }
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    res.status(404).json({ status: 'failure', message: 'Invalid ID' });
  } else {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(3000, () => {
  console.log(`App running on port ${port}`);
});
