var addon = require('bindings')('mbrequster');
addon.create("/dev/ttyS0", 115200, 1)