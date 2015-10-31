//
// Created by lamazavr on 18.10.15.
//

#include "types.h"
#include "ThermalDevice.h"

void ThermalDevice::update() {
    modbus_read_registers(ctx, 1, 2, regs);
}

Local<Object> ThermalDevice::form_node_object()
{
	Local<Object> dev = Object::New();

	// dev->Set(String::NewSymbol("connect"), 
	//   FunctionTemplate::New(connect)->GetFunction());

	dev->Set(String::NewSymbol("name"), String::NewSymbol("TEKO THERMAL DEV"));

	return dev;
}