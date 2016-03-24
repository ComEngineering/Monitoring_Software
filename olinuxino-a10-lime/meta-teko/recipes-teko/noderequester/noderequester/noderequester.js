var fs = require('fs');
var mysql = require('mysql');
var modbus = require('modbus');
var dbus = require('dbus-native');

var obj;
var mb;

var bus = dbus.sessionBus();
var name = 'teko.modbus';
bus.requestName(name, 0);

var tekoIface = {
    name: 'com.teko.modbus',
    methods: {
        write: ['addr', 'reg', 'val'],
    },
    signals: {
        update: [ 'us', 'name1', 'name2' ]
    }
};

var teko_dbus = {
    //to test
    //dbus-send --print-reply --type=method_call --dest='teko.modbus' '/com/teko/modbus' com.teko.modbus.write uint16:127 uint16:1 array:uint16:123,124,125
    write : function(addr, reg, val)
    {
        try {
            //пока плата не поддерживает 10h функцию
            for (var i=0;i<val.length;i++)
                mb.WriteRegister(addr, reg+i, val[i]);
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

    try {
        mb = new modbus.MbObject();
        mb.Connect("/dev/ttyS1", 9600, 1);
    } catch(e) {
        console.log(e);
        process.exit(1);
    }

    obj.input.values.forEach(function(e) {
        e.value = 0;
    });


    console.log("Starting parameters update ...");
    //начинаем читать параметры
    update_parameters();
}

//функция чтения/записи параметров
function update_parameters() {
    var dirty = false;

    obj.input.values.forEach(function(e) {
        //тут обмен с устройствами и запись в базу данных
        console.log(e.description);
        try {
            var regs = mb.ReadRegisters(e.addr, e.reg, 1);
            if (e.convert != null) {
                var func = new Function('return ' + e.convert)();
                regs = func(regs);
            }
            console.log("Got " + e.name + ": " + regs)

            if (regs != e.value) {
                e.value = regs;
                dirty = true;
            }
        } catch (err) {
            console.log(err);
        }
    });

    if (dirty) {
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

        teko_dbus.emit('update', Date.now(), 'parameters update');
    }

    //пока обновляем все вместе
    sleep(100, update_parameters);
}

//обертка для вызова функции по таймеру
function sleep(ms, callback) {
   setTimeout(function(){callback();}, ms);
}

