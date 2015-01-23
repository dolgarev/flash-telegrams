Package.describe({
  name: 'liberation:flash-telegrams',
  summary: 'Package for instant messaging between registered users.',
  version: '1.1.0',
  git: 'https://github.com/dolgarev/flash-telegrams.git'
});

Package.onUse(function(api) {
  api.versionsFrom('0.9.0');
  api.use(['minimongo', 'mongo-livedata', 'templating', 'underscore'], 'client');
  api.addFiles(['messages.js', 'messages_list.html', 'messages_list.js', 'collection.js'], 'client');
  api.add_files(['collection.js'], 'server');

  if (api.export) {
    api.export(['FlashTelegrams', 'flashTelegrams'], 'client');
    api.export(['flashTelegrams'], 'server');
  }
});

Package.on_test(function(api) {
});
