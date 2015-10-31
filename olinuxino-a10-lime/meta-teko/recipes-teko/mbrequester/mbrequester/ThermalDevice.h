//
// Created by lamazavr on 18.10.15.
//

#ifndef PARAM_REQUESTER_THERMALDEVICE_H
#define PARAM_REQUESTER_THERMALDEVICE_H

#include "types.h"
#include "ModbusAbstructDevice.h"

class ThermalDevice : public ModbusAbstructDevice {
public:
    ThermalDevice(modbus_t *ctx, u8 addr) : ModbusAbstructDevice(ctx, addr)
    {
        regs = new u16[10];
    };

    ~ThermalDevice()
    {
        delete regs;
    }

    //update device registers (rw)
    virtual void update();
    virtual Local<Object> form_node_object();

private:
    u16 *regs;
};


#endif //PARAM_REQUESTER_THERMALDEVICE_H
