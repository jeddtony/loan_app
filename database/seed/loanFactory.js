const faker = require('faker');
const Users = require('../../models/user');
const util = require('util');
function loanFactory(Loan){
  
  function seed(req, res){
    const counter = req.params.counter;
    Array.prototype.random = function(){
      return this[Math.floor((Math.random()* this.length))];
    }
    let allUsers = Users.find({}, 'name email', (err, users) => users);
    // res.json(allUsers);
    console.log(allUsers.obj);
    // let stringifiedUsers = (util.inspect(allUsers));
    // stringifiedUsers.reduce((userMap, item)=>{
    //   userMap[item.id] = item;
    //   return userMap
    // });

    // console.log(stringifiedUsers);

    // for(let i = 0; i < counter; i++){
    //   new Loan(

    //   )
    // }
  }
  return { seed };
}

module.exports = loanFactory;