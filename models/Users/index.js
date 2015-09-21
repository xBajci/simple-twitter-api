'use strict';
import mongoose from 'mongoose';

let userSchema = mongoose.Schema({
  id: {
    type: String,
    index: {
      unique: true
    }
  },
  follow: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ]
});

export default mongoose.model('user', userSchema);
