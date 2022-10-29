const twilio = require('twilio');
const Router = require('express').Router;
const ivrRouter = require('./ivr/router');

const router = new Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./../swagger_output.json');



router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


// GET: / - home page
router.get('/', (req, res) => {

  res.redirect('/api-docs')
});

router.use('/ivr', twilio.webhook({validate: false}), ivrRouter);

module.exports = router;
