const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  productID: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    enum: [0, 1], // 0: SUCCESS, 1: FAILED
    default: 0,
    required: true,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  createBy: {
    type: String,
    required: true,
  },
  createOn: {
    type: Date,
    default: Date.now,
    required: true,
  }
});

// Create a compound index on id field
transactionSchema.index({ id: 1 });

// Add some helper methods if needed
transactionSchema.methods.getStatusName = function() {
  return this.status === 0 ? 'SUCCESS' : 'FAILED';
};

// Add static method to find next available ID
transactionSchema.statics.findNextId = async function() {
  const lastTransaction = await this.findOne({}, {}, { sort: { id: -1 } });
  return lastTransaction ? lastTransaction.id + 1 : 1;
};

// Add middleware to format dates before saving
transactionSchema.pre('save', function(next) {
  if (this.isModified('transactionDate')) {
    this.transactionDate = new Date(this.transactionDate);
  }
  if (this.isModified('createOn')) {
    this.createOn = new Date(this.createOn);
  }
  next();
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;