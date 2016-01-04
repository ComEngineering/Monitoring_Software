var fs = require('fs');
var mysql = require('mysql');
var modbus = require('/opt/teko/olinuxino-a10-lime/meta-teko/recipes-teko/nodemobdbus/nodemodbus/build/Release/modbus');
var dbus = require('dbus-native');

var obj;
var mb;

var bus = dbus.sessionBus();
var name = 'teko.modbus';
bus.requestName(name, 0);

var tekoIface = {
    name: 'com.teko.modbus',
    //for debug 
    methods: {
        doStuff: ['s', 's'],
        timesTwo: ['d', 'd'],
        respondWithDouble: ['s', 'd']
    },
    signals: {
        testsignal: [ 'us', 'name1', 'name2' ]
    },
    properties: {
       TestProperty: 'y'
    }
};
//TODO: create write register function here
var teko_dbus = {
    respondWithDouble: function(s) {
        console.log('Received "' + s + "'");
        return 3.14159;
    },
    timesTwo: function(d) {
    console.log(d);
        return d*2; 
    },
    doStuff: function(s) {
        return 'Received "' + s + '" - this is a reply'; 
    },
    TestProperty: 42,
    emit: function(name, param1, param2) {
        console.log('signal emit', name, param1, param2);
    }
};
bus.exportInterface(teko_dbus, '/com/teko/modbus', tekoIface);


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'newpass',
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


function main()
{

    console.log("Initialising mysql db ...");
    // пробуем создать базу данных, на случай если её нет
    connection.query('CREATE DATABASE IF NOT EXISTS `teko` CHARACTER SET utf8 COLLATE utf8_general_ci');
    connection.query('USE teko');
    connection.query('CREATE TABLE IF NOT EXISTS `mb_parameters` (`id` INT(11) NOT NULL AUTO_INCREMENT, `name` CHAR(30) NOT NULL, `jsobject` TEXT NOT NULL, `timestamp` TIMESTAMP NOT NULL, PRIMARY KEY(`id`))', function(err){
        if (err)
        {
            console.log('error mysql initialisation: ' + err.stack);
            process.exit(1);
        }
        init_mb_req();
    });
}

//создаем модбас соединение
function init_mb_req()
{
    console.log("Initialising mb_requsting ...");

    try {
        mb = new modbus.MbObject();
        mb.Connect("/dev/ttyUSB0", 9600, 1);

        //пробуем загрузить файл с описанием устройств
        obj = JSON.parse(fs.readFileSync('example.mb_conf.js', 'utf8'));
    } catch(e) 
    {
        console.log(e);
        process.exit(1);
    }

    obj.input.values.forEach(function(e){
        e.value = 0;
    });


    console.log("Starting parameters update ...");
    //начинаем читать параметры
    update_parameters();
}

//функция чтения/записи параметров
function update_parameters()
{
    obj.input.values.forEach(function(e){
        //тут обмен с устройствами и запись в базу данных
        console.log(e.description);
        try{
            var regs = mb.ReadRegisters(e.addr, e.reg, 1);
            console.log("Got "+e.name + ": " + regs)
            if (regs[0] != e.value) 
            {
                e.value = regs[0];
                var dbstring = JSON.stringify(e);
                //тут сделать запись объекта
                connection.query("INSERT INTO `mb_parameters` (`name`, `jsobject`) values (?, ?)", [e.name, dbstring], function (error, results, fields) {
                  // error will be an Error if one occurred during the query
                  // results will contain the results of the query
                  // fields will contain information about the returned results fields (if any)
                  if (error)
                  {
                    console.log("ERROR WRITING:" + results);
                  }

                  //send modbus update signal via dbus
                  teko_dbus.emit('testsignal', Date.now(), 'param2');

                });
            }
        } catch (err) 
        {
            //console.log(err);
        }
    });
    
    //пока обновляем все вместе
    sleep(1000, update_parameters);
}

//обертка для вызова функции по таймеру
function sleep(ms, callback){
   setTimeout(function(){callback();}, ms);
}

