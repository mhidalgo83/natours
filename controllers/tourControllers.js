const Tour = require('../models/tourSchema');

// Used to read tour file while in early development
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.getAllTours = async (req, res) => {
  try {
    //BUILD QUERY
    // Copies query req.query to new object
    const queryObj = { ...req.query };
    // List of excldued fields
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // Loop through excluded fields, removing those fields from the query obj
    excludedFields.forEach((el) => delete queryObj[el]);
    // Fetch query results from db
    const query = await Tour.find(queryObj);
    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');
    // Assign results to new variable
    const tours = await query;
    // Return results
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: 'Tours not found' });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      results: 1,
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: 'Tour not found' });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: 'Tour not found' });
  }
};
