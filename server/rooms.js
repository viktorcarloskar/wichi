Meteor.startup(function() {
  Userslist.insert({
    text:'John Doe',
    userId: 1
  });
  Userslist.insert({
    text:'Jane Doe',
    id: 2
  });

});
