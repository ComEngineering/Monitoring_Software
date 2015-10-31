#include <node.h>
#include <v8.h>

using namespace v8;

#include <modbus/modbus.h>
#include <errno.h>

#include "types.h"
#include <list>
#include <iostream>
#include "mb_2b_request.h"
#include "ModbusAbstructDevice.h"
#include "ThermalDevice.h"

//список обнаруженных устройств
std::list<ModbusAbstructDevice *> dev_list;
modbus_t *ctx;

//поиск и идентификация modbus устройств
Handle<Value> search(const Arguments& args) {
    HandleScope scope;
    char buff[100];
    u16 i;

    for (i = 1; i<=255; i++)
    {
        if (modbus_2b_request(i, buff) == OK_RESPONSE)
        {
            if (strcmp(buff, "TEKO THERMAL DEV") == 0)
            {
                ThermalDevice *th = new ThermalDevice(ctx, i);
                dev_list.push_front(th);
            } else {

            }
        }
    }

    Local<Object> obj = Object::New();

    i = 0;
    for (std::list<ModbusAbstructDevice *>::iterator it = dev_list.begin();
        it != dev_list.end(); 
        it++, i++)
    {
        obj->Set(i, (*it)->form_node_object());

    }


    return scope.Close(obj);
}

//инициализация modbus
Handle<Value> mb_init(const Arguments& args) {
    HandleScope scope;
    

    unsigned short regs[10];
    int ret; 

    Local<Object> obj = Object::New();


    if (args.Length() < 3)
    {
        //com dev addr
        //baudrate
        //stopbits


        ThrowException(Exception::TypeError(
             String::New("Wrong number of arguments")));
        return scope.Close(obj);
    }

    //converting com addr
    String::Utf8Value str(args[0]->ToString());

    // ctx = modbus_new_rtu(*str, args[1]->NumberValue(), 'N', 
    //     8, args[2]->NumberValue());

    ctx = modbus_new_rtu("/dev/ttyS0", 115200, 'N', 8, 1);

    if (ctx == NULL) {
        modbus_close(ctx);
        modbus_free(ctx);

        ThrowException(Exception::TypeError(
             String::New("Unable to create the libmodbus context")));
        
        return scope.Close(obj);
    }

    modbus_set_slave(ctx, 2);

    // ret = modbus_connect(ctx); 
    // if (ret == -1) {
    //     ThrowException(Exception::TypeError(
    //          String::New(modbus_strerror(errno))));
    //     return scope.Close(obj);
    // }

    ret = modbus_read_registers(ctx, 0, 2, regs);

    if (ret == -1) {
        modbus_close(ctx);
        modbus_free(ctx);

        ThrowException(Exception::TypeError(
             String::New(modbus_strerror(errno))));

        return scope.Close(obj);
    }





    // Local<Object> dev = Object::New();
    // dev->Set(String::NewSymbol("connect"), 
    //   FunctionTemplate::New(connect)->GetFunction());


    obj->Set(String::NewSymbol("search"), 
        FunctionTemplate::New(search)->GetFunction());

    modbus_close(ctx);
    modbus_free(ctx);

    return scope.Close(obj);
}

void Init(Handle<Object> exports) {
  exports->Set(String::NewSymbol("create"),
      FunctionTemplate::New(mb_init)->GetFunction());
}

NODE_MODULE(mbrequester, Init)
