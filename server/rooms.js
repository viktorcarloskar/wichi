
Rooms = new Mongo.Collection("rooms", {
  // For future use, for example if we want to create hard relations
})
Positions = new Mongo.Collection("positions", {

})
Users = new Mongo.Collection("users", {

})

Userslist = new Mongo.Collection("userslist", {

})

Chosen = new Mongo.Collection("chosen", {

})

NewRooms = new Mongo.Collection("newrooms");

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
