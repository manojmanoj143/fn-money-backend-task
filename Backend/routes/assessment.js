const express = require('express');
const { submitAssessment } = require('../controllers/assessmentController');
const router = express.Router();
const multer = require('multer');

// Set up file upload storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Append timestamp to avoid filename collisions
    }
});
const upload = multer({ storage });

// POST route for submitting assessments
router.post('/', upload.single('file'), submitAssessment);

module.exports = router;
