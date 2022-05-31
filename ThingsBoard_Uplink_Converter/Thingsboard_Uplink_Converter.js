// It's decoding the payload from hexadecimal to string
// It's parsing the string to JSON
// It's extracting the device name and type from the JSON
// It's extracting the telemetry data from the JSON
// It's returning a JSON object with the device name, type and telemetry data
var data = decodeToJson(payload);
var deviceName = data.end_device_ids.device_id;
var deviceType = data.end_device_ids.application_ids.application_id;
var telemetry = {};
var first1 = deviceName.substring(0,1); // extract the necessary number of char from device name
switch (first1) {                       // prepare the right telemetry
  case "t":                             // therm-a-office-adeunis-comfort2 & therm-b-office-adeunis-comfort2
    telemetry = {temperature: data.uplink_message.decoded_payload.temperature, humidity: data.uplink_message.decoded_payload.humidity, low_bat: data.uplink_message.decoded_payload.low_bat};
  break;
  case "e":                             // ext-therm-fridge-adeunis-temp
    telemetry = {temperature: data.uplink_message.decoded_payload.temperature, low_bat: data.uplink_message.decoded_payload.low_bat};
  break;   
  case "m":                             // modbus-a-adeunis & modbus-b-adeunis
    switch (data.uplink_message.decoded_payload.payload_type) {
      case 1:                           // payload type 1
        telemetry = {vr: data.uplink_message.decoded_payload.vr, vs: data.uplink_message.decoded_payload.vs, vt: data.uplink_message.decoded_payload.vt, p_tot: data.uplink_message.decoded_payload.p_tot};
      break;
      case 2:                           // payload type 2
        telemetry = {e_tot: data.uplink_message.decoded_payload.e_tot};
      break;
    }
  break;
  case "c":                             // contact-a-adeunis-drycontact & contact-b-adeunis-drycontact
    switch (data.uplink_message.decoded_payload.payload_type) {
      case 1:                           // payload 1 count type
        telemetry = {count: data.uplink_message.decoded_payload.count, low_bat: data.uplink_message.decoded_payload.low_bat}
      break;
      case 2:                           // payload 2 time duration type
        telemetry = {duration: data.uplink_message.decoded_payload.duration, low_bat: data.uplink_message.decoded_payload.low_bat}
      break;
    }
  break;
}
var result = {
  deviceName: deviceName,
  deviceType: deviceType,
  telemetry: telemetry
};

function decodeToString(payload) {
  return String.fromCharCode.apply(String, payload);
}

function decodeToJson(payload) {
  var str = decodeToString(payload);
  var data = JSON.parse(str);
  return data;
}

return result;