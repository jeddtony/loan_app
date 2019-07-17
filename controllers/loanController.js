function loanController(Loan){
    function post(req, res){
        // const loan = new Loan(req.body);
    }

    function get(req, res){
        const {query} = req;
        // const query = {};
        if(req.query.rate){
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

        Loan.find((err, loans)=>{
            if(err){
                return res.send(err);
            } else{
                return res.json(loans);
            }
        });
        Loan.find(query, (err, loans) => {
            console.log(`this is the query ${query}`);
            if(err){
                res.send(err);
            }
            const returnLoans = loans.map((loan) => {
                console.log('In the return loan');
                let newLoan = loan.toJSON();
                return newLoan;
            });
            return res.json(returnLoans);
        });
    }
    return {post, get};
}

module.exports = loanController;