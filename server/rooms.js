
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

Meteor.startup(function() {
  Userslist.insert({
    text:'John Doe',
    id: 1
  });
  Userslist.insert({
    text:'Jane Doe',
    id: 2
  });

});
