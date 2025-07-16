const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cropName: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    trim: true,
  },
  region: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  isFlashDeal: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Active', 'Sold', 'Expired'],
    default: 'Active'
  }
}, {
  timestamps: true 
});

cropSchema.index({ farmer: 1, status: 1 });
cropSchema.index({ category: 1, region: 1 });
cropSchema.index({ isFlashDeal: 1 });

const Crop = mongoose.model('Crop', cropSchema);

module.exports = Crop;