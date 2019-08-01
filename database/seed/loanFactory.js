const faker = require('faker');
const Users = require('../../models/user');
const util = require('util');
function loanFactory(Loan){
  
  function seed(req, res){
    const counter = req.params.counter;
    // Array.prototype.random = function(){
    //   return this[Math.floor((Math.random()* this.length))];
    // }
    // USE THIS METHOD FOR PROMISES
    // let allUsers = Users.find({}, 'name email', (err, users) => users);
    //  Users.find({})
    // .then(doc=>{
    //   console.log(doc);
    //   res.json(doc);
    // }).catch(err=>{
    //   console.error(err);
    // });

    // USE THIS METHOD FOR ASYNC AWAIT
    (async function getUsers(){
      let usersGotten;
      let usersArray = [];
      Array.prototype.random = function(){
        return this[Math.floor((Math.random()* this.length))];
      }
      try{
          usersGotten = await Users.find({});
          // console.log(usersGotten);
        for(user of usersGotten){
          console.log(user._id);
          usersArray.push(user._id);
          console.log(usersArray instanceof Array);
        }
        let allLoans = [];
        for(let i = 0; i < counter; i++){
          let newLoan = new Loan;
          newLoan.userId = usersArray[Math.floor((Math.random()* usersArray.length))];
          newLoan.tenor = Math.floor((Math.random() * 11)+1);
          newLoan.status = ['approved', 'pending', 'rejected'].random();
          newLoan.repaid = ['true', 'false'].random();
          newLoan.amount = Math.floor((Math.random() * 1000000));
          newLoan.balance = Math.floor((Math.random() * 10000));
          newLoan.interest = newLoan.amount * 0.05;
          newLoan.paymentInstallment = ((newLoan.amount + newLoan.interest) / newLoan.tenor);

          allLoans.push(newLoan);
        }
        await Loan.collection.insert(allLoans);
        console.log('All loans have been inserted');

      } catch(err){
        console.error(err);
      }

    }());

   
  }
  return { seed };
}

module.exports = loanFactory;