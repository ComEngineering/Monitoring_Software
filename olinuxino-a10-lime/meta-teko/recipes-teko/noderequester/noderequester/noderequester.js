var fs = require('fs');
var mysql = require('mysql');
var modbus = require('modbus');
var dbus = require('dbus-native');

var obj;
var mb;
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
    return ((reg.type == "modbus") && (p_reg.bus == reg.bus) && (p_reg.addr == reg.addr) && (p_reg.reg + 1 == reg.reg));
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
        console.log("call write function", bus, addr, reg, val);
        try {
            //пока плата не поддерживает 10h функцию
            //for (var i=0;i<val.length;i++)
            //    mb.WriteRegister(addr, reg+i, val[i]);
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
        e.value = 0;
    });

    console.log("Starting parameters update ...");
    //начинаем читать параметры
    update_parameters();
}

function is_bus_ready(reg) {
   var r = (new Date().getTime() - buses[reg.bus].req_time);// >= buses[reg.bus].delay;
   //console.log(reg.bus, r, buses[reg.bus].req_time, buses[reg.bus].delay);
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
            //console.log("reading ", register.addr, register.reg, sequence_length);
            var regs = buses[register.bus].ReadRegisters(register.addr, register.reg, sequence_length + 1);
            //console.log(regs);
            
            for (var j = 0; j < sequence_length+1; j++) {
                //TODO: check that link here works properly
                var e = obj.input.values[i + j];

                if (e.convert != null) {
                    //console.log("converting ", regs, j);
                    var func = new Function('return ' + e.convert)();
                    regs[j] = func(regs, j);
                }
                
                if (regs[j] != e.value) {
                    //console.log('dirty flag set');
                    //console.log(e.description, regs[j], e.value);
                    //console.log(regs);
                    e.value = regs[j];
                    dirty = true;
                }
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
        for(var i = 0; i<obj.input.values.length-1; i++)
            sql += obj.input.values[i].name + ', ';    
        sql += obj.input.values[obj.input.values.length-1].name + ') values (';
        for(var i = 0; i<obj.input.values.length-1; i++)
            sql += obj.input.values[i].value + ', ';

        sql += obj.input.values[obj.input.values.length-1].value + ')';

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

