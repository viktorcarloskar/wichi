Userslist = new Meteor.Collection("userslist");

if (Meteor.isServer) {

	Meteor.startup(function() {

    Userslist.insert({
      name:'John Doe',
      id: 1
    });
    Userslist.insert({
      name:'Jane Doe',
      id: 2
    });

  });
}
