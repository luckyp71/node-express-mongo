//Importing libraries needed
const express = require('express');
const customerRoutes = express.Router();

// Importing customer model
let Customer = require('../models/customer');

// Get all customers
customerRoutes.route('/').get(function(req, res){
    Customer.find(function(err, cus){
        if(err){
          res.status(500).json({'responseDesc': err});
        } else if(!cus) {
            res.status(404).json({'responseDesc': 'Data Not Found'});
        } else {
            res.status(200).json(cus);
        }
    });
});

// Get customer by its id
customerRoutes.route('/:id').get(function(req, res){
    let id = req.params.id;
    Customer.findById(id, function(err, cus){
        if(err){
            res.status(500).json({'responseDesc':err});
        }
        else if(!cus){
            res.status(404).json({'responseDesc':'Data Not Found'});
        } else {
            res.json(cus);
        }
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

// Update customer data
customerRoutes.route('/:id').put(function(req, res){
    Customer.findById(req.params.id, function(err, cus){
        if(!cus){
            return next(new Error('Could not load document'));
        } else {
            cus.name = req.body.name;
            cus.address = req.body.address;
            cus.phone_number = req.body.phone_number;

            cus.save().then(data => {
                res.status(200).json({'responseDesc':'Update customer successfully'});
            })
            .catch(err => {
                res.status(404).send('Unable to udpate customer');
            });
        }
    });
});

// Delete customer data
customerRoutes.route('/:id').delete(function(req, res){
    Customer.findByIdAndRemove({_id: req.params.id}, function(err, cus){
        if(err){
            res.status(500).json({'responseDesc': err});
        } else {
            res.status(200).json({'responseDesc':'Customer Deleted Successfully'});
        }
    });
});

module.exports = customerRoutes;