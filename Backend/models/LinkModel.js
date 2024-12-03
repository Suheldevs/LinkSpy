const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
  },
  originalUrl: {
    type: String,
    required: true,
    unique: true, 
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  clickCount: {
    type: Number,
    default: 0, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  clicks: [
    {
      ipAddress: {
        type: String, 
      },
      timestamp: {
        type: Date,
        default: Date.now, 
      },
    },
  ],
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;
