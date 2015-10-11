if (Meteor.isClient) {
  var guid;
  var MAP_ZOOM = 15;

  Template.home.helpers({
    //Test
    // newrooms: [
    //   { text: "This is task 1" },
    //   { text: "This is task 2" },
    //   { text: "This is task 3" }
    // ]
    rooms: function () {
      return Rooms.find({}, {sort: {createdAt: -1}});
    }
  });

  //Delete a room
  Template.home.events({
  "click .delete": function () {
    Rooms.remove(this._id);
  }
  });

  Template.home.helpers({
    rooms: function() {
      return Rooms.find();
    }
  }),

  Template.room.helpers({
    room: function() {
      var routeData = this.roomUrlName;
      return Rooms.findOne({urlName: routeData});
    },
    // Check if needed
    users: function() {
      // Should return a list of users with their latest location
      //var room = Rooms.findOne({urlName: this.roomUrlName});
      return Users.find({/*roomId: room._id, */active: {$ne: false}}, {transform: function(doc) {
        doc.latestPosition = Positions.findOne({userId: doc.userId}, {sort: {timestamp: -1}, limit: 1})
        return doc;
      }});
    },
    positions: function() {
      return Positions.find();
    }
  })

  Template.room.created = function() {
    guid = guid();

    // Add user to the room
    var roomName = this.roomUrlName;
    Users.insert({userId: guid, lastActive: new Date(), room: roomName});

    // set user heartbeat
    Meteor.setInterval(function() {
      Users.update(Users.findOne({userId: guid})._id, {
        userId: guid,
        lastActive: new Date()
      });
    }, 2000);

    // Tracks the location given from location api
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


  Template.map.onCreated(function() {
      // We can use the `ready` callback to interact with the map API once the map is ready.
      GoogleMaps.ready('map', function(map) {
        // Add a marker to the map once it's ready

        /*
        Tracker.autorun(function() {
          .forEach(function(user) {
            if (GoogleMaps.loaded()) {
              var marker = new google.maps.Marker({
                position: user.latestPosition.latLng,
                map: map.instance
              });
            }
          });
        })*/
        var markers = new Array();

        var users = Users.find({/*roomId: room._id, */active: {$ne: false}}, {transform: function(doc) {
          doc.latestPosition = Positions.findOne({userId: doc.userId}, {sort: {timestamp: -1}, limit: 1})
          return doc;
        }})
        users.observe({
          added: function(doc, beforeIndex) {
            console.log("User added");
            do {
              if (GoogleMaps.loaded()) {
                var marker = new google.maps.Marker({
                  position: doc.latestPosition ? doc.latestPosition.latLng: undefined,
                  map: map.instance
                });
                markers.push({marker: marker, userId: doc.userId})
                console.log("Marker added");
              }
            } while(!GoogleMaps.loaded())
          },
          changed: function(newDocument, oldDocument) {
            for (var i = 0; i < markers.length; i++) {
              if (markers[i].userId === newDocument.userId) {
                markers[i].marker.setPosition(newDocument.latestPosition.latLng);
                console.log(markers[i]);
              }
            }
          },
          removed: function(oldDocument) {
            for (var i = 0; i < markers.length; i++) {
              if (markers[i].userId === oldDocument.userId) {
                markers[i].marker.setMap(null);
                console.log("Marker deleted");
              }
            }
          }
        })
      });
    });
  }
  Template.map.helpers({
    geolocationError: function() {
      var error = Geolocation.error();
      return error && error.message;
    },
    mapOptions: function() {
      var latLng = Geolocation.latLng();
      // Initialize the map once we have the latLng.
      if (GoogleMaps.loaded() && latLng) {
        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: MAP_ZOOM
        };
      }
    }
  });
  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
