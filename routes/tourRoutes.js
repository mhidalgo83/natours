const express = require('express');
const {
  aliasTopTours,
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  getTourStats,
} = require('../controllers/tourControllers');

const router = express.Router();

// router.param('id', checkID);

// Create a check body middleware
// Check if body contains the name and price property
// If not, send back a 400 (bad request)
// Add it to the post handler stack
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
