#include <node.h>
#include "ssobject.h"

namespace demo {

using v8::Local;
using v8::Object;

void InitAll(Local<Object> exports) {
  SyncSerialObject::Init(exports);
}

NODE_MODULE(addon, InitAll)

}  // namespace demo
