const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    about: { type: String, required: true },
    location: {type:String, required:true}
   // productImage: { type: String, required: true }
});

module.exports = mongoose.model('Company', companySchema);