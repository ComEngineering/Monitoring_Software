//
// Created by lamazavr on 18.10.15.
//
#include "types.h"
#include "ModbusAbstructDevice.h"

ModbusAbstructDevice::ModbusAbstructDevice(modbus_t *ctx, u8 addr)
{
    this->ctx = ctx;
    this->addr = addr;
    this->fault = false;

    modbus_set_slave(ctx, addr);
}

void ModbusAbstructDevice::update()
{
    //get registers data here
    //check fails
    //write updated data
}

bool ModbusAbstructDevice::isFault()
{
    return fault;
}

Local<Object> ModbusAbstructDevice::form_node_object()
{
	Local<Object> obj = Object::New();
	return obj;
}

u8 ModbusAbstructDevice::get_addr()
{
	return this->addr;
}