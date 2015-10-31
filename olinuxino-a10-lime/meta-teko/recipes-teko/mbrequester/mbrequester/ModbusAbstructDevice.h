//
// Created by lamazavr on 18.10.15.
//

#ifndef PARAM_REQUESTER_MODBUSDEVICE_H
#define PARAM_REQUESTER_MODBUSDEVICE_H

#include "types.h"
#include <modbus/modbus.h>
#include <stdio.h>
#include <string.h>

#include <node.h>
#include <v8.h>
using namespace v8;

class ModbusAbstructDevice {
public:
    ModbusAbstructDevice(modbus_t *ctx, u8 addr);

    //update device registers (rw)
    virtual void update();

    //is there any error
    virtual bool isFault();

    virtual Local<Object> form_node_object();

    u8 get_addr();

protected:
    modbus_t *ctx;
    u8 addr;
    bool fault;
};


#endif //PARAM_REQUESTER_MODBUSDEVICE_H
