flash-telegrams
===============


Package for instant messaging between registered users. This is based on the package [flash-messages](https://github.com/camilosw/flash-messages).

## Usage

Include the template somewhere in your index.html file:
```javascript
  {{> flashTelegrams}}
```
And then send messages:
```javascript
  FlashTelegrams.sendWarning("Message", <options>, <user_id|[user_id1, user_id2,...]|'*'>);
  FlashTelegrams.sendWarning("Message", <user_id|[user_id1, user_id2,...]|'*'>);
  FlashTelegrams.sendError("Message", <options>, <user_id|[user_id1, user_id2,...]|'*'>);
  FlashTelegrams.sendError("Message", <user_id|[user_id1, user_id2,...]|'*'>);
  FlashTelegrams.sendSuccess("Message", <options>, <user_id|[user_id1, user_id2,...]|'*'>);
  FlashTelegrams.sendSuccess("Message", <user_id|[user_id1, user_id2,...]|'*'>);
  FlashTelegrams.sendInfo("Message", <options>, <user_id|[user_id1, user_id2,...]|'*'>);
  FlashTelegrams.sendInfo("Message", <user_id|[user_id1, user_id2,...]|'*'>);
  FlashTelegrams.sendLocalMessage("Message", <style>, <options>);
```

**Note:** sendAlert was deprecated, use sendWarning instead.

You can also send a group of messages sending an array of strings. This will be rendered on a `ul` `li` list:
```javascript
  FlashTelegrams.sendInfo(["Message 1", "Message 2", "Message 3"]);
```

Messages can also contain html:
```javascript
  FlashTelegrams.sendInfo("You can found <strong>Meteor</strong> <a href='http://meteor.com'>here</a>");
```

To clear messages:
```javascript
  FlashTelegrams.clear();
```

Only the seen messages will be cleared.

##Configure

You can configure globally the way the messages behave with FlashTelegrams.configure (the below sample shows the default values):
```javascript
  FlashTelegrams.configure({
    autoHide: true,
    hideDelay: 5000,
    autoScroll: true
  });
```

- `autoHide`: set to `true` to make flash message fade after `hideDelay` milliseconds, set to `false` to require the user to click the close button on the message to dismiss it.
- `hideDelay`: set the desired number of milliseconds for the flash message to be displayed (when `autoHide` is `true`).
- `autoScroll`: set to `true` to enable auto scroll when a message is displayed, `false` to disable auto scroll. (**Note:** this can be set only globally.)

You can also set individual options on messages. This will override global configuration:
```javascript
  FlashTelegrams.sendWarning("Message", { autoHide: false });
  FlashTelegrams.sendError("Message", { hideDelay: 2000 });
  FlashTelegrams.sendSuccess("Message", { autoHide: true, hideDelay: 8000 });
```
