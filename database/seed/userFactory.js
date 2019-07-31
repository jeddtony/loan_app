const faker = require('faker');

function userFactory(User){
  function seed(req, res){
    const counter = req.params.counter;

    Array.prototype.random = function(){
      return this[Math.floor((Math.random()* this.length))];
    }
    let allUsers = [];
    for (let i = 0; i < counter; i++){
      let newUser = new User;
      newUser.name = faker.name.findName();
      newUser.email = faker.internet.email();
      newUser.password = faker.random.word();
      newUser.address = faker.address.streetAddress();
      newUser.status = ['verified', 'unverified'].random();
      newUser.isAdmin = [true, false].random();
      allUsers.push(newUser);
    }
    User.collection.insert(allUsers, function(err, docs){
      if(err){
        return console.log(err);
      } else{
        res.send('database populated');
      }
    });

  }

  return {seed};
}

module.exports = userFactory