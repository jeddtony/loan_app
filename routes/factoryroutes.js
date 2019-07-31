const express = require('express');
const loanFactoryController = require('../database/seed/loanFactory');
const userFactoryController = require('../database/seed/userFactory');
// let Loans = require('../models/Loan');

function routes(Loan, User){
    const seedRouter = express.Router();
    const loanFactory = loanFactoryController(Loan);
    const userFactory = userFactoryController(User)

    seedRouter.route('/users/:counter').get(userFactory.seed);

    seedRouter.route('/loans').get((req, res) => {
        console.log('In the get metod');
        res.send('you can see the method without id');
    });

    seedRouter.route('/loans/:counter')
    .get(loanFactory.seed);

    return seedRouter;
}

module.exports = routes;