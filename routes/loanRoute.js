const express = require('express');
const loanController = require('../controllers/loanController');

function routes(Loan){
    const loanRouter = express.Router();
    const controller = loanController(Loan);
    loanRouter.route('/loans')
    .get(controller.index);

    loanRouter.use('/loans/:loanId', (req, res, next) => {
        Loan.findById(req.params.loanId, (err, loan) => {
            if(err){
                console.log(`There was an error ${err}`);
                res.send(err);
            }
            if(loan){
                req.loan = loan;
                return next();
            }
            return res.sendStatus(404);
        });
    });
    loanRouter.route('/loans/:loanId')
    .get(controller.show);

 return loanRouter;   
}
module.exports = routes;