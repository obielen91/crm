const Customer = require('../models/CustomerModel');
const Event = require('../models/EventModel');
const User = require('../models/UserModel');
const EventTypeMapper = require('../mapper/eventTypeMapper');

module.exports = {
    index: (req, res) => {
        Customer.find({user: res.locals.userId}).lean().exec((err, customers) => {
            if (err) {
                res.send('Get customers error');
            }
            res.render('customerViews/customerList', { customers: customers });
        });
    },

    customer: (req, res) => {
        Customer.findById(req.params.id).populate('events').lean().exec((err, customer) => {
            if (err) {
                res.send('Get customer error');
            }

            customer.events = customer.events.map(event => ({...event, type: EventTypeMapper.toView(event.type)}))

            res.render('customerViews/singleCustomer', customer);   
        });
    },

    create: (req, res) => {
        const customer = {
            name: req.body.name,
            address: {
                street: req.body.street,
                zipCode: req.body.zipCode,
                city: req.body.city,
            },
            nip: req.body.nip,
            user: res.locals.userId,
        }
        let newCustomer = new Customer(customer);
        newCustomer.save();
       
        const user = res.locals.currentUser;

        user.customers.push(newCustomer._id);
        user.save();

        res.redirect('/customer');
    },
    
    update: (req, res) => {
        const customer = {
            name: req.body.name,
            address: {
                street: req.body.street,
                zipCode: req.body.zipCode,
                city: req.body.city,
            },
            nip: req.body.nip,
        }
        Customer.findByIdAndUpdate(req.params.id, customer).exec((err, customer) => {
            if (err) {
                res.send('Update customer error');
            }
            res.redirect('/customer');
        })
    },

    delete: (req, res) => {
        Customer.findByIdAndDelete(req.params.id).exec((err) => {
            if (err) {
                res.send('Delete customer error');
            }

            const user = res.locals.currentUser;

            const customerIndex = user.customers.findIndex((customerId) => {
                if (customerId.toString() === req.params.id) {
                    return true;
                }

                return false;
            });

            if (customerIndex !== -1) {
                user.customers.splice(customerIndex, 1);
                user.save();
            }

            res.redirect('/customer');
        })
    },

    editCustomer: (req, res) => {
        Customer.findById(req.params.id).exec((err, customer) => {
            if (err) {
                res.send('Get customer error');
            }
            res.render('customerViews/editCustomerForm', customer);
        })
    },

};