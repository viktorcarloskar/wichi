Meteor.startup(function() {
  Users.remove({})
  Users.insert({
    name: 'John Doe',
    userId: 1
  });
  Users.insert({
    name: 'Jane Doe',
    userId: 2
  });
});

if (Meteor.isServer) {
  Meteor.setInterval(function() {
    var inactiveDate = new Date();
    inactiveDate.setMinutes(inactiveDate.getMinutes() - 1)
    // Handle inactive users
    Users.find({lastActive: {$lt: inactiveDate}}).forEach(function(user) {
      Users.update(user._id, {active: false})
      console.log("Made the user: " + user.userId + " inactive");
    })
    // Handle users that becomes active again
    var users = Users.find({lastActive: {$gte: inactiveDate}, active: false}).forEach(function(user) {
      Users.update(user._id, {active: true})
      console.log("Made the user: " + user.userId + " active again");
    })
  }, 5000)
}
