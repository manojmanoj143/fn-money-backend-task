const Assessment = require('../models/Assessment');
const multer = require('multer');

// Middleware for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files in the uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Append timestamp to filename
    }
});
const upload = multer({ storage });

exports.submitAssessment = async (req, res) => {
    const { task, details, userId } = req.body;

    // Ensure that the file is present
    if (!req.file) {
        return res.status(400).json({ error: 'File is required' });
    }

    const newAssessment = new Assessment({
        task,
        details,
        file: req.file.path, // Store the file path
        userId,
    });

    try {
        await newAssessment.save();
        res.status(201).json({ message: 'Assessment submitted successfully', assessment: newAssessment });
    } catch (error) {
        res.status(500).json({ error: 'Error saving assessment: ' + error.message });
    }
};
