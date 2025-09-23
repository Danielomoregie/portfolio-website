/**
 * User Model
 * 
 * Defines the user schema for the DanielSport application.
 * Includes user authentication, profile information, and fitness data.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  
  // Profile Information
  avatar: {
    type: String,
    default: null
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say'],
    required: [true, 'Gender is required']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[\d\s-()]+$/, 'Please enter a valid phone number']
  },
  
  // Fitness Information
  height: {
    type: Number, // in centimeters
    min: [100, 'Height must be at least 100cm'],
    max: [250, 'Height must be at most 250cm']
  },
  weight: {
    type: Number, // in kilograms
    min: [20, 'Weight must be at least 20kg'],
    max: [300, 'Weight must be at most 300kg']
  },
  fitnessLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'beginner'
  },
  primaryGoals: [{
    type: String,
    enum: ['weight-loss', 'muscle-gain', 'endurance', 'strength', 'flexibility', 'general-fitness']
  }],
  
  // Preferences
  units: {
    type: String,
    enum: ['metric', 'imperial'],
    default: 'metric'
  },
  timezone: {
    type: String,
    default: 'UTC'
  },
  notifications: {
    email: {
      type: Boolean,
      default: true
    },
    push: {
      type: Boolean,
      default: true
    },
    workoutReminders: {
      type: Boolean,
      default: true
    },
    teamUpdates: {
      type: Boolean,
      default: true
    }
  },
  
  // Social Features
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  socialLinks: {
    instagram: String,
    twitter: String,
    linkedin: String,
    youtube: String
  },
  
  // Account Status
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: null
  },
  
  // Statistics
  stats: {
    totalWorkouts: {
      type: Number,
      default: 0
    },
    totalDuration: {
      type: Number, // in minutes
      default: 0
    },
    totalCaloriesBurned: {
      type: Number,
      default: 0
    },
    currentStreak: {
      type: Number,
      default: 0
    },
    longestStreak: {
      type: Number,
      default: 0
    },
    achievements: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Achievement'
    }]
  },
  
  // Team Information
  teams: [{
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    },
    role: {
      type: String,
      enum: ['member', 'coach', 'admin', 'owner'],
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Privacy Settings
  privacy: {
    profileVisibility: {
      type: String,
      enum: ['public', 'friends', 'private'],
      default: 'public'
    },
    showStats: {
      type: Boolean,
      default: true
    },
    showWorkouts: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for age
userSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
});

// Virtual for BMI
userSchema.virtual('bmi').get(function() {
  if (!this.height || !this.weight) return null;
  const heightInMeters = this.height / 100;
  return (this.weight / (heightInMeters * heightInMeters)).toFixed(1);
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ 'teams.team': 1 });
userSchema.index({ createdAt: -1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to update last login
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save();
};

// Instance method to increment workout stats
userSchema.methods.incrementWorkoutStats = function(duration, calories) {
  this.stats.totalWorkouts += 1;
  this.stats.totalDuration += duration || 0;
  this.stats.totalCaloriesBurned += calories || 0;
  return this.save();
};

// Instance method to update streak
userSchema.methods.updateStreak = function() {
  const today = new Date();
  const lastWorkout = this.lastLogin || this.createdAt;
  const daysDiff = Math.floor((today - lastWorkout) / (1000 * 60 * 60 * 24));
  
  if (daysDiff === 1) {
    this.stats.currentStreak += 1;
  } else if (daysDiff > 1) {
    this.stats.currentStreak = 1;
  }
  
  if (this.stats.currentStreak > this.stats.longestStreak) {
    this.stats.longestStreak = this.stats.currentStreak;
  }
  
  return this.save();
};

// Static method to find users by team
userSchema.statics.findByTeam = function(teamId) {
  return this.find({ 'teams.team': teamId });
};

// Static method to find users by fitness level
userSchema.statics.findByFitnessLevel = function(level) {
  return this.find({ fitnessLevel: level });
};

// Static method to get top performers
userSchema.statics.getTopPerformers = function(limit = 10) {
  return this.find({ isActive: true })
    .sort({ 'stats.totalWorkouts': -1 })
    .limit(limit)
    .select('firstName lastName avatar stats');
};

module.exports = mongoose.model('User', userSchema);
