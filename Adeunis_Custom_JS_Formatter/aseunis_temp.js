//1. It defines a function called decodeUplink. This function will be called by the TTN backend when it receives an uplink message from the device.
//2. The function takes one parameter, input, which is a JSON object containing the payload of the uplink message.
//3. The function returns another JSON object containing the decoded data.
//4. The code checks if the first byte of the payload is 0x57 (hexadecimal for 87). If so, it assumes that this is a periodic data frame and extracts the battery status and temperature from the payload.
//5. The battery status is stored in bit 1 of byte 1 of the payload (remember that bytes are numbered starting at 0). If bit 1 is set to 1, then low_bat is set to true; otherwise it's set to false.
function decodeUplink(input) {
	var data = {}, low_bat, temperature, humidity;
	if (input.bytes[0] == 0x57) {				// Periodic data frame?
// First test battery status from Status byte[1]. If bit 1 = 1 -> Set Low Battery alarm
		low_bat = Boolean(input.bytes[1] & 0x02);
		temperature = (input.bytes[4] << 8 | input.bytes[5]); // Read second channel (probe)
		if (input.bytes[4] & 0x80) {			// Negative number?
			temperature |= 0xFFFF0000;	//Fill up to 32 bits with '1'
		}
		data.low_bat = low_bat;
		data.temperature = (temperature/10).toFixed(1);
	}
return {data:data};
}
