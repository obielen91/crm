const Customer = require('../models/CustomerModel');

module.exports = {
    index: (req, res) => {
        Customer.find({}).lean().exec((err, customers) => {
            if(err) {
                res.send('Get customers error');
            }
            res.render('customerViews/customerList', {customers: customers});
        });
    },

    customer: (req, res) => {
        Customer.findById(req.params.id).exec((err, customer) => {
            if(err) {
                res.send('Get customer error');
            }
            res.render('customersViews/singleCustomer', customer);
        });
    },

    create: (req,res) => {
        let newCustomer = new Customer(req.body);
        newCustomer.save();

        res.redirect('/customer');
    },

    update: (req,res) => {
        Customer.findByIdAndUpdate(req.params.id, req.body).exec((err, customer) => {
            if(err) {
                res.send('Update customer error');
            }
            res.redirect('/customer');
        }) 
    },

    delete: (req,res) => {
        Customer.findByIdAndDelete(req.params.id).exec((err) => {
            if(err) {
                res.send('Delete customer error');
            }
            res.redirect('/customer');
        })
    },

    editCustomer: (req,res) => {
        Customer.findById(req.params.id).exec((err, customer) => {
            if(err) {
                res.send('Get customer error');
            }
            res.render('customerViews/editCustomerForm', customer);
        })
    },

};