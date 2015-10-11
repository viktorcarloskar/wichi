Router.configure({
    layoutTemplate: 'layout'
});
Router.route('/', function () {
  this.render('home');
});
Router.route('/createroom', function () {
  this.render('createRoom');
});
Router.route('/room/:name', {
  name: "room",
  template: "room",
  roomUrlName: function() {
    var currentRoom = this.params.name;
    return currentRoom//Rooms.findOne({urlName: currentRoom})
  }
});
