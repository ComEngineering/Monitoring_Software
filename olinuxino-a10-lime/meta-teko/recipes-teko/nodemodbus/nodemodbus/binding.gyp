{
  "targets": [
    {
      "target_name": "modbus",
      "sources": [ "addon.cc", "mbobject.cc" ],
      "libraries" : ["-lmodbus"],
      "cflags" : ["-std=c++11"]
    }
  ]
}
