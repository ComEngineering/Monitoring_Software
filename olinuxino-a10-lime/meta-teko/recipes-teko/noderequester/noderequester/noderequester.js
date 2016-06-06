var fs = require('fs');
var mysql = require('mysql');
var modbus = require('modbus');
var dbus = require('dbus-native');
var snmp = require('snmpjs');

var obj;
var mb;

var snmp_client = snmp.createClient();

var buses = [];

function init_serial_buses() {
    var config = {
        "modbus": modbus.MbObject,
        "pcomm": null
    };

    obj.buses.forEach(function(b) {
        try {
            console.log("Initialising bus " + b.name)
            buses[b.name] = new config[b.type]();
            buses[b.name].Connect(b.system_dev, b.baudrate, b.stopbits);
            buses[b.name].req_time = 0;
            buses[b.name].delay = b.delay;
        } catch (err) {
            console.log("Error while " + b.name + " initialisation. " + err);
        }
    });
}

function is_reg_following(p_reg, reg)
{
    if (reg == null) return false;
    return ((reg.type == "modbus_reg") && (p_reg.bus == reg.bus) && (p_reg.addr == reg.addr) && (p_reg.reg + 1 == reg.reg));
}

function get_reg(bus, addr, reg_addr)
{
    for (var i = 0; i < obj.input.values.length; i++) {
        if (obj.input.values[i].bus == bus && obj.input.values[i].addr == addr &&
            obj.input.values[i].reg == reg_addr)
            return obj.input.values[i];
    return null;
}

function check_reg_range(reg, val)
{
    if ((val >= reg.intervals.min) || (val <= reg.intervals.max))
        return true;
    return false;
}

var bus = dbus.sessionBus();
var name = 'teko.modbus';
bus.requestName(name, 0);

var tekoIface = {
    name: 'com.teko.modbus',
    methods: {
        write: ['bus', 'addr', 'reg', 'val'],
    },
    signals: {
        update: [ 'us', 'name1', 'name2' ]
    }
};

var teko_dbus = {
    //to test
    //dbus-send --print-reply --type=method_call --dest='teko.modbus' '/com/teko/modbus' com.teko.modbus.write uint16:127 uint16:1 array:uint16:123,124,125
    write : function(bus, addr, reg, val)
    {
        try {
            console.log("call write function");

            switch (r.type)
            {
                case "modbus_reg":
                    for (var i=0;i<val.length;i++)
                    {
                        var r = get_reg(bus, addr, reg+i);
                        if (check_reg_range(r, val[i]))
                            buses[bus].WriteRegister(addr, reg+i, val[i]);
                        else console.log(r.description, "value out of range")
                    }
                break;

                case "modbus_coil":
                    for (var i=0; i<val.length;i++)
                    {
                        buses[bus].WriteCoil(addr, reg+i, val[i]);
                    }
                break;

                default:
                    console.log("calling write with unknown register type", r.type)
            }
        } catch(e) {
            console.log(e);
            return 1;
        }
        return 0;
    },
    emit: function(name, param1, param2) {
        console.log('signal emit', name, param1, param2);
    }
};

bus.exportInterface(teko_dbus, '/com/teko/modbus', tekoIface);

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'newpass',
    socketPath: '/var/lib/mysql/mysql.sock',
});

console.log("Initialising mysql connection ...");
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);

    //если соеденились настраиваем модбас и начинаем опрашивать
    main();
    });

