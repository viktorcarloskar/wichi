Rooms = new mongo.collection("rooms", {
  // For future use, for example if we want to create hard relations
})
Positions = new mongo.collection("positions", {

})
Users = new mongo.collection("users", {

})

if (meteor.isClient) {

  Template.main.helpers({
    rooms: function() {
      return Rooms.find();
    }
  })

  Template.room.helpers({
    positions: function() {
      return Positions.find();
    }
  })
}
