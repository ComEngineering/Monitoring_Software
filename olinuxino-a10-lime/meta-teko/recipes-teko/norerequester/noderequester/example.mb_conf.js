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
                "addr": 1,
                "reg": 0,
                "intervals": {
                    "min": 10,
                    "max": 100
                }
            },
            {
                "description": "Влажность",
                "name": "mb_humidity",
                "addr": 2,
                "reg": 0,
                "intervals": {
                    "min": 100,
                    "max": 2000
                }
            }
        ],
        "script": "function(){}"
    }
}