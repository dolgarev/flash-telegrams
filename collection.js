flashTelegrams = new Meteor.Collection('flash_telegrams');

if (Meteor.isServer) {
  flashTelegrams.allow({
    insert: function(userId) {
      return userId === Meteor.userId();
    },
    update: function(userId) {      
      return userId === Meteor.userId();
    },
    remove: function(userId) {
      return userId === Meteor.userId();
    }
  });

  Meteor.publish("flash_telegrams", function() {
    return flashTelegrams.find({
      'recepient': this.userId
    });
  });  
}
else {
  Meteor.subscribe('flash_telegrams'); 
}
