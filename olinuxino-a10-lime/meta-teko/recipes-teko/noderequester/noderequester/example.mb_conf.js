{
    "vendor": "TEKO",
    "product": "MB",
    "version": "0.01",
    "poll_interval": 100,
    "input": {
        "values": [
            {
                "description": "Температура",
                "name": "mb_temperature",
                "addr": 127, 
                "reg": 1,
                "intervals": {
                    "min": 10,
                    "max": 100
                }
            },
            {
                "description": "T2",
                "name": "mb_humidity",
                "addr": 127,
                "reg": 2,
		"convert":"function(x){return (((x<<16)>>0)>>16)/10;}",
		"intervals": {
                    "min": 100,
                    "max": 2000
                }
            }
        ],
        "script": "function(){}"
    }
}
