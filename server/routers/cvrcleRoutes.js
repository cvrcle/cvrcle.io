var cvrcleRouter = require('express').Router();
var cvrcleController = require('../controllers/cvrcleControllers');

cvrcleRouter.route('/test')
  .get(cvrcleController.test)

cvrcleRouter.route('/:user')
  .get(cvrcleController.retrieveAll)
  .post(cvrcleController.createOne)

cvrcleRouter.route('/:user/:itinerary')
  .get(cvrcleController.retrieveOne)
  .post(cvrcleController.createOne)
  .put(cvrcleController.updateOne)
  .delete(cvrcleController.deleteOne);


module.exports = cvrcleRouter;
