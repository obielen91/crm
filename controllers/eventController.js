const Event = require('../models/EventModel');

module.exports = {
    index: (req,res) => {
        Event.find({}).lean().exec((err, events) => {
            if(err) {
                res.send('Get events error');
            }
            res.render('eventViews/addEvent', {events: events});
        });
    },

    create: (req,res) => {
        let newEvent = new Event(req.body);
        newEvent.save();
        res.redirect('/event');
    },

    update: (req,res) => {
        Event.findByIdAndUpdate(req.param.id, (req.body)).exec((err, event) => {
            if(err) {
                res.send('Update event error');
            }
            res.redirect('/event');
        })
    },

    editForm: (req,res) => {
        Event.findById(req.params.id).exec((err, event) => {
            if(err) {
                res.send('Get event error');
            }
            res.render('eventViews/editEvent', event);
        })
    },

    delete: (req,res) => {
        Event.findOneAndDelete.exec((err) => {
            if(err) {
                res.send('Delete event eror');
            }
            res.redirect('/event');
        })
    },
}