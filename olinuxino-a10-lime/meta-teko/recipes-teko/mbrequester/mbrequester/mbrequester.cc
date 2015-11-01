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
void search(const FunctionCallbackInfo<Value>& args) {
    // HandleScope scope;
    Isolate* isolate = args.GetIsolate();
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

    Local<Object> obj = Object::New(isolate);

    i = 0;
    for (std::list<ModbusAbstructDevice *>::iterator it = dev_list.begin();
        it != dev_list.end(); 
        it++, i++)
    {
        obj->Set(i, (*it)->form_node_object(isolate));
    }


    args.GetReturnValue().Set(obj);
}

//инициализация modbus
void mb_init(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();

    unsigned short regs[10];
    int ret; 

    Local<Object> obj = Object::New(isolate);


    if (args.Length() < 3)
    {
        //com dev addr
        //baudrate
        //stopbits


        isolate->ThrowException(Exception::TypeError(
            String::NewFromUtf8(isolate, "Wrong number of arguments")));

        args.GetReturnValue().Set(obj);
        return;
    }

    //converting com addr
    //String::Utf8Value str(args[0]->ToString());

    // ctx = modbus_new_rtu(*str, args[1]->NumberValue(), 'N', 
    //     8, args[2]->NumberValue());

    ctx = modbus_new_rtu("/dev/ttyS0", 115200, 'N', 8, 1);

    if (ctx == NULL) {
        modbus_close(ctx);
        modbus_free(ctx);

        isolate->ThrowException(Exception::TypeError(
             String::NewFromUtf8(isolate, "Unable to create the libmodbus context")));
        
        args.GetReturnValue().Set(obj);
        return;
    }

    modbus_set_slave(ctx, 2);

    // // ret = modbus_connect(ctx); 
    // // if (ret == -1) {
    // //     ThrowException(Exception::TypeError(
    // //          String::New(modbus_strerror(errno))));
    // //     return scope.Close(obj);
    // // }

    ret = modbus_read_registers(ctx, 0, 2, regs);

    if (ret == -1) {
        modbus_close(ctx);
        modbus_free(ctx);

        isolate->ThrowException(Exception::TypeError(
             String::NewFromUtf8(isolate, modbus_strerror(errno))));

        args.GetReturnValue().Set(obj);
        return;
    }


    NODE_SET_METHOD(obj, "search", search);

    //TODO:
    //remove this after debug
    modbus_close(ctx);
    modbus_free(ctx);

    args.GetReturnValue().Set(obj);
}

void Init(Handle<Object> exports) {
    NODE_SET_METHOD(exports, "create", mb_init);
}

NODE_MODULE(mbrequester, Init)
