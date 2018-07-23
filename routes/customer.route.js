
const express = require('express');
const customerRoutes = express.Router();

// Importing customer model
let Customer = require('../models/customer');

// Get all customers
customerRoutes.route('/').get(function(req, res){
    Customer.find(function(err, cus){
        if(err){
            console.log(err);
        } else {
            res.json(cus);
        }
    });
});

// Get customer by its id
customerRoutes.route('/:id').get(function(req, res){
    let id = req.params.id;
    Customer.findById(id, function(err, cus){
        res.json(cus);
    });
});

// Insert new customer data
customerRoutes.route('/').post(function(req, res){
    var cus = new Customer(req.body);
    cus.save()
        .then(data => {
            res.status(200).json({'responseDesc': 'Customer Inserted Successfully'});
        })
        .catch(err => {
            res.status(400).send('Unable to save to database');
        });
});

module.exports = customerRoutes;