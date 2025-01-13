const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../db/viewData.json');

exports.getAllTransactions = async (req, res) => {
    try {
        const rawData = await fs.readFile(dataPath, 'utf8');
        const data = JSON.parse(rawData);
        res.json(data.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};

exports.getTransactionById = async (req, res) => {
    try {
        const rawData = await fs.readFile(dataPath, 'utf8');
        const data = JSON.parse(rawData);
        const transaction = data.data.find(t => t.id === parseInt(req.params.id));
        
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transaction' });
    }
};

exports.createTransaction = async (req, res) => {
    try {
        const rawData = await fs.readFile(dataPath, 'utf8');
        const data = JSON.parse(rawData);
        
        const newTransaction = {
            id: Math.max(...data.data.map(t => t.id)) + 1,
            ...req.body,
            createBy: 'system',
            createOn: new Date().toISOString(),
            transactionDate: new Date().toISOString()
        };
        
        data.data.push(newTransaction);
        await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
        
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create transaction' });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const rawData = await fs.readFile(dataPath, 'utf8');
        const data = JSON.parse(rawData);
        
        const index = data.data.findIndex(t => t.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        
        data.data[index] = {
            ...data.data[index],
            ...req.body,
            id: parseInt(req.params.id)
        };
        
        await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
        res.json(data.data[index]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update transaction' });
    }
};