// myobject.h
#ifndef MBOBJECT_H
#define MBOBJECT_H

#include <node.h>
#include <node_object_wrap.h>

#include <modbus/modbus.h>

namespace demo {

#define NODE_ARGS const v8::FunctionCallbackInfo<v8::Value>&

class MbObject : public node::ObjectWrap {
public:
    static void Init(v8::Local<v8::Object> exports);

private:
    ~MbObject();

    static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
    static v8::Persistent<v8::Function> constructor;

    modbus_t *ctx;
    static void Connect(NODE_ARGS args);
    //Modbus protocol functions
    static void ReadRegisters(NODE_ARGS args);	//3 func
    static void WriteRegisters(NODE_ARGS args); //10 func
    static void WriteRegister(NODE_ARGS args);  //6 func
    static void WriteCoil(NODE_ARGS args);		//5 func
    static void GetIdString(NODE_ARGS args);	//2B func
};

}  // namespace demo

#endif //MBOBJECT_H
