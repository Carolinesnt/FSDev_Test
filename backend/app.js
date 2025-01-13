const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactionRoutes.js');


const PORT = 5000;
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/transactionDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/transactions', transactionRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
