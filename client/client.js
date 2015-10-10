Rooms = new mongo.collection("rooms")
Positions = new mongo.collection("positions")

if (meteor.isClient) {

  Template.main.helpers({
    rooms: function() {
      return Rooms.find();
    }
  })

  Template.room.helpers({
    locations: function() {
      return Positions.find();
    }
  })
}
