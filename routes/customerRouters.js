const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
const eventController = require('../controllers/eventController');

router.get('/', customerController.index);
router.get('/add', (req, res) => res.render('customerViews/addCustomer'));
router.post('/add', customerController.create);
router.get('/:customerId/addEvent', (req,res) => res.render('eventViews/addEvent', {_customerId: req.params.customerId}));
router.post('/:customerId/addEvent', eventController.create);
router.get('/:customerId/editEvent/:eventId', eventController.editForm);
// router.post('/:customerId/addEvent', eventController.create);
router.get('/:id', customerController.customer);
router.get('/edit/:id', customerController.editCustomer);
router.post('/edit/:id', customerController.update);
router.get('/delete/:id', customerController.delete);
router.get('/:customerId/deleteEvent/:eventId', eventController.delete);

module.exports = router;



