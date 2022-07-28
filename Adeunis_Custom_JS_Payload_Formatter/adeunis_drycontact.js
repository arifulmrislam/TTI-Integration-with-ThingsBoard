//1. The second line is the function definition. It takes one argument, input, which is an object containing the raw bytes of the uplink message.
//2. The third line creates an empty object called data. This will be returned by the function and will contain the decoded data from the uplink message.
//3. The fourth line creates a variable called low_bat and sets it to false. This will be set to true if the battery status bit in the uplink message indicates that the battery is low.
//4. The fifth line creates a variable called count and sets it to 0. This will be set to the value of the counter in the uplink message if it's a counter payload, or to 0 if it's not a counter payload.

function decodeUplink(input) {
	var data = {}, low_bat, count, duration, payload_type
    if (input.bytes[0] == 0x40) {				// Dry Contact Count payload?
// First test battery status from Status byte[1]. If bit 1 = 1 -> Set Low Battery alarm
        data.low_bat = Boolean(input.bytes[1] & 0x02);
        data.payload_type = 1;
        data.count = (input.bytes[2] << 8 | input.bytes[3]); //convert to UInt 16; //please fix the buggy JavaScript code
//        data.count2 = (input.bytes[4] << 8 | input.bytes[5]); //convert to UInt 16;
//        data.count3 = (input.bytes[6] << 8 | input.bytes[7]); //convert to UInt 16;
//        data.count4 = (input.bytes[8] << 8 | input.bytes[9]); //convert to UInt 16;
    }
    else {
    if (input.bytes[0] == 0x59) {				// Dry Contact Time payload?
// First test battery status from Status byte[1]. If bit 1 = 1 -> Set Low Battery alarm
        data.low_bat = Boolean(input.bytes[1] & 0x02);
        data.payload_type = 2;
        data.duration = (input.bytes[3] << 24 | input.bytes[4] << 16 | input.bytes[5] << 8 | input.bytes[6]);      //convert to UInt 32; //please fix the buggy JavaScript code
//      data.duration2 = (input.bytes[7] << 24 | input.bytes[8] << 16 | input.bytes[9] << 8 | input.bytes[10]);     //convert to UInt 32;
//      data.duration3 = (input.bytes[11] << 24 | input.bytes[12] << 16 | input.bytes[13] << 8 | input.bytes[14]);  //convert to UInt 32;
//      data.duration4 = (input.bytes[15] << 24 | input.bytes[16] << 16 | input.bytes[17] << 8 | input.bytes[18]);  //convert to UInt 32;
    }
    }
    return {data:data};
}
