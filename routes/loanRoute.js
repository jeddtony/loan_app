const express = require('express');
const loanController = require('../controllers/loanController');

function routes(Loan){
    const loanRouter = express.Router();
    const controller = loanController(Loan);
    loanRouter.route('/loans')
    .get(controller.get);

 return loanRouter;   
}

module.exports = routes;