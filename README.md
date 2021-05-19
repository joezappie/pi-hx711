# pi-hx711

At the time of creating this module, there was no working version of an HX711 library. All of the modules available where a fork of an old library that used a C binding library and often broke. The goal of this module is to create something more maintainable as it does not rely on NAPI and is just some very basic JS. 

This module does rely on pigpio to interface with the GPIO pins. This requires installing their library through apt-get:

```
sudo apt-get update
sudo apt-get install pigpio
```

I would recommend checking their github for up to date instructions incase you run into any issues. You will need to first install the library before installing the npm module.

https://github.com/fivdi/pigpio#readme

## Interface

This uses a similar interface to the existing C modules:

#### HX711(clockPin, dataPin, options)
 Constructor for HX711 object
 - {number} clockPin - GPIO pin for SCK
 - {number} dataPin - GPIO pin for DT 
 - {number} [options] - options for calibration
 
The options object takes two possible paramters:

```
{
  offset: {number} # Use to calibrate the zero value. Default 0
  scale: {number} # Multiply the value to convert into user units. Default 1
}
```

#### async read(times = 1)
 Reads the value applying both offset and scale
 - {number} times - Number of readings to average together. Defaults to 1
#### async readOffset(times = 1)
 Reads the value with only offset applied (ignores scale)
 - {number} times - Number of readings to average together. Defaults to 1
 
#### async readRaw(times = 1)
 Reads the raw value without applying either offset or scale
 - {number} times - Number of readings to average together. Defaults to 1
 
#### async tare(times = 1)
 Sets the current reading as the offset, effectively zeroing the load cell
 - {number} times - Number of readings to average together. Defaults to 1
 
You can also set the offset and scale programmatically

```
  const loadcell = new HX711(6, 5);
  loadcell.offset = 50000;
  loadcell.scale = 0.00001;
```
 
## Calibration

 - Start with loadcell in a neutral position
 - Use readRaw(10) to get an average reading. Save as your offset
 - Put an object with a known weight on the scale
 - Use readOffset(10) to get an average reading with offset applied.
 - Use the formula:
   
   1 / (readOffset / weight) = scale
 
#### Example:

readOffset() return 50000 using a 0.5lbs object:

 ```
 1 / (50000 / .5) = scale       // scale = 0.00001
 ```
 
 
 ## C Driver Implementation
 
 This library is based off the psuedo code provided in the HX711 manual:
 
 https://www.mouser.com/datasheet/2/813/hx711_english-1022875.pdf

