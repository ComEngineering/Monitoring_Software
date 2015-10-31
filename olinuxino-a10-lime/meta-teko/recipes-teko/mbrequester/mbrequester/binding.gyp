{
  "targets": [
    {
      "target_name": "mbrequester",
      "sources": [ 
      		"mbrequester.cc", 
       		"ModbusAbstructDevice.cpp",
       		"ThermalDevice.cpp",
       		"mb_2b_request.cpp",
       ],

      "libraries" : ["-lmodbus"],
      "cflags" : ["-std=c++11"]
    }
  ]
}
