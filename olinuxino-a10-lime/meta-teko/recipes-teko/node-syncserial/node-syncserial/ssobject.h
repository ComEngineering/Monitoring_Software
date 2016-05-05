#ifndef SERIAL_SYNC_H
#define SERIAL_SYNC_H

#include <node.h>
#include <node_object_wrap.h>
#include <termios.h>

namespace demo {

#define NODE_ARGS const v8::FunctionCallbackInfo<v8::Value>&

class SyncSerialObject : public node::ObjectWrap {
public:
    static void Init(v8::Local<v8::Object> exports);

private:
    ~SyncSerialObject();

    static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
    static v8::Persistent<v8::Function> constructor;

    //serial device file descriptor
    int fd;
    fd_set fs;
    struct timeval timeout;
    struct termios term;

    static void Open(NODE_ARGS args);
    static void Read(NODE_ARGS args);
    static void Write(NODE_ARGS args);
};

}  // namespace demo

#endif //SERIAL_SYNC_H
