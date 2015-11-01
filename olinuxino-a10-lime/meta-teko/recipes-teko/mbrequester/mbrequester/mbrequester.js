var addon = require('./build/Release/mbrequester');
addon.create("/dev/ttyS1", 115200, 1)