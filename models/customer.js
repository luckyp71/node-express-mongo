const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for customer
let CustomerSchema = new Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    phone_number: {
        type: String
 }
}, { collection: 'customer'
});

module.exports = mongoose.model('Customer', CustomerSchema)