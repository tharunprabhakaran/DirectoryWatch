/* Imports */
var Joi = require('@hapi/joi')
var Canister =  require('../../../../utils/canister/canister')

const createStudentSchema = Joi.object({
    metadata: Joi.object().keys({
        timeStamp: Joi.date().iso().required(),
        service: Joi.string().required(),
        subService: Joi.string().required()
    }).required(),
    payLoad: Joi.object().keys({
        
        name: Joi.string().required(),
        dob: Joi.date().iso().required(),
        gender: Joi.string().required(),
        schoolID: Joi.string().required(),
        classID: Joi.string().required(),
        country: Joi.string().required(),
        city: Joi.string().required(),
        address: Joi.string().required(),
        bloodGroup: Joi.string().required(),
        allergies: Joi.string().required(),
        medicalCondition: Joi.string().required(),
        joinedDate: Joi.date().iso().required()

        }).required(),
    payLoadType: Joi
        .when(
            Joi.ref('payLoad'),
                {is: Joi.array(), then: Joi.string().valid('array')}
        )
        .when(
            Joi.ref('payLoad'),
                {not: Joi.array(), then: Joi.string().valid('object')}
        ).required(),
    status: Joi.string(),
    statusCode: Joi.string(),
    error: Joi.string(),
    errorDetail: Joi.object().keys({
        code: Joi.string(),
        description: Joi.string()
    })
})


const createStudent = async function(Request, Response, next){
    try {
        const {error} = await createStudentSchema.validateAsync(Request.body);
        next()
    } catch (error) {
        Response.statusCode=500
        var responseCanister = new Canister()
        responseCanister.addStatus("failure",null)
        responseCanister.addError("CS000F","Generic Validation Error :"+error)
        return Response.json(responseCanister)
    }
}

module.exports = createStudent