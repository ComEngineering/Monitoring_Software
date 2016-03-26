{
    "vendor": "TEKO",
    "product": "SM-I0",
    "version": "1.0.1",
    "poll_interval": 100,
    "baudrate": 9600,
    "input": {
        "values": [
            {
                "description": "Слово состояния",
                "name": "mb_state",
                "sql_type": "INTEGER",
                "addr": 127,
                "reg": 0,
                "oid": ".1.3.6.1.4.1.39052.1.1",
                "intervals": {
                    "min": 0,
                    "max": 65535
                }
            },
            {
                "description": "Температура 1",
                "name": "mb_t1",
                "sql_type": "FLOAT",
                "addr": 127, 
                "reg": 1,
                "convert":"function(x){return (((x[0]<<16)>>0)>>16)/10;}",
                "oid": ".1.3.6.1.4.1.39052.1.2",
                "intervals": {
                    "min": 10,
                    "max": 100
                }
            },
            {
                "description": "Температура 2",
                "name": "mb_t2",
                "sql_type": "FLOAT",    
                "addr": 127,
                "reg": 2,
                "convert":"function(x){return (((x[0]<<16)>>0)>>16)/10;}",
                "oid": ".1.3.6.1.4.1.39052.1.3",
                "intervals": {
                    "min": 100,
                    "max": 2000
                }
            },
            {
                "description": "Аналоговый вход ADC1",
                "name": "mb_adc_value_1",
                "sql_type": "INTEGER",                          
                "addr": 127,
                "reg": 3,
                "oid": ".1.3.6.1.4.1.39052.1.4",
                "intervals": {
                    "min": 0,
                    "max": 65535
                }
            },
            {
                "description": "Аналоговый вход ADC2",
                "name": "mb_adc_value_2",
                "sql_type": "INTEGER",                          
                "addr": 127,
                "reg": 4,
                "oid": ".1.3.6.1.4.1.39052.1.5",
                "intervals": {
                    "min": 0,
                    "max": 65535
                }
            },
            {
                "description": "Дискретные входы",
                "name": "mb_digital_inputs_value",
                "sql_type": "INTEGER",
                "addr": 127,
                "reg": 5,
                "oid": ".1.3.6.1.4.1.39052.1.6",
                "intervals": {
                    "min": 0,
                    "max": 65535
                }
            },
            {
                "description": "Входы сухих контактов",
                "name": "mb_dry_contact_value",
                "sql_type": "INTEGER",
                "addr": 127,
                "reg": 6,
                "oid": ".1.3.6.1.4.1.39052.1.7",
                "intervals": {
                    "min": 0,
                    "max": 65535
                }
            }
        ],
        "script": "function(){}"
    },
    "output": {
        "values": [
            {
                "description": "Выхода сигнальных сухих контактов SDCO",
                "name": "mb_dry_contact_output_value",
                "addr": 127,
                "reg": 22,
                "intervals": {
                    "min": 0,
                    "max": 65535
                }
            },
            {
                "description": "Выхода силовых сухих контактов PDCO",
                "name": "mb_power_contact_output_value",
                "addr": 127,
                "reg": 23,
                "intervals": {
                    "min": 0,
                    "max": 65535
                }
            }
        ]
    }
}