function main() {
    try {
        //пробуем загрузить файл с описанием устройств
        obj = JSON.parse(fs.readFileSync('/opt/mb_conf.js', 'utf8'));
    } catch (e) {
        console.log(e);
        process.exit(1);
    }

    console.log("Initialising mysql db ...");
    // пробуем создать базу данных, на случай если её нет
    connection.query('CREATE DATABASE IF NOT EXISTS `teko` CHARACTER SET utf8 COLLATE utf8_general_ci');
    connection.query('USE teko');

    var sql = 'CREATE TABLE IF NOT EXISTS `mb_parameters` (`id` INT(11) NOT NULL AUTO_INCREMENT, `timestamp` TIMESTAMP NOT NULL, ';
    // задаем колонки для параметров
    obj.input.values.forEach(function(e){
        sql += e.name + ' ' + e.sql_type + ', '
    });
    obj.output.values.forEach(function(e){
        sql += e.name + ' ' + e.sql_type + ', '
    });

    sql += 'PRIMARY KEY(`id`))';

    connection.query(sql, function(err) {
        if (err) {
            console.log('error mysql initialisation: ' + err.stack);
            process.exit(1);
        }
        init_mb_req();
    });
}

//создаем модбас соединение
function init_mb_req() {
    console.log("Initialising mb_requsting ...");

    init_serial_buses();

    obj.input.values.forEach(function(e) {
        e.value = e.default;
    });
    obj.output.values.forEach(function(e) {
        e.value = e.default;
    });


    console.log("Starting parameters update ...");
    //начинаем читать параметры
    update_parameters();
}

function is_bus_ready(reg) {
   var r = (new Date().getTime() - buses[reg.bus].req_time);// >= buses[reg.bus].delay;
   return r >= buses[reg.bus].delay;
}

//функция чтения/записи параметров
function update_parameters() {
    var dirty = false;

    for (var i = 0; i < obj.input.values.length; i++) {
        var register = obj.input.values[i];
        var sequence_length = 0;

        //search for the end of sequence
        while (is_reg_following(obj.input.values[i + sequence_length], obj.input.values[i + sequence_length + 1]))
            sequence_length++; 

        if (is_bus_ready(register)) {
        
        try {
            switch (register.type)
            {
                case "modbus_reg":
                    var regs = buses[register.bus].ReadRegisters(register.addr, register.reg, sequence_length + 1);
                    
                    for (var j = 0; j < sequence_length+1; j++) {
                        var e = obj.input.values[i + j];

                        if (e.convert != null) {
                            var func = new Function('return ' + e.convert)();
                            regs[j] = func(regs, j);
                        }
                        
                        if (regs[j] != e.value) {
                            e.value = regs[j];
                            dirty = true;
                        }
                    }
                break;

                case "snmp_reg":
                    client.get(register.ip, register.community, 0, register.oid, function (snmpmsg) {
                        console.log("snmp: ", snmpmsg);
                        e.value = 
                        client.unref();
                    });
                break;

                default:
                    console.log("unhandled register type", register.type);
            }
        } catch (err) {
            console.log("Error while requesting " + register + ". " + err);
        }
          
        buses[register.bus].req_time = new Date().getTime();
        }
        i += sequence_length;
    }

    if (dirty) {
        console.log('inserting to db');
        var sql = 'INSERT INTO `mb_parameters` (';
        // задаем колонки для параметров
        for(var i = 0; i<obj.input.values.length; i++)
            sql += obj.input.values[i].name + ', ';    
        for(var i = 0; i<obj.output.values.length-1; i++)
            sql += obj.output.values[i].name + ', ';    

        sql += obj.output.values[obj.output.values.length-1].name + ') values (';

        for(var i = 0; i<obj.input.values.length; i++)
            sql += obj.input.values[i].value + ', ';
        for(var i = 0; i<obj.output.values.length-1; i++)
            sql += obj.output.values[i].value + ', ';

        sql += obj.output.values[obj.output.values.length-1].value + ')';

        connection.query(sql, function(err) {
            if (err) {
                console.log('error mysql parameters insertation: ' + err.stack);
            }
        });
        dirty = false;

        teko_dbus.emit('update', Math.floor(new Date() / 1000), 'parameters update');
    }

    //пока обновляем все вместе
    sleep(100, update_parameters);
}

//обертка для вызова функции по таймеру
function sleep(ms, callback) {
   setTimeout(function(){callback();}, ms);
}

