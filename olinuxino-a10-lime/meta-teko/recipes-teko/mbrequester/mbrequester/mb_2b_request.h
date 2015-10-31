//
// Created by lamazavr on 28.10.15.
//

#ifndef MB_2B_REQUEST_H
#define MB_2B_REQUEST_H

typedef enum {
	OK_RESPONSE,
	NO_RESPONSE,
} Respnose_t;

u8 modbus_2b_request(u8 addr, char *bff);

#endif //MB_2B_REQUEST_H
