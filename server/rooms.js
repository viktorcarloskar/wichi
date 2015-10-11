Meteor.startup(function() {
  Users.insert({
    name: 'John Doe',
    userId: 1
  });
  Users.insert({
    name: 'Jane Doe',
    userId: 2
  });

});
