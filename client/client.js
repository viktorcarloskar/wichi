Rooms = new Mongo.Collection("rooms", {
  // For future use, for example if we want to create hard relations
})
Positions = new Mongo.Collection("positions", {

})
Users = new Mongo.Collection("users", {

})

if (Meteor.isClient) {

  Template.home.helpers({
    rooms: function() {
      return Rooms.find();
    }
  }),

  Template.room.helpers({
    room: function() {
      var routeData = this.data;
      return Rooms.findOne({urlName: routeData});
    },
    goal: function() {
      // The goal of the room

    },
    positions: function() {
      return Positions.find();
    },
    users: function() {
      // Should return a list of users with their latest location
    }
  }),

  Template.room.created = function(){
    
  }
}
