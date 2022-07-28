//1. It's checking the first byte of the payload to see if it's 0x4c. If it is, then it's a periodic data frame.
//2. It's checking the second byte of the payload to see if bit 1 is set. If it is, then it's a low battery alarm.
//3. It's converting bytes 3 and 4 into a 1
function decodeUplink(input) {
	var data = {}, low_bat, temperature, humidity;
	if (input.bytes[0] == 0x4c) {				// Periodic data frame?
// First test battery status from Status byte[1]. If bit 1 = 1 -> Set Low Battery alarm
		low_bat = Boolean(input.bytes[1] & 0x02);
		temperature = (input.bytes[2] << 8 | input.bytes[3]);
		if (input.bytes[2] & 0x80) {			// Negative number?
			temperature |= 0xFFFF0000;	//Fill up to 32 bits with '1'
		}
		humidity = input.bytes[4];
		data.low_bat = low_bat;
		data.temperature = (temperature/10).toFixed(1);
		data.humidity = humidity;
	}
return {data:data};
}