// purchaseOrderRoutes.js

const express = require('express');
const router = express.Router();
const PurchaseOrder = require('../modals/purchase');

// Create a new purchase order
router.post('/purchase-orders', async (req, res) => {
  try {
    const { productName, quantity, pricing, mrp, customerId } = req.body;
    const purchaseOrder = new PurchaseOrder({ productName, quantity, pricing, mrp, customerId });
    await purchaseOrder.save();
    res.status(201).json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all purchase orders
router.get('/purchase-orders', async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.find();
    res.json(purchaseOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get purchase order by ID
router.get('/purchase-orders/:id', async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id);
    if (!purchaseOrder) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }
    res.json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update purchase order by ID
router.put('/purchase-orders/:id', async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body });
    if (!purchaseOrder) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }
    res.json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete purchase order by ID
router.delete('/purchase-orders/:id', async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndDelete(req.params.id);
    if (!purchaseOrder) {
      return res.status(404).json({ message: 'Purchase order not found' });
    }
    res.json({ message: 'Purchase order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
