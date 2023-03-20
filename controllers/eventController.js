const Event = require('../models/EventModel');
const mongoose = require('mongoose');
const Customer = require('../models/CustomerModel');
const moment = require('moment');
const EventTypeMapper = require('../mapper/eventTypeMapper');

module.exports = {

    create: (req, res) => {
        let newEvent = new Event(req.body);
        newEvent.customer = mongoose.Types.ObjectId(req.params.customerId);
        newEvent.user = res.locals.userId;
        newEvent.save();

        Customer.findById(req.params.customerId).exec((err, customer) => {
            if (err) {
                res.send('Get customer error');
            }
            customer.events.push(newEvent._id);
            customer.save();

            const user = res.locals.currentUser;

            user.events.push(newEvent._id);
            user.save();

            res.redirect('/customer/' + req.params.customerId);
        });
    },

    update: (req, res) => {
        Event.findByIdAndUpdate(req.params.eventId, (req.body)).exec((err, event) => {
            if (err) {
                res.send('Update event error');
            }
            res.redirect('/customer/' + req.params.customerId);
        })
    },

    editForm: (req, res) => {
        console.log(req.params.eventId);
        Event.findById(req.params.eventId).lean().exec((err, event) => {
            if (err) {
                res.send('Get event error');
            }
            event = {...event};

            event.contactDate = moment(event.contactDate).format('YYYY-MM-DD');

            res.render('eventViews/editEvent', event);
        })
    },

    delete: (req, res) => {
        Event.findOneAndDelete(req.params.eventId).exec((err) => {
            if (err) {
                res.send('Delete event eror');
            }

            const user = res.locals.currentUser;

            const eventIndex = user.events.findIndex((eventId) => {
                if (eventId.toString() === req.params.eventId) {
                    return true;
                }

                return false;
            });

            if (eventIndex !== -1) {
                user.events.splice(eventIndex, 1);
                user.save();
            }

            res.redirect('/customer/' + req.params.customerId);
        })
    },
}