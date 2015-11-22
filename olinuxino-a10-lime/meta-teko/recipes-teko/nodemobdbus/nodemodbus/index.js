var addon = require('./build/Release/modbus');
var obj = new addon.MbObject();
obj.Connect("/dev/ttyUSB0", 9600, 1);
obj.WriteCoil(2, 1, 1)

obj.WriteRegisters(2, 1, [1, 5]);
var regs = obj.ReadRegisters(2, 1, 5);
console.log(regs)
