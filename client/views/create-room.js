Template.createRoom.helpers({
    tasks: function () {
      // Show newest tasks at the top
      return Userslist.find({});
    }
  });

  Template.createRoom.events({
    "submit .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.text.value;

      // Insert a task into the collection
      Userslist.insert({
        text: text,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.text.value = "";
    }
  });

  Template.createRoom.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Userslist.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Userslist.remove(this._id);
    }
  });
