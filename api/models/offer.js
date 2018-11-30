const mongoose = require('mongoose');

const offerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: {type:String, required:true},
    requirements: { type: String, required: true },
    salaire_interval: { type: Number, required: true },
    location: { type: String, required: true }
});

module.exports = mongoose.model('Offer', offerSchema);