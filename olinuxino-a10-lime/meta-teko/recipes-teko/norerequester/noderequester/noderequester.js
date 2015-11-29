var fs = require('fs');
var mysql = require('mysql');
var modbus = require('modbus');



var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : ''
});

console.log("Initialising mysql connection ...");
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

console.log("Initialising mysql db ...");
// пробуем создать базу данных, на случай если её нет
connection.query('CREATE DATABASE IF NOT EXISTS `teko` CHARACTER SET utf8 COLLATE utf8_general_ci');
connection.query('USE teko');
connection.query('CREATE TABLE IF NOT EXISTS `mb_parameters` (`id` INT(11) NOT NULL AUTO_INCREMENT, `name` CHAR(30) NOT NULL, `jsobject` TEXT NOT NULL, `timestamp` TIMESTAMP NOT NULL, PRIMARY KEY(`id`))');





console.log("Initialising mb_requsting ...");

try {
    var mb = new mb.MbObject();
    mb.Connect("/dev/ttyUSB0", 9600, 1);

    //пробуем загрузить файл с описанием устройств
    var obj = JSON.parse(fs.readFileSync('mb_conf.json', 'utf8'));
} catch(e) 
{
    console.log(e);
    process.exit(1);
}

//функция чтения/записи параметров
function update_parameters()
{
    obj.input.values.forEach(function(e){
        //тут обмен с устройствами и запись в базу данных
        console.log(e.description);
        
        var regs = mb.ReadRegisters(e.addr, e.reg, 1);
        if (regs[0] != e.value) 
        {
            e.value = regs[0];
            var dbstring = JSON.stringify(e);
            //тут сделать запись объекта
            connection.query('INSERT INTO `mb_parameters` (`name`, `jsobject`) values (`?`, `?`)', [e.name, dbstring], function (error, results, fields) {
              // error will be an Error if one occurred during the query
              // results will contain the results of the query
              // fields will contain information about the returned results fields (if any)
            });
        }
    });
    
    //пока обновляем все вместе
    sleep(1000, update_parameters);
}

//обертка для вызова функции по таймеру
function sleep(ms, callback){
   setTimeout(function(){callback();}, ms);
}

console.log("Starting parameters update ...");
//начинаем читать параметры
update_parameters();