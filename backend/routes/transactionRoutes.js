const express = require('express');
const router = express.Router();

// Dummy data or function to handle requests
const data = require('/project/workspace/backend/db/viewData.json');

// Get all transactions
router.get('/', (req, res) => {
    res.json(data);
});

// Get specific transaction by ID
router.get('/:id', (req, res) => {
    const transaction = data.find(t => t.id === parseInt(req.params.id));
    if (transaction) {
        res.json(transaction);
    } else {
        res.status(404).send('Transaction not found');
    }
});

// Create a new transaction
router.post('/', (req, res) => {
    const newTransaction = req.body;
    data.push(newTransaction); // Add transaction logic
    res.status(201).json(newTransaction);
});

// Update a transaction
router.put('/:id', (req, res) => {
    const transaction = data.find(t => t.id === parseInt(req.params.id));
    if (transaction) {
        Object.assign(transaction, req.body);
        res.json(transaction);
    } else {
        res.status(404).send('Transaction not found');
    }
});

// Delete a transaction
router.delete('/:id', (req, res) => {
    const index = data.findIndex(t => t.id === parseInt(req.params.id));
    if (index !== -1) {
        data.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Transaction not found');
    }
});

module.exports = router;
