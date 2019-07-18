function loanController(Loan){
    function index(req, res){
        const { query } = req;
        console.log(query);
        // const query = {};
        // We will check if there are any query strings being passed
        if(req.query.rate) {
            query.rate = req.query.rate;
        }
        if(req.query.status){
            query.status = req.query.status;
        }
        if(req.query.duration){
            query.duration = req.query.duration;
        }
        if(req.query.user_id){
            query.user_id = req.query.user_id;
        }

        // Using the model to find the loan, 
        // If no query string is passed then it returns the whole collections in the database
        Loan.find(query, (err, loans) => {
            console.log(`this is the query ${query}`);
            if(err){
                res.send(err);
            }
            const returnLoans = loans.map((loan) => {
                let newLoan = loan.toJSON();
                return newLoan;
            });
            return res.json(returnLoans);
        });
    }

    function store(req, res){
        const loan = new Loan(req.body);
    }

    function show(req, res){
        const returnLoan = req.loan.toJSON();
        res.json(returnLoan);
    }
   
    return {store, index, show};
}

module.exports = loanController;