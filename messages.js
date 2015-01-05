FlashTelegrams = {
  sendMessage: function(recepient, message, style, options) {
    var sender = Meteor.userId();
    
    if (sender) {
      options = options || {};
      options.autoHide = options.autoHide === undefined ? this.options.autoHide : options.autoHide;
      options.hideDelay = options.hideDelay || this.options.hideDelay;

      if (_.isString(options.hideDelay) && options.hideDelay.substr(-1) === 's') {
          options.hideDelay = parseInt(options.hideDelay, 10) * 1000;
      }

      if (style === void 0) {
        style = this.cssClasses[this.options.defaultStyle] || '';
      }

      flashTelegrams.insert({
          message: message, 
          style: style, 
          seen: false, 
          options: options,
          recepient: recepient || sender,
          sender: sender,
          created_at: Date.now()
      });  
    }
  },
  sendLocalMessage: function(message, style, options) {
    this.sendMessage(Meteor.userId(), message, style, options);  
  },
  // Deprecated, use sendWarning instead. sendWarning is more consistent with Boostrap classes.
  sendAlert: function(message, options, recepient) {
    options = _.isString(options) ? (recepient = options, null) : options;
    this.sendMessage(recepient, message, this.cssClasses.alert, options);
    console.log('Deprecated, use sendWarning instead of sendAlert');
  },
  sendWarning: function(message, options, recepient) {
    options = _.isString(options) ? (recepient = options, null) : options;
    this.sendMessage(recepient, message, this.cssClasses.warning, options);
  },
  sendError: function(message, options, recepient) {
    options = _.isString(options) ? (recepient = options, null) : options;
    this.sendMessage(recepient, message, this.cssClasses.error, options);
  },
  sendSuccess: function(message, options, recepient) {
    options = _.isString(options) ? (recepient = options, null) : options;
    this.sendMessage(recepient, message, this.cssClasses.success, options);
  },
  sendInfo: function(message, options, recepient) {
    options = _.isString(options) ? (recepient = options, null) : options;
    this.sendMessage(recepient, message, this.cssClasses.info, options);
  },
  clear: function() {
    flashTelegrams.remove({
      'recepient': Meteor.userId(),
      'seen': true
    });
  },
  configure: function(options) {
    this.options = this.options || {};
    _.extend(this.options, options);
  },
  options: {
    autoHide: true,
    hideDelay: '10s',
    autoScroll: false,
    defaultStyle: 'warning'
  },
  cssClasses: {
    alert: '',
    warning: 'alert-warning',
    error: 'alert-error alert-danger',
    success: 'alert-success',
    info: 'alert-info'
  }
};

FlashTelegrams.send_local_message = FlashTelegrams.sendLocalMessage;
FlashTelegrams.send_private_message = FlashTelegrams.sendMessage;
