var dbus = require('dbus-native');
var bus = dbus.sessionBus();

bus.invoke({ 
    path: '/com/teko/modbus', 
    destination: 'teko.modbus', 
    'interface': 'com.teko.modbus', 
    member: 'write', 
    signature: 'iyai',
    body: [1,2,[3,1,3,3,4,5]],
}, function(err, res) {
    console.log(res);
});
    //dbus-send --print-reply --type=method_call --dest='teko.modbus' '/com/teko/modbus' com.teko.modbus.write uint16:127 uint16:1 array:uint16:123,124,125