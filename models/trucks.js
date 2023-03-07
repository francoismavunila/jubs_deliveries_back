const mongoose = require('mongoose');

const TruckSchema = mongoose.Schema({
    plateNo:{type:String,required:true},
    make:{type: String, required: true},
    driver:{type:String}
});

module.exports = mongoose.model('Truck', TruckSchema);