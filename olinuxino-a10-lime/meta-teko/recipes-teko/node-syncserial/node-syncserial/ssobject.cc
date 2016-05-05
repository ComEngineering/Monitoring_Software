#include "ssobject.h"
#include "errno.h"
#include "stdio.h"

#include <string.h>
#include <vector>

#include <fcntl.h>
#include <sys/select.h>
#include <unistd.h>

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

Persistent<Function> SyncSerialObject::constructor;

SyncSerialObject::~SyncSerialObject() {}

void SyncSerialObject::Init(Local<Object> exports) {
  Isolate* isolate = exports->GetIsolate();

  // Prepare constructor template
  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
  tpl->SetClassName(String::NewFromUtf8(isolate, "SyncSerialObject"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  // Prototype
  NODE_SET_PROTOTYPE_METHOD(tpl, "Open", Open);
  NODE_SET_PROTOTYPE_METHOD(tpl, "Read", Read);
  NODE_SET_PROTOTYPE_METHOD(tpl, "Write", Write);

  constructor.Reset(isolate, tpl->GetFunction());
  exports->Set(String::NewFromUtf8(isolate, "SyncSerialObject"),
               tpl->GetFunction());
}

void SyncSerialObject::New(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (args.IsConstructCall()) {
    // Invoked as constructor: `new SyncSerialObject(...)`
    SyncSerialObject* obj = new SyncSerialObject();
    obj->Wrap(args.This());
    args.GetReturnValue().Set(args.This());
  } else {
    // Invoked as plain function `SyncSerialObject(...)`, turn into construct call.
    const int argc = 1;
    Local<Value> argv[argc] = { args[0] };
    Local<Function> cons = Local<Function>::New(isolate, constructor);
    args.GetReturnValue().Set(cons->NewInstance(argc, argv));
  }
}

void SyncSerialObject::Open(NODE_ARGS args) {
    Isolate* isolate = args.GetIsolate();
    SyncSerialObject* obj = ObjectWrap::Unwrap<SyncSerialObject>(args.Holder());

    if (args.Length() < 3)
    {
        //device path
        //baudrate
        //stopbits

        isolate->ThrowException(v8::Exception::Error(
            String::NewFromUtf8(isolate, "Wrong number of arguments")));
        return;
    }

    String::Utf8Value dev(args[0]->ToString());
    obj->fd = open(*dev, O_RDWR | O_NONBLOCK | O_NOCTTY | O_NDELAY);
    if (obj->fd == -1) {
        isolate->ThrowException(v8::Exception::Error(
            String::NewFromUtf8(isolate, "Can't open device")));    
    }

    fcntl(obj->fd, F_SETFL, 0);

    //TODO: set speed parameters here

    memset(&obj->term, 0, sizeof(struct termios));
    //baud
    uint32_t baudrate = args[1]->NumberValue();
    switch (baudrate) {
        case 1200:
            baudrate = B1200;
        break;

        case 2400:
            baudrate = B2400;
        break;

        case 4800:
            baudrate = B4800;
        break;

        case 9600:
            baudrate = B9600;
        break;

        case 19200:
            baudrate = B19200;
        break;

        case 38400:
            baudrate = B38400;
        break;

        case 57600:
            baudrate = B57600;
        break;

        case 115200:
            baudrate = B115200;
        break;

        case 230400:
            baudrate = B230400;
        break;

        default:
            isolate->ThrowException(v8::Exception::Error(
                String::NewFromUtf8(isolate, "Unexpected baudrate")));    

    }

    if ((cfsetispeed(&obj->term, baudrate) < 0) ||
        (cfsetospeed(&obj->term, baudrate) < 0)) {
        isolate->ThrowException(v8::Exception::Error(
                String::NewFromUtf8(isolate, "Can't set baudrate")));
    }

    obj->term.c_cflag |= (CREAD | CLOCAL);
    obj->term.c_cflag &= ~CSIZE;
    obj->term.c_cflag |= CS8;

    //stopbits
    uint8_t sb = args[2]->NumberValue();
    switch (sb) {
        case 2:
            obj->term.c_cflag |= CSTOPB;
        break;

        case 1:
        default:
            obj->term.c_cflag &= ~CSTOPB;
        break;
    }

    // raw input mode
    obj->term.c_lflag &= ~(ICANON | ECHO | ECHOE | ISIG);
    //'N' parity
    obj->term.c_iflag &= ~(INPCK);
    // raw output mode
    obj->term.c_oflag &= ~OPOST;

    if (tcsetattr(obj->fd, TCSANOW, &obj->term) < 0)
    {
        isolate->ThrowException(v8::Exception::Error(
                String::NewFromUtf8(isolate, "Can't set port parameters")));     
    }
}

void SyncSerialObject::Read(NODE_ARGS args) {
    Isolate* isolate = args.GetIsolate();
    SyncSerialObject* obj = ObjectWrap::Unwrap<SyncSerialObject>(args.Holder());
    std::vector<uint8_t> v(1);
    uint32_t t, i, res;
    Local<Array> result = Array::New(isolate);

    if (args.Length() < 2)
    {
        //number of bytes to read
        //timeout in us

        isolate->ThrowException(v8::Exception::Error(
            String::NewFromUtf8(isolate, "Wrong number of arguments")));
        return;
    }

    v.resize(args[0]->NumberValue());
    t = args[1]->NumberValue();

    obj->timeout.tv_sec  = t / 1000000;
    obj->timeout.tv_usec = t % 1000000;

    FD_ZERO (&obj->fs);
    FD_SET(obj->fd, &obj->fs);

    res = select(obj->fd+1 , &obj->fs, NULL, NULL, &obj->timeout);

    if (res == 0) {
        isolate->ThrowException(v8::Exception::Error(
            String::NewFromUtf8(isolate, "reading timeout")));
        return;
    } else if (res > 0) {
        if (FD_ISSET(obj->fd, &obj->fs)) {

            res = read(obj->fd, v.data(), v.size());

            for (i=0; i < res; i++)
                result->Set(i, Number::New(isolate, v.data()[i]));
        }
    }

    args.GetReturnValue().Set(result);
}


void SyncSerialObject::Write(NODE_ARGS args) {
    Isolate* isolate = args.GetIsolate();
    SyncSerialObject* obj = ObjectWrap::Unwrap<SyncSerialObject>(args.Holder());
    
    if (args.Length() < 1)
    {
        //array for writing operation

        isolate->ThrowException(v8::Exception::Error(
            String::NewFromUtf8(isolate, "Wrong number of arguments")));
        return;
    }

    Local<Array> array = Local<Array>::Cast(args[0]);
    uint8_t *buffer = new uint8_t[array->Length()];
    for (uint16_t i = 0; i < array->Length(); i++)
    {
        buffer[i] = (uint8_t)array->Get(i)->Uint32Value();
    }
    write(obj->fd, buffer, array->Length());
}

}  // namespace demo
