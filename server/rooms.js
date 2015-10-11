if (Meteor.isServer) {
  Meteor.startup(function() {
    Users.remove({})
  })
  Meteor.setInterval(function() {
    var inactiveDate = new Date();
    inactiveDate.setMinutes(inactiveDate.getMinutes() - 1)
    var users = Users.find({lastActive: {$lt: inactiveDate}}).forEach(function(user) {
      Users.update(user._id, {active: false})
      console.log("Made the user: " + user.userId + " inactive");
    })
  }, 5000)
}
