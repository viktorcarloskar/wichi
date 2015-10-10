Template.createroom.helpers({
  userslist: function() {
    return Userslist.find().fetch().map(function(it){
      return it.name;
    });
  }
});

Template.createroom.events({
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

Template.createroom.helpers({
  chosen: function () {
    // Show newest tasks at the top
    return Chosen.find({}, {sort: {createdAt: -1}});
  }
});
