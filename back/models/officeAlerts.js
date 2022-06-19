const Joi = require('joi');
const mongoose = require('mongoose');


const OfficeAlerts_Schema = new mongoose.Schema({

    office_id: {type: mongoose.Schema.Types.ObjectId , required: true, ref: 'Office'},
    alertsList: [],
    alertsIdCounter: {type: Number, default: 0}
});

const OfficeAlertsModel = mongoose.model('officeAlerts', OfficeAlerts_Schema);

function validateAlert(alert)
{
    const schema = Joi.object({
        content: Joi.string().min(3).required(),
        tag: Joi.any().valid('Beaware', 'Problem', 'Idea').required()
    });

    return schema.validate(alert);
}

module.exports.OfficeAlertsModel = OfficeAlertsModel;
module.exports.validate = validateAlert;