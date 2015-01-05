Template.flashTelegrams.helpers({
  messages: function () {
    var messages = flashTelegrams.find({
      'recepient': Meteor.userId()
    }).fetch();
    
    var allow_notify = false;
    _.each(messages, function(value) {
      value.group = _.isArray(value.message);
      allow_notify |= !value.seen;
    });

    if (allow_notify) {
      $(document).triggerHandler('flash_telegrams:new');
    }

    if (messages.length && FlashTelegrams.options.autoScroll) {
      $('html, body').animate({
        scrollTop: 0
      }, 200);
    }        
      
    return messages;
  }
});

Template.flashTelegramItem.rendered = function () {
  var message = this.data;
  
  Meteor.defer(function() {
    flashTelegrams.update(message._id, {$set: {seen: true}});
  });
  
  if (message.options && message.options.autoHide) {
    $alert = $(this.find('.alert'));
    Meteor.setTimeout(function() {
        $alert.fadeOut(400, function() {
          flashTelegrams.remove({_id: message._id});
        });    
      }, 
      message.options.hideDelay);
  }
};

Template.flashTelegramItem.events({
  "click .close": function (e, tmpl) {
    e.preventDefault();
    flashTelegrams.remove(tmpl.data._id);
  }
});