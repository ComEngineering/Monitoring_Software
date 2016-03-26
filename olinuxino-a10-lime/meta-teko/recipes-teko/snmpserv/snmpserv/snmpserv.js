var dbus = require('dbus-native');
var snmp = require('snmpjs');
var mysql = require('mysql');
var fs = require('fs');
 
var parameters_values;
 
// snmp server test read command
// snmpget -v 2c -c any localhost:8161 .1.3.6.1.2.1.1.5.0
// snmpset -v 2c -c any localhost:8161 .1.3.6.1.2.1.1.5.0 s 123
var agent = snmp.createAgent();

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'drupal7IsGood',
    socketPath: '/run/mysqld/mysqld.sock',
});
 
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
 
    console.log('Connected as id ' + connection.threadId);
 
    main();
});

function get_parameter_value(param) {
    var v = parameters_values[param.name];
    switch (param.sql_type)
    {
        case "FLOAT":
            // convert float number to integer with 3 digits in fractional part
            v = parseInt(v*1000);
        break;
    }
    return snmp.data.createData({ type: 'Integer', value: v });;
}
 
 
function main() {
    try {
        //пробуем загрузить файл с описанием устройств
        obj = JSON.parse(fs.readFileSync('/opt/mb_conf.js', 'utf8'));
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
 
    connection.query('USE teko');
    // initial values select
    var sql = "SELECT * FROM `mb_parameters` ORDER BY `id` DESC LIMIT 1";
    connection.query(sql, function(err, rows){
        if (err) {
            console.log('error mysql parameters update: ' + err.stack);
            return;
        }
        parameters_values = rows[0];

        obj.input.values.forEach(function(e) {
            console.log(e.oid + " : " + parameters_values[e.name]);
            //register snmp request handlers for input registers
            agent.request({ oid: e.oid, handler: function (prq) {
                var v = get_parameter_value(e);
                snmp.provider.readOnlyScalar(prq, v);
            } });

        });
     
        agent.bind({ family: 'udp4', port: 8161 });

    }); 
 
    // dbus interfase
    /*var sessionBus = dbus.sessionBus();
 
    sessionBus.getService('teko.modbus').getInterface(
        '/com/teko/modbus',
        'com.teko.modbus', function(err, notifications) {
 
        // dbus signal that some Modbus parameters were updated
        notifications.on('update', function() {
            console.log('parameters update', arguments);
 
            var sql = "SELECT * FROM `mb_parameters` ORDER BY `id` DESC LIMIT 1";
 
            connection.query(sql, function(err, rows){
                if (err)
                {
                    console.log('error mysql parameters update: ' + err.stack);
                    return;
                }
 
                parameters_values = rows[0];
            });
        });
 
    });
    */
}
