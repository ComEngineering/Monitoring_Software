// MbObject.cc
#include "mbobject.h"
#include "errno.h"
#include "stdio.h"
#include <string.h>
#include <vector>

namespace demo {

using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::Persistent;
using v8::String;
using v8::Value;
using v8::Array;

Persistent<Function> MbObject::constructor;

MbObject::~MbObject() {
    modbus_close(ctx);
    modbus_free(ctx);
}

void MbObject::Init(Local<Object> exports) {
  Isolate* isolate = exports->GetIsolate();

  // Prepare constructor template
  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
  tpl->SetClassName(String::NewFromUtf8(isolate, "MbObject"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  // Prototype
  NODE_SET_PROTOTYPE_METHOD(tpl, "Connect", Connect);
  NODE_SET_PROTOTYPE_METHOD(tpl, "ReadRegisters", ReadRegisters);
  NODE_SET_PROTOTYPE_METHOD(tpl, "WriteRegisters", WriteRegisters);
  NODE_SET_PROTOTYPE_METHOD(tpl, "WriteRegister", WriteRegister);
  NODE_SET_PROTOTYPE_METHOD(tpl, "WriteCoil", WriteCoil);

  constructor.Reset(isolate, tpl->GetFunction());
  exports->Set(String::NewFromUtf8(isolate, "MbObject"),
               tpl->GetFunction());
}

void MbObject::New(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (args.IsConstructCall()) {
    // Invoked as constructor: `new MbObject(...)`
    MbObject* obj = new MbObject();
    obj->Wrap(args.This());
    args.GetReturnValue().Set(args.This());
  } else {
    // Invoked as plain function `MbObject(...)`, turn into construct call.
    const int argc = 1;
    Local<Value> argv[argc] = { args[0] };
    Local<Function> cons = Local<Function>::New(isolate, constructor);
    args.GetReturnValue().Set(cons->NewInstance(argc, argv));
  }
}

void MbObject::Connect(NODE_ARGS args) {
    Isolate* isolate = args.GetIsolate();
    MbObject* obj = ObjectWrap::Unwrap<MbObject>(args.Holder());

    if (args.Length() < 3)
    {
        //com dev addr
        //baudrate
        //stopbits

        isolate->ThrowException(v8::Exception::Error(
            String::NewFromUtf8(isolate, "Wrong number of arguments")));
        return;
    }

    String::Utf8Value str(args[0]->ToString());
      obj->ctx = modbus_new_rtu(*str, args[1]->NumberValue(), 'N', 8, args[2]->NumberValue());
    if (obj->ctx == NULL) {
        modbus_close(obj->ctx);
        modbus_free(obj->ctx);

        isolate->ThrowException(v8::Exception::Error(
             String::NewFromUtf8(isolate, "Unable to create the libmodbus context")));
        return;
    }

    modbus_rtu_set_serial_mode(obj->ctx, MODBUS_RTU_RS485);
    modbus_rtu_set_rts(obj->ctx, MODBUS_RTU_RTS_DOWN);
    modbus_rtu_set_rts_delay(obj->ctx, 0);

    if (modbus_connect(obj->ctx) == -1) {
        modbus_close(obj->ctx);
        modbus_free(obj->ctx);

        isolate->ThrowException(v8::Exception::Error(
             String::NewFromUtf8(isolate, "Unable to connect")));
        return;

    }
#ifdef DEBUG_BUILD
    modbus_set_debug(obj->ctx, 1);
#endif
}

void MbObject::ReadRegisters(NODE_ARGS args)
{
    int rc, i;
    std::vector<uint16_t> v(1);
    Isolate* isolate = args.GetIsolate();
    Local<Array> result_list = Array::New(isolate);
    MbObject* obj = ObjectWrap::Unwrap<MbObject>(args.Holder());

    if (args.Length() < 3)
    {
        //dev addr
        //reg addr
        //reg count 

        isolate->ThrowException(v8::Exception::Error(
            String::NewFromUtf8(isolate, "Wrong number of arguments")));
        return;
    }
    
    modbus_set_slave(obj->ctx, args[0]->NumberValue());
    
    v.resize(args[2]->NumberValue());

    rc = modbus_read_registers(obj->ctx, args[1]->NumberValue(), args[2]->NumberValue(), v.data());
    if (rc == -1) {
        isolate->ThrowException(v8::Exception::Error(
             String::NewFromUtf8(isolate, modbus_strerror(errno))));
        return;
    }

    //заворачиваем в массив nodejs 
    for (i=0; i < rc; i++) {
        result_list->Set(i, Number::New(isolate, v.data()[i]));
    }
    args.GetReturnValue().Set(result_list);
}

void MbObject::WriteRegisters(NODE_ARGS args)
{
    Isolate* isolate = args.GetIsolate();
    MbObject* obj = ObjectWrap::Unwrap<MbObject>(args.Holder());
    uint16_t *regs;
    int rc;
    unsigned int i;

    if (args.Length() < 3)
    {
        //dev addr
        //reg addr
        //data 

        isolate->ThrowException(v8::Exception::Error(
            String::NewFromUtf8(isolate, "Wrong number of arguments")));
        return;
    }

    Local<Array> input_regs = Local<Array>::Cast(args[2]);

    regs = new uint16_t[input_regs->Length()];
    //формируем значения регистров
    for (i = 0; i<input_regs->Length(); i++)
    {
        regs[i] = (uint16_t)input_regs->Get(i)->Uint32Value();
    }


    modbus_set_slave(obj->ctx, args[0]->NumberValue());

    rc = modbus_write_registers(obj->ctx, args[1]->NumberValue(), input_regs->Length(), regs);
    if (rc == -1)
    {
        isolate->ThrowException(v8::Exception::Error(
            String::NewFromUtf8(isolate, modbus_strerror(errno))));
    }

    delete regs;
}

void MbObject::WriteCoil(NODE_ARGS args)
{
    Isolate* isolate = args.GetIsolate();
    MbObject* obj = ObjectWrap::Unwrap<MbObject>(args.Holder());
    int rc;

    if (args.Length() < 3)
    {
        //dev addr
        //coil addr
        //status

        isolate->ThrowException(v8::Exception::Error(
            String::NewFromUtf8(isolate, "Wrong number of arguments")));
        return;
    }

    modbus_set_slave(obj->ctx, args[0]->NumberValue());

    rc = modbus_write_bit(obj->ctx, args[1]->NumberValue(), args[2]->NumberValue());
    if (rc == -1)
    {
        isolate->ThrowException(v8::Exception::Error(
            String::NewFromUtf8(isolate, modbus_strerror(errno))));
    }
}

void MbObject::WriteRegister(NODE_ARGS args)
{
    Isolate* isolate = args.GetIsolate();
    MbObject* obj = ObjectWrap::Unwrap<MbObject>(args.Holder());
    int rc;

    if (args.Length() < 3)
    {
        //dev addr
        //reg addr
        //value

        isolate->ThrowException(v8::Exception::Error(
            String::NewFromUtf8(isolate, "Wrong number of arguments")));
        return;
    }

    modbus_set_slave(obj->ctx, args[0]->NumberValue());

    rc = modbus_write_register(obj->ctx, args[1]->NumberValue(), args[2]->NumberValue());
    if (rc == -1)
    {
        isolate->ThrowException(v8::Exception::Error(
            String::NewFromUtf8(isolate, modbus_strerror(errno))));
    }
}

void MbObject::GetIdString(NODE_ARGS args)
{
    Isolate* isolate = args.GetIsolate();
    MbObject* obj = ObjectWrap::Unwrap<MbObject>(args.Holder());
    int rc;
    uint8_t req[] = {0x2B, 0x0E, 0x01, 0x00};
    uint8_t resp[100];

    if (args.Length() < 1)
    {
        //dev addr
        
        isolate->ThrowException(v8::Exception::Error(
            String::NewFromUtf8(isolate, "Wrong number of arguments")));
        return;
    }

    modbus_set_slave(obj->ctx, args[0]->NumberValue());

    rc = modbus_send_raw_request(obj->ctx, req, sizeof(req)/sizeof(uint16_t));
    if (rc == -1)
    {
        isolate->ThrowException(v8::Exception::Error(
            String::NewFromUtf8(isolate, modbus_strerror(errno))));
    }

    rc = modbus_receive_confirmation(obj->ctx, resp);
    if (rc == -1)
    {
        isolate->ThrowException(v8::Exception::Error(
            String::NewFromUtf8(isolate, modbus_strerror(errno))));
    }

    //parse response here
    if (resp[1] == 0x2b)
    {
        char company[10], product[10], rev[10];

        uint16_t len = resp[9];
        uint8_t *pnt = &resp[10];
        memcpy(company, pnt, len);
        pnt += len + 2;
        len = pnt[-1];
        memcpy(product, pnt, len);
        pnt += len + 2;
        len = pnt[-1];
        memcpy(rev, pnt, len);
    
        Local<Object> obj = Object::New(isolate);
        obj->Set(String::NewFromUtf8(isolate, "company"), String::NewFromUtf8(isolate, company));
        obj->Set(String::NewFromUtf8(isolate, "product"), String::NewFromUtf8(isolate, product));
        obj->Set(String::NewFromUtf8(isolate, "rev"), String::NewFromUtf8(isolate, rev));

        args.GetReturnValue().Set(obj);
        return;
    }

    isolate->ThrowException(v8::Exception::Error(
        String::NewFromUtf8(isolate, "Wrong request.")));

}

}  // namespace demo