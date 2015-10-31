#include "types.h"
#include "mb_2b_request.h"

#include <stdio.h>
#include <string.h>

u8 modbus_2b_request(u8 addr, char *bff)
{
	strcpy(bff, "TEKO THERMAL DEV");
	return OK_RESPONSE;
}