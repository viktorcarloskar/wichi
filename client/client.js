if (Meteor.isClient) {
  var guid;

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
    // Check if needed
    users: function() {
      // Should return a list of users with their latest location
      return Users.find({roomId: this.room._id})
    },
    positions: function() {
      return Positions.find();
    }
  })
  Template.room.created = function() {
    guid = guid();
    Tracker.autorun(function(){
      var latLng = Geolocation.latLng();
      if (latLng && guid) {
        Positions.insert({
          latLng: latLng,
          userId: guid,
          timestamp: Date()
        });
      }
    });
  }
  Template.room.rendered = function(){

  }

  Meteor.startup(function() {
    GoogleMaps.load();
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
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
