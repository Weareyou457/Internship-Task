// customerRoutes.js

const express = require('express');
const router = express.Router();
const Customer = require('../modals/customer');

// Create a new customer
router.post('/post', async (req, res) => {
  try {
    const { name, email, mobileNumber, city } = req.body;
    const customer = new Customer({ name, email, mobileNumber, city });
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all customers
router.get('/get', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get customer by ID
router.get('/get/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update customer by ID
router.put('/put/:id', async (req, res) => {
  try {
    
    const customer = await Customer.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete customer by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
