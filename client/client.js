
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

  Template.body.helpers({
    userslist: function() {
      return Userslist.find().fetch().map(function(it){ return it.name; });
    }
  });

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

  Template.body.events({
  "submit .new": function (event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var text = event.target.text.value;

    // Insert a task into the collection
    Chosen.insert({
      text: text,
      createdAt: new Date() // current time
    });

    // Clear form
    event.target.text.value = "";
  }
});

Template.body.helpers({
    chosen: function () {
      // Show newest tasks at the top
      return Chosen.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.onCreated(function() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('exampleMap', function(map) {
      // Add a marker to the map once it's ready
      var marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance
      });
    });
  });
}
