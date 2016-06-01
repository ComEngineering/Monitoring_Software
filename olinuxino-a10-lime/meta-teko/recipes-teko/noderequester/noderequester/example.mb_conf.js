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
        }, {
            "description": "Задание внутренней температуры",
            "name": "conditioner_int_temp_ref",
            "addr": 1,
            "reg": 20,
            "oid": ".1.3.6.1.4.1.47480.4.1",
            "default": 30,
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 10,
                "max": 40
            }
        }, {
            "description": "DT вкл/выкл компрессора",
            "name": "conditioner_dt_comp",
            "addr": 1,
            "reg": 21,
            "oid": ".1.3.6.1.4.1.47480.4.2",
            "default": 5,
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 5,
                "max": 20
            }
        }, {
            "description": "Задание температуры ta1",
            "name": "conditioner_ta1_ref",
            "addr": 1,
            "reg": 22,
            "oid": ".1.3.6.1.4.1.47480.4.3",
            "default": 31,
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 20,
                "max": 90
            }
        }, {
            "description": "Задание аварийно-высокой температуры в шкафу",
            "name": "conditioner_fail_t_ref",
            "addr": 1,
            "reg": 23,
            "oid": ".1.3.6.1.4.1.47480.4.4",
            "default": 40,
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 20,
                "max": 90
            }
        }, {
            "description": "Задание температуры th1",
            "name": "conditioner_th1_ref",
            "addr": 1,
            "reg": 24,
            "oid": ".1.3.6.1.4.1.47480.4.5",
            "default": 18,
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 5,
                "max": 30
            }
        }, {
            "description": "Задание аварийно-низкой температуры в шкафу th2",
            "name": "conditioner_th2_ref",
            "addr": 1,
            "reg": 25,
            "oid": ".1.3.6.1.4.1.47480.4.6",
            "default": 7,
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 5,
                "max": 30
            }
        }, {
            "description": "Задание аварийной температуры хладагента t7",
            "name": "conditioner_t7_ref",
            "addr": 1,
            "reg": 28,
            "oid": ".1.3.6.1.4.1.47480.4.7",
            "default": 60,
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 30,
                "max": 90
            }
        }, {
            "description": "DT аварийной температуры хладагента",
            "name": "conditioner_dt_hlad_ref",
            "addr": 1,
            "reg": 29,
            "oid": ".1.3.6.1.4.1.47480.4.8",
            "default": 5,
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 5,
                "max": 30
            }
        }, {
            "description": "Задание температуры для зоны + конденсатора",
            "name": "conditioner_p_ref",
            "addr": 1,
            "reg": 30,
            "oid": ".1.3.6.1.4.1.47480.4.9",
            "default": 30,
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 30,
                "max": 50
            }
        }, {
            "description": "Задание температуры для зоны ++ конденсатора",
            "name": "conditioner_pp_ref",
            "addr": 1,
            "reg": 31,
            "oid": ".1.3.6.1.4.1.47480.4.10",
            "default": 32,
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 30,
                "max": 50
            }
        }, {
            "description": "Задание температуры для зоны - конденсатора",
            "name": "conditioner_m_ref",
            "addr": 1,
            "reg": 32,
            "oid": ".1.3.6.1.4.1.47480.4.11",
            "default": 25,
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 20,
                "max": 50
            }
        }, {
            "description": "Задание температуры для зоны -- конденсатора",
            "name": "conditioner_mm_ref",
            "addr": 1,
            "reg": 33,
            "oid": ".1.3.6.1.4.1.47480.4.12",
            "default": 23,
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 15,
                "max": 50
            }
        }, {
            "description": "Задание интервала времени для зоны + конденсатора",
            "name": "conditioner_p_cond_ref",
            "addr": 1,
            "reg": 34,
            "oid": ".1.3.6.1.4.1.47480.4.13",
            "default": 15,
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 1,
                "max": 300
            }
        }, {
            "description": "Задание интервала времени для зоны ++ конденсатора",
            "name": "conditioner_pp_cond_ref",
            "addr": 1,
            "reg": 35,
            "oid": ".1.3.6.1.4.1.47480.4.14",
            "default": 5,
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 1,
                "max": 300
            }
        }, {
            "description": "Задание интервала времени для зоны - конденсатора",
            "name": "conditioner_m_cond_ref",
            "addr": 1,
            "reg": 36,
            "oid": ".1.3.6.1.4.1.47480.4.15",
            "default": 130,
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 1,
                "max": 300
            }
        }, {
            "description": "Задание температуры для включения фрикулига",
            "name": "conditioner_freecool_ref",
            "addr": 1,
            "reg": 37,
            "oid": ".1.3.6.1.4.1.47480.4.16",
            "default": 15,
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 0,
                "max": 50
            }
        }, {
            "description": "Задание скорости вентилятора конденсатора",
            "name": "conditioner_fan_speed_ref",
            "addr": 1,
            "reg": 44,
            "oid": ".1.3.6.1.4.1.47480.4.17",
            "default": 0,
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 0,
                "max": 100
            }
        }, {
            "description": "Задание скорости вентилятора испарителя",
            "name": "conditioner_fan2_speed_ref",
            "addr": 1,
            "reg": 45,
            "oid": ".1.3.6.1.4.1.47480.4.18",
            "default": 0,
            "type": "modbus",
            "bus": "modbus_external",
            "intervals": {
                "min": 0,
                "max": 100
            }
        }]
    }
}
