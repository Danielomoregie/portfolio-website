/**
 * Workout Routes
 * 
 * Handles all workout-related API endpoints including CRUD operations,
 * workout tracking, and analytics.
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const Workout = require('../models/Workout');
const User = require('../models/User');
const router = express.Router();

// Validation middleware
const validateWorkout = [
  body('name').notEmpty().withMessage('Workout name is required'),
  body('type').isIn(['strength', 'cardio', 'flexibility', 'sports', 'other']).withMessage('Invalid workout type'),
  body('duration').isNumeric().withMessage('Duration must be a number'),
  body('caloriesBurned').optional().isNumeric().withMessage('Calories burned must be a number'),
  body('exercises').isArray().withMessage('Exercises must be an array')
];

// @route   GET /api/workouts
// @desc    Get all workouts for authenticated user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, type, startDate, endDate } = req.query;
    const userId = req.user.id;
    
    // Build query
    const query = { user: userId };
    
    if (type) query.type = type;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    // Execute query with pagination
    const workouts = await Workout.find(query)
      .populate('exercises.exercise', 'name category')
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Workout.countDocuments(query);
    
    res.json({
      success: true,
      data: workouts,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching workouts'
    });
  }
});

// @route   GET /api/workouts/:id
// @desc    Get single workout by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user.id
    }).populate('exercises.exercise', 'name category description');
    
    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }
    
    res.json({
      success: true,
      data: workout
    });
  } catch (error) {
    console.error('Error fetching workout:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching workout'
    });
  }
});

// @route   POST /api/workouts
// @desc    Create new workout
// @access  Private
router.post('/', validateWorkout, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const {
      name,
      type,
      duration,
      caloriesBurned,
      notes,
      exercises,
      date
    } = req.body;
    
    // Create workout
    const workout = new Workout({
      user: req.user.id,
      name,
      type,
      duration,
      caloriesBurned,
      notes,
      exercises,
      date: date ? new Date(date) : new Date()
    });
    
    await workout.save();
    
    // Update user stats
    await User.findByIdAndUpdate(req.user.id, {
      $inc: {
        'stats.totalWorkouts': 1,
        'stats.totalDuration': duration || 0,
        'stats.totalCaloriesBurned': caloriesBurned || 0
      }
    });
    
    // Populate exercise details
    await workout.populate('exercises.exercise', 'name category');
    
    res.status(201).json({
      success: true,
      message: 'Workout created successfully',
      data: workout
    });
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating workout'
    });
  }
});

// @route   PUT /api/workouts/:id
// @desc    Update workout
// @access  Private
router.put('/:id', validateWorkout, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }
    
    // Store old values for stats update
    const oldDuration = workout.duration;
    const oldCalories = workout.caloriesBurned;
    
    // Update workout
    const {
      name,
      type,
      duration,
      caloriesBurned,
      notes,
      exercises,
      date
    } = req.body;
    
    workout.name = name;
    workout.type = type;
    workout.duration = duration;
    workout.caloriesBurned = caloriesBurned;
    workout.notes = notes;
    workout.exercises = exercises;
    if (date) workout.date = new Date(date);
    
    await workout.save();
    
    // Update user stats with difference
    const durationDiff = (duration || 0) - (oldDuration || 0);
    const caloriesDiff = (caloriesBurned || 0) - (oldCalories || 0);
    
    await User.findByIdAndUpdate(req.user.id, {
      $inc: {
        'stats.totalDuration': durationDiff,
        'stats.totalCaloriesBurned': caloriesDiff
      }
    });
    
    // Populate exercise details
    await workout.populate('exercises.exercise', 'name category');
    
    res.json({
      success: true,
      message: 'Workout updated successfully',
      data: workout
    });
  } catch (error) {
    console.error('Error updating workout:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating workout'
    });
  }
});

// @route   DELETE /api/workouts/:id
// @desc    Delete workout
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }
    
    // Update user stats (subtract workout values)
    await User.findByIdAndUpdate(req.user.id, {
      $inc: {
        'stats.totalWorkouts': -1,
        'stats.totalDuration': -(workout.duration || 0),
        'stats.totalCaloriesBurned': -(workout.caloriesBurned || 0)
      }
    });
    
    await Workout.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Workout deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting workout'
    });
  }
});

// @route   GET /api/workouts/stats/summary
// @desc    Get workout statistics summary
// @access  Private
router.get('/stats/summary', async (req, res) => {
  try {
    const userId = req.user.id;
    const { period = '30' } = req.query; // days
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));
    
    // Get workout statistics
    const stats = await Workout.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalWorkouts: { $sum: 1 },
          totalDuration: { $sum: '$duration' },
          totalCalories: { $sum: '$caloriesBurned' },
          avgDuration: { $avg: '$duration' },
          avgCalories: { $avg: '$caloriesBurned' }
        }
      }
    ]);
    
    // Get workout type distribution
    const typeStats = await Workout.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get weekly workout count
    const weeklyStats = await Workout.aggregate([
      {
        $match: {
          user: userId,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            week: { $week: '$date' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.week': 1 }
      }
    ]);
    
    res.json({
      success: true,
      data: {
        summary: stats[0] || {
          totalWorkouts: 0,
          totalDuration: 0,
          totalCalories: 0,
          avgDuration: 0,
          avgCalories: 0
        },
        typeDistribution: typeStats,
        weeklyStats: weeklyStats
      }
    });
  } catch (error) {
    console.error('Error fetching workout stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching workout statistics'
    });
  }
});

// @route   GET /api/workouts/calendar/:year/:month
// @desc    Get workouts for calendar view
// @access  Private
router.get('/calendar/:year/:month', async (req, res) => {
  try {
    const { year, month } = req.params;
    const userId = req.user.id;
    
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    const workouts = await Workout.find({
      user: userId,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    }).select('name type duration caloriesBurned date');
    
    // Group workouts by date
    const calendarData = {};
    workouts.forEach(workout => {
      const date = workout.date.toISOString().split('T')[0];
      if (!calendarData[date]) {
        calendarData[date] = [];
      }
      calendarData[date].push(workout);
    });
    
    res.json({
      success: true,
      data: calendarData
    });
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching calendar data'
    });
  }
});

module.exports = router;
