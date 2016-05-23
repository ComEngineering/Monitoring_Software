{
    "vendor": "TEKO",
    "product": "SM-I0",
    "version": "1.0.1",
    "buses": [{
        "name": "modbus_internal",
        "type": "modbus",
        "system_dev": "/dev/ttyS2",
        "baudrate": 9600,
        "stopbits": 1,
        "delay": 0
    }, {
        "name": "modbus_external",
        "type": "modbus",
        "system_dev": "/dev/ttyS1",
        "baudrate": 9600,
        "stopbits": 1,
        "delay": 1000
    }],
    "input": {
        "values": [{
            "description": "Слово состояния",
            "name": "mb_state",
            "sql_type": "INTEGER",
            "addr": 127,
            "reg": 0,
            "oid": ".1.3.6.1.4.1.47480.1.1",
            "type": "modbus",
            "bus": "modbus_internal",
            "intervals": {
                "min": 0,
                "max": 65535
            }
        }, {
            "description": "Температура 1",
            "name": "mb_t1",
            "sql_type": "FLOAT",
            "addr": 127,
            "reg": 1,
            "convert": "function(x,i){return (((x[i]<<16)>>0)>>16)/10;}",
            "oid": ".1.3.6.1.4.1.47480.1.2",
            "type": "modbus",
            "bus": "modbus_internal",
            "intervals": {
                "min": 10,
                "max": 100
            }
        }, {
            "description": "Температура 2",
            "name": "mb_t2",
            "sql_type": "FLOAT",
            "addr": 127,
            "reg": 2,
            "convert": "function(x,i){return (((x[i]<<16)>>0)>>16)/10;}",
            "oid": ".1.3.6.1.4.1.47480.1.3",
            "type": "modbus",
            "bus": "modbus_internal",
            "intervals": {
                "min": 100,
                "max": 2000
            }
        }, {
            "description": "Температура 3",
            "name": "mb_t3",
            "sql_type": "FLOAT",
            "addr": 127,
            "reg": 3,
            "convert": "function(x,i){return (((x[i]<<16)>>0)>>16)/10;}",
            "oid": ".1.3.6.1.4.1.47480.1.4",
            "type": "modbus",
            "bus": "modbus_internal",
            "intervals": {
                "min": 100,
                "max": 2000
            }
        }, {
            "description": "Температура 4",
            "name": "mb_t4",
            "sql_type": "FLOAT",
            "addr": 127,
            "reg": 4,
            "convert": "function(x,i){return (((x[i]<<16)>>0)>>16)/10;}",
            "oid": ".1.3.6.1.4.1.47480.1.5",
            "type": "modbus",
            "bus": "modbus_internal",
            "intervals": {
                "min": 100,
                "max": 2000
            }
        }, {
            "description": "Дискретные входы",
            "name": "mb_digital_inputs_value",
            "sql_type": "INTEGER",
            "addr": 127,
            "reg": 5,
            "oid": ".1.3.6.1.4.1.47480.1.6",
            "type": "modbus",
            "bus": "modbus_internal",
            "intervals": {
                "min": 0,
                "max": 65535
            }
        }, {
            "description": "Входы сухих контактов",
            "name": "mb_dry_contact_value",
            "sql_type": "INTEGER",
            "addr": 127,
            "reg": 6,
            "oid": ".1.3.6.1.4.1.47480.1.7",
            "type": "modbus",
            "bus": "modbus_internal",
            "intervals": {
                "min": 0,
                "max": 65535
            }
        }, {
            "description": "Состояние кондиционера",
            "name": "conditioner_state",
            "sql_type": "INTEGER",
            "addr": 1,
            "reg": 0,
            "oid": ".1.3.6.1.4.1.47480.3.1",
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 0,
                "max": 65535
            }
        }, {
            "description": "Аварии кондиционера",
            "name": "conditioner_fails",
            "sql_type": "INTEGER",
            "addr": 1,
            "reg": 1,
            "oid": ".1.3.6.1.4.1.47480.3.2",
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 0,
                "max": 65535
            }
        }, {
            "description": "Температура t3 кондиционера",
            "name": "conditioner_t3_temp",
            "sql_type": "INTEGER",
            "addr": 1,
            "reg": 2,
            "oid": ".1.3.6.1.4.1.47480.3.3",
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 0,
                "max": 65535
            }
        }, {
            "description": "Температура t1 кондиционера",
            "name": "conditioner_t1_temp",
            "sql_type": "INTEGER",
            "addr": 1,
            "reg": 3,
            "oid": ".1.3.6.1.4.1.47480.3.4",
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 0,
                "max": 65535
            }
        }, {
            "description": "Температура t7 кондиционера",
            "name": "conditioner_t7_temp",
            "sql_type": "INTEGER",
            "addr": 1,
            "reg": 4,
            "oid": ".1.3.6.1.4.1.47480.3.5",
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 0,
                "max": 65535
            }
        }, {
            "description": "Температура t8 кондиционера",
            "name": "conditioner_t8_temp",
            "sql_type": "INTEGER",
            "addr": 1,
            "reg": 5,
            "oid": ".1.3.6.1.4.1.47480.3.6",
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 0,
                "max": 65535
            }
        }, {
            "description": "Температура t4 кондиционера",
            "name": "conditioner_t4_temp",
            "sql_type": "INTEGER",
            "addr": 1,
            "reg": 6,
            "oid": ".1.3.6.1.4.1.47480.3.7",
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 0,
                "max": 65535
            }
        }, {
            "description": "Температура t6 кондиционера",
            "name": "conditioner_t6_temp",
            "sql_type": "INTEGER",
            "addr": 1,
            "reg": 7,
            "oid": ".1.3.6.1.4.1.47480.3.8",
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 0,
                "max": 65535
            }
        }, {
            "description": "Температура t5 кондиционера",
            "name": "conditioner_t5_temp",
            "sql_type": "INTEGER",
            "addr": 1,
            "reg": 8,
            "oid": ".1.3.6.1.4.1.47480.3.9",
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 0,
                "max": 65535
            }
        }, {
            "description": "Температура t2 кондиционера",
            "name": "conditioner_t2_temp",
            "sql_type": "INTEGER",
            "addr": 1,
            "reg": 9,
            "oid": ".1.3.6.1.4.1.47480.3.10",
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 0,
                "max": 65535
            }
        }],
        "script": "function(){}"
    },
    "output": {
        "values": [{
            "description": "Выхода сигнальных сухих контактов SDCO",
            "name": "mb_dry_contact_output_value",
            "addr": 127,
            "reg": 22,
            "oid": ".1.3.6.1.4.1.47480.2.1",
            "default": 0,
            "type": "modbus",
            "bus": "modbus_internal",
            "intervals": {
                "min": 0,
                "max": 65535
            }
        }, {
            "description": "Выхода силовых сухих контактов PDCO",
            "name": "mb_power_contact_output_value",
            "addr": 127,
            "reg": 23,
            "oid": ".1.3.6.1.4.1.47480.2.2",
            "default": 0,
            "type": "modbus",
            "bus": "modbus_internal",
            "intervals": {
                "min": 0,
                "max": 65535
            }
        }]
    }
}