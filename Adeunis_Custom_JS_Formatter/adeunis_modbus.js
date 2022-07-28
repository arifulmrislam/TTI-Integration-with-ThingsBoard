function decodeUplink(input) {
	var data = {};
	if (input.bytes[0] == 0x44) {				//Check first byte if valid payload
// Voltage, Power, Energy and Current from Energy Meter
    data.payload_type = 1;

		data.vr = readFloatBE(input.bytes.slice(2,6));
		data.vs = readFloatBE(input.bytes.slice(6,10));
		data.vt = readFloatBE(input.bytes.slice(10,14));
		data.p_tot = ((readFloatBE(input.bytes.slice(14,18)) - readFloatBE(input.bytes.slice(18,22)))/1000).toFixed(2);
		
	}
 	if (input.bytes[0] == 0x5F) {
    data.payload_type = 2;
    
 		data.e_tot = (readFloatBE(input.bytes.slice(2,6)) - readFloatBE(input.bytes.slice(6,10))).toFixed(2);
 	}

	return {data:data};
}

/* ************************ bytes to number **********************************/
    
// JavaScript bitwise operators yield a 32 bits integer, not a float. 
// Assume LSB (least significant byte first). 
    
function readFloatBE(bytes) {
var bits = bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3];
var sign = (bits >>> 31 === 0) ? 1.0 : -1.0;
var e = bits >>> 23 & 0xff;
var m = (e === 0) ? (bits & 0x7fffff) << 1 : (bits & 0x7fffff) | 0x800000;
var f = (sign * m * Math.pow(2, e - 150)).toFixed(1);
return f;							//+ sign is for conversion string to float
}
