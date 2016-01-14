{
    "vendor": "TEKO",
    "product": "MB",
    "version": "0.01",
    "poll_interval": 100,
    "input": {
        "values": [
            {
                "description": "Температура 1",
                "name": "mb_t1",
                "sql_type": "FLOAT",
                "addr": 127, 
                "reg": 1,
                "convert":"function(x){return (((x[0]<<16)>>0)>>16)/10;}",
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
                "intervals": {
                    "min": 100,
                    "max": 2000
                }
            }
        ],
        "script": "function(){}"
    }
}
