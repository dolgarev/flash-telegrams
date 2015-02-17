flashTelegrams = new Meteor.Collection('flash_telegrams');

if (Meteor.isServer) {
  flashTelegrams.allow({
    insert: function(userId, doc) {
      return userId === doc.sender;
    },
    update: function(userId, doc) {      
      return userId === doc.recepient || userId === doc.sender;
    },
    remove: function(userId, doc) {
      return userId === doc.recepient;
    },
    fetch: ['recepient', 'sender']
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
