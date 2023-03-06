const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController');

// router.get('/', (req, res) => res.render('eventViews/addEvent'));

router.post('/', eventController.create);
router.get('/', eventController.index);
router.get('//delete/:id', eventController.delete);
router.get('//edit/:id', eventController.editForm);
router.post('/edit/:id', eventController.update);

module.exports = router;

