const Customer = require('../models/CustomerModel');

module.exports = {
    index: (req, res) => {
        Customer.find({}).lean().exec((err, customers) => {
            if (err) {
                res.send('Get customers error');
            }
            res.render('customerViews/customerList', { customers: customers });
        });
    },

    customer: (req, res) => {
        Customer.findById(req.params.id).exec((err, customer) => {
            if (err) {
                res.send('Get customer error');
            }
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
        }
        let newCustomer = new Customer(customer);
        newCustomer.save();
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