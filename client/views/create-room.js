Template.createRoom.helpers({
    users: function () {
      // Show newest tasks at the top
      return Users.find({});
    }
  });

  Template.createRoom.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Users.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Users.remove(this._id);
    }
  });

  Template.createRoom.helpers({
    newrooms: function () {
      return Rooms.find({});
    }
  });

  Template.createRoom.events({

    "submit .new-room": function (event) {
      //Prevent default browser form submit
      event.preventDefault();

      //Get new event room name
      var text = event.target.text.value;

      roomUsers = new Array();

      Users.find({checked: {$not: {$ne: true}}}).forEach(function(user){
        roomUsers.push(user.userId);
      });

      console.log(roomUsers);

      //Insert new room in mongo
      Rooms.insert({
        name: text,
        userIds: roomUsers,
        createdAt: new Date() // current time
      });

      Router.go('room', { name: text });

      console.log(Rooms.find().fetch());
      // Clear form
      event.target.text.value = "";
  }
  });
