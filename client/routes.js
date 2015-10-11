Router.configure({
    layoutTemplate: 'layout'
});
Router.route('/', function () {
  this.render('home');
});
Router.route('/room/:name', {
  name: "room",
  template: "room",
  roomUrlName: function() {
    var currentRoom = this.params.name;
    return currentRoom//Rooms.findOne({urlName: currentRoom})
  }
});
