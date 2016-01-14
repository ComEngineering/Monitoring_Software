var dbus = require('dbus-native');
var sessionBus = dbus.sessionBus();

sessionBus.getService('teko.modbus').getInterface(
    '/com/teko/modbus',
    'com.teko.modbus', function(err, notifications) {

        console.log(err);
        console.log(notifications);
    // dbus signals are EventEmitter events
    notifications.on('update', function() {
        console.log('parameters update', arguments);
    });

});