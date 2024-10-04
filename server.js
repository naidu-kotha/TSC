"use strict";

var edge = require("edge-js");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var about;
var openport;
var sendcommand;
var clearbuffer;
var printerfont;
var printlabel;
var closeport;
var printer_status;
var sendcommand_utf8;
var sendcommand_binary;

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("./"));

app.listen(8888, function () {
  console.log("Server Start!!");
});

app.get("/test_get", function (req, res) {
  console.log("GET Function Test!!");
});

app.post("/", urlencodedParser, function (req, res) {
  printfile();
  res.redirect(req.get("referer"));
});

try {
  openport = edge.func({
    assemblyFile: "tsclibnet.dll",
    typeName: "TSCSDK.node_usb",
    methodName: "openport",
  });
} catch (error) {
  console.log(error);
}

try {
  about = edge.func({
    assemblyFile: "tsclibnet.dll",
    typeName: "TSCSDK.node_usb",
    methodName: "about",
  });
} catch (error) {
  console.log(error);
}

try {
  sendcommand = edge.func({
    assemblyFile: "tsclibnet.dll",
    typeName: "TSCSDK.node_usb",
    methodName: "sendcommand",
  });
} catch (error) {
  console.log(error);
}

try {
  clearbuffer = edge.func({
    assemblyFile: "tsclibnet.dll",
    typeName: "TSCSDK.node_usb",
    methodName: "clearbuffer",
  });
} catch (error) {
  console.log(error);
}

try {
  printlabel = edge.func({
    assemblyFile: "tsclibnet.dll",
    typeName: "TSCSDK.node_usb",
    methodName: "printlabel",
  });
} catch (error) {
  console.log(error);
}

try {
  closeport = edge.func({
    assemblyFile: "tsclibnet.dll",
    typeName: "TSCSDK.node_usb",
    methodName: "closeport",
  });
} catch (error) {
  console.log(error);
}

try {
  printerfont = edge.func({
    assemblyFile: "tsclibnet.dll",
    typeName: "TSCSDK.node_usb",
    methodName: "printerfont",
  });
} catch (error) {
  console.log(error);
}

try {
  printer_status = edge.func({
    assemblyFile: "tsclibnet.dll",
    typeName: "TSCSDK.node_usb",
    methodName: "printerstatus_string",
  });
} catch (error) {
  console.log(error);
}

try {
  sendcommand_utf8 = edge.func({
    assemblyFile: "tsclibnet.dll",
    typeName: "TSCSDK.node_usb",
    methodName: "sendcommand_utf8",
  });
} catch (error) {
  console.log(error);
}

try {
  sendcommand_binary = edge.func({
    assemblyFile: "tsclibnet.dll",
    typeName: "TSCSDK.node_usb",
    methodName: "sendcommand_binary",
  });
} catch (error) {
  console.log(error);
}

function getUnit8Array(command) {
  var arr = [];
  for (var i = 0; i < command.length; ++i) arr.push(command.charCodeAt(i));
  return new Uint8Array(arr);
}

var selftest_command = "SELFTEST\r\n";

var selftest_command_buffer = getUnit8Array(selftest_command);

function printfile() {
  var label_variable = { quantity: "1", copy: "1" };
  var mrp_variable = {
    x: "300",
    y: "100",
    fonttype: "1.EFT",
    rotation: "0",
    xmul: "1",
    ymul: "1",
    alignment: "0",
    text: "MRP 200",
  };
  var mfd_variable = {
    x: "300",
    y: "200",
    fonttype: "2.EFT",
    rotation: "0",
    xmul: "1",
    ymul: "1",
    alignment: "0",
    text: "Manufactured by RECYKAL",
  };

  openport("");

  var status = printer_status(100, true);
  console.log("🚀 ~ printfile ~ status:", status);

  clearbuffer("", true);
  sendcommand("SIZE 50mm, 50mm", true);
  sendcommand("GAP 3 mm", true);
  sendcommand("DIRECTION 0", true);
  sendcommand("REFERENCE 0,0", true);
  sendcommand("OFFSET 0 mm", true);
  // sendcommand("SET PEEL OFF", true);
  // sendcommand("SET CUTTER OFF", true);
  // sendcommand("SET PARTIAL_CUTTER OFF", true);
  // sendcommand("SET TEAR ON", true);
  sendcommand("CLS", true);
  // sendcommand("CODEPAGE UTF-8", true);
  // sendcommand("SPEED 18", true);
  const data = { code: "bi.ryl.in/01AVPML7J94ZB" };
  const { code } = data;
  const usi = code.split("/").pop();
  const x = 150;
  const y = 150;
  const module = 4;
  // console.log("🚀 ~ printfile ~ code:", code);
  // sendcommand(`CODE$="${code}"`, true);
  // sendcommand(`TEXT 120,250,"1",270,1,1,"${usi}"`, true);
  sendcommand(`QRCODE 150,230,L,2,A,270,M2,"${code}"`, true);
  sendcommand(
    "BITMAP 218,160,3,96,1,ø ð ðAÁUãÿÿÇÿÿãÿÿçÿÿóÿÿÀà Âà ÝÝÿÿÿÿÇÿÿãÿÿÃÿÿãÿÿðUðÃÀ à ÷]ÿÿÿÿÿÿÿÿÿÀ à ÂàâÿññóùÿÃøãúÃøãøÀ@ðÃÿðÿøÿÿ_ÿÿÿÿüAÿøãÿðAÿàáÿâXâøÄxöûÄxâ8ÿÂxà!ÿðÿøCÿýÿÿÿÿÿÿïþÿÏþÿÿGt ÿÇ]ÿïÿÿÿÿÿÿÿÿüÿú³ÿ÷}ï¾ÿÇÿÿÿÏ~ï¾ÿÇï¾ÿ÷}ûûÿü ÿÿÿÿßÿÿïÿÿÇÿÿÿÿÿ÷ÿÿèªÿÂÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ",
    true
  );
  // sendcommand(`QRCODE ${x},${y},L,${module},A,0,M2,"${code}"`, true);

  // sendcommand("QRCODE 100,100,L,10,A,0,M2,A$", true);
  // const a = sendcommand('OUT GETSETTING$("CONFIG", "TSPL", "RIBBON")', true);
  // console.log("🚀 ~ printfile ~ a:", a);
  // sendcommand("SET COUNTER @0 +1", true);
  // sendcommand('@0= "1"', true);

  // sendcommand('TEXT 200,220,"2",0,1,1,@0', true);

  // sendcommand(`DMATRIX 200,200,400,400,x4,18,18, "${code}"`, true);
  // sendcommand(`DMATRIX 200,200,400,400, "${code}"`, true);
  printlabel(label_variable, true);

  // if (testPrinter) {
  //   sendcommand_binary(selftest_command_buffer, true);
  // }

  closeport("", true);
}
