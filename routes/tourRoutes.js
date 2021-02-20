const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourControllers');

const router = express.Router();

// router.param('id', checkID);

// Create a check body middleware
// Check if body contains the name and price property
// If not, send back a 400 (bad request)
// Add it to the post handler stack

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
