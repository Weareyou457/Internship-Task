// shippingDetailsRoutes.js

const express = require('express');
const router = express.Router();
const ShippingDetails = require('../modals/shipping');

// Create a new shipping detail
router.post('/shipping-details', async (req, res) => {
  try {
    const { address, city, pincode, purchaseOrderId, customerId } = req.body;
    const shippingDetail = new ShippingDetails({ address, city, pincode, purchaseOrderId, customerId });
    await shippingDetail.save();
    res.status(201).json(shippingDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all shipping details
router.get('/shipping-details', async (req, res) => {
  try {
    const shippingDetails = await ShippingDetails.find();
    res.json(shippingDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get shipping detail by ID
router.get('/shipping-details/:id', async (req, res) => {
  try {
    const shippingDetail = await ShippingDetails.findById(req.params.id);
    if (!shippingDetail) {
      return res.status(404).json({ message: 'Shipping detail not found' });
    }
    res.json(shippingDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update shipping detail by ID
router.put('/shipping-details/:id', async (req, res) => {
  try {
    const shippingDetail = await ShippingDetails.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
    if (!shippingDetail) {
      return res.status(404).json({ message: 'Shipping detail not found' });
    }
    res.json(shippingDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete shipping detail by ID
router.delete('/shipping-details/:id', async (req, res) => {
    try {
      const shippingDetail = await ShippingDetails.findByIdAndDelete(req.params.id);
      if (!shippingDetail) {
        return res.status(404).json({ message: 'Shipping detail not found' });
      }
      res.json({ message: 'Shipping detail deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;