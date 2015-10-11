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
    },
  })



  Meteor.startup(function() {
    GoogleMaps.load();
    Meteor.typeahead.inject();
  });

  Template.body.helpers({
    exampleMapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        return {
          center: new google.maps.LatLng(37.536709, 126.987481),
          zoom: 13
        };
      }
    }
  });

    Template.body.helpers({
      newrooms: function () {
        return NewRooms.find({});
      }
    });

    Template.body.events({

      "submit .new-room": function (event) {
        //Prevent default browser form submit
        event.preventDefault();

        //Get new event room name
        var text = event.target.text.value;

        //Insert new room in mongo
        NewRooms.insert({
          text: text,
          createdAt: new Date() // current time
        });
        // Clear form
        event.target.text.value = "";
    }
  });
}
