const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
    task: { type: String, required: true },
    details: { type: String, required: true },
    file: { type: String }, // Path to the uploaded file
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Assessment', AssessmentSchema);
