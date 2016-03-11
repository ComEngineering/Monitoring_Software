#include <node.h>
#include "mbobject.h"

namespace demo {

using v8::Local;
using v8::Object;

void InitAll(Local<Object> exports) {
  MbObject::Init(exports);
}

NODE_MODULE(addon, InitAll)

}  // namespace demo
