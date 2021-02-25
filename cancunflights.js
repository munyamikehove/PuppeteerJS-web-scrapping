/*jshint esversion: 8 */
const admin = require("firebase-admin");
const puppeteer = require('puppeteer');
const moment = require("moment");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://zerojet-85661.firebaseio.com"
});

var db = admin.database();

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

//Routes to CUN
var YYZtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "YYZ.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Toronto",

};
var CUNtoYYZ = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "YYZ.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Toronto",
    originDescription: "Cancun",

};
var YULtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "YUL.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Montreal",

};
var CUNtoYUL = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "YUL.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Montreal",
    originDescription: "Cancun",

};
var YVRtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "YVR.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Vancouver",

};
var CUNtoYVR = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "YVR.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Vancouver",
    originDescription: "Cancun",

};
var ORDtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "ORD.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Chicago",

};
var CUNtoORD = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "ORD.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Chicago",
    originDescription: "Cancun",

};
var PHLtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "PHL.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Philadelphia",

};
var CUNtoPHL = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "PHL.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Philadelphia",
    originDescription: "Cancun",

};
var JFKtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "JFK.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "New York City",

};
var CUNtoJFK = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "JFK.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "New York City",
    originDescription: "Cancun",

};
var MSPtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "MSP.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Minneapolis",

};
var CUNtoMSP = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "MSP.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economyv",
    destinationDescription: "Minneapolis",
    originDescription: "Cancun",

};
var CLEtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CLE.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Cleveland",

};
var CUNtoCLE = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CLE.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cleveland",
    originDescription: "Cancun",

};
var DENtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "DEN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Denver",

};
var CUNtoDEN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "DEN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Denver",
    originDescription: "Cancun",

};
var EWRtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "EWR.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Newark",

};
var CUNtoEWR = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "EWR.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Newark",
    originDescription: "Cancun",

};
var BOStoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "BOS.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Boston",

};
var CUNtoBOS = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "BOS.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Boston",
    originDescription: "Cancun",

};
var BWItoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "BWI.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Baltimore",

};
var CUNtoBWI = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "BWI.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Baltimore",
    originDescription: "Cancun",

};
var ATLtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "ATL.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Atlanta",

};
var CUNtoATL = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "ATL.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Atlanta",
    originDescription: "Cancun",

};
var DFWtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "DFW.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Dallas",

};
var CUNtoDFW = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "DFW.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Dallas",
    originDescription: "Cancun",

};
var YYCtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "YYC.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Calgary",

};
var CUNtoYYC = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "YYC.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Calgary",
    originDescription: "Cancun",

};
var SEAtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "SEA.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Seattle",

};
var CUNtoSEA = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "SEA.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Seattle",
    originDescription: "Cancun",

};
var DTWtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "DTW.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Detroit",

};
var CUNtoDTW = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "DTW.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Detroit",
    originDescription: "Cancun",

};
var FATtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "FAT.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Fresno",

};
var CUNtoFAT = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "FAT.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Fresno",
    originDescription: "Cancun",

};
var IAHtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "IAH.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Houston",

};
var CUNtoIAH = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "IAH.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Houston",
    originDescription: "Cancun",

};
var LAStoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "LAS.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Las Vegas",

};
var CUNtoLAS = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "LAS.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Las Vegas",
    originDescription: "Cancun",

};
var MIAtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "MIA.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Miami",

};
var CUNtoMIA = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "MIA.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Miami",
    originDescription: "Cancun",

};
var MCOtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "MCO.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Orlando",

};
var CUNtoMCO = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "MCO.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Orlando",
    originDescription: "Cancun",

};
var SMFtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "SMF.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Sacramento",

};
var CUNtoSMF = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "SMF.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Sacramento",
    originDescription: "Cancun",

};
var SLCtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "SLC.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Salt Lake City",

};
var CUNtoSLC = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "SLC.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Salt Lake City",
    originDescription: "Cancun",

};
var SATtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "SAT.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "San Antonio",

};
var CUNtoSAT = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "SAT.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "San Antonio",
    originDescription: "Cancun",

};
var SFOtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "SFO.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "San Francisco",

};
var CUNtoSFO = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "SFO.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "San Francisco",
    originDescription: "Cancun",

};
var AUStoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "AUS.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CUN.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Cancun",
    originDescription: "Austin",

};
var CUNtoAUS = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "AUS.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "economy",
    destinationDescription: "Austin",
    originDescription: "Cancun",

};





//Orlando starts here
var allDestinations = [];



var allDatesAndDestinations = [];
var readyToTriggerPuppteer = 0;


var loop = {
    mainLoop: function (city) {

        allDestinations = [];
        allDestinations = [city];
        allDatesAndDestinations = [];

        for (var index in allDestinations) {


            queryOptions = allDestinations[index];

            // Control the number of days to gather information for.
            var numberOfDays = 93;

            for (var currentDay = 0; currentDay < numberOfDays; currentDay++) {

                var newDate = moment()
                    .add(currentDay, "days")
                    .format("YYYY-MM-DD");

                var newDay = moment()
                    .add(currentDay, "days")
                    .format("DD");

                var newYear = moment()
                    .add(currentDay, "days")
                    .format("YYYY");

                var newMonth = moment()
                    .add(currentDay, "days")
                    .format("MM");

                var a = allDestinations[index].root;
                var b = allDestinations[index].origin;
                var c = allDestinations[index].destination;
                var d = newDate;
                var e = allDestinations[index].oneCarryOnBagAndCurrency;
                var f = allDestinations[index].fareClass;
                var g = allDestinations[index].fareClassDescription;
                var h = allDestinations[index].destinationDescription;
                var i = allDestinations[index].originDescription;
                var j = newDay;
                var k = newMonth;
                var l = newYear;


                allDatesAndDestinations.push({
                    root: a,
                    origin: b, // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
                    destination: c, // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
                    queryDate: d, //YYYY-MM-DD
                    oneCarryOnBagAndCurrency: e, // CAD is ;c:CAD , USD is ;c:USD
                    fareClass: f, // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
                    fareClassDescription: g,
                    destinationDescription: h,
                    originDescription: i,
                    dBDay: j,
                    dBMonth: k,
                    dBYear: l,
                });


                if ((currentDay + 1) === numberOfDays) {
                    //readyToTriggerPuppteer++;



                    //if (readyToTriggerPuppteer === 16) {
                    getFlights();
                    //}

                }

            }
        }


    }
}

//Start function with this call
loop.mainLoop(YYZtoCUN)




async function getFlights() {
    /* eslint-disable no-await-in-loop */
    for (var index in allDatesAndDestinations) {

        var fareClassDescription = allDatesAndDestinations[index].fareClassDescription;
        var destinationDescription = allDatesAndDestinations[index].destinationDescription;
        var originDescription = allDatesAndDestinations[index].originDescription;
        var qryDt = allDatesAndDestinations[index].queryDate;
        var dBYear = allDatesAndDestinations[index].dBYear;
        var dBMonth = allDatesAndDestinations[index].dBMonth
        var dBDay = allDatesAndDestinations[index].dBDay;

        try {


            var browser = await puppeteer.launch({
                headless: true,
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
            });

            var page = await browser.newPage();

            page.setUserAgent(
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
            );


            var url = allDatesAndDestinations[index].root + allDatesAndDestinations[index].origin + allDatesAndDestinations[index].destination + allDatesAndDestinations[index].queryDate + allDatesAndDestinations[index].oneCarryOnBagAndCurrency + allDatesAndDestinations[index].fareClass;

            console.log(url);

            await page.goto(url, {
                waitUntil: "networkidle0",
            });

            var allFlights = await page.$$("div.VKb8lb.H4aYKc > div");
            console.log("allFlights: ", allFlights.length);




            const flightName = await allFlights[0].$eval("span", span => span.textContent);

            // this will provide the flight logo
            // var flightAirlineLogo = await page.$('.x8klId > img', element => element.getAttribute('src'));
            var AirlineLogo = await allFlights[0].$eval('.x8klId > img', element => element.src);

            // this gives me the specific price
            var price = await allFlights[0].$eval(".YMlIz.FpEdX.jLMuyc > span", element => element.innerHTML);

            var splitterA = price.split('$');
            var currency = splitterA[0].trim();
            var flightPrice = splitterA[1].trim();

            // this gives me the Departure Airport
            var departureAirport = await allFlights[0].$eval(
                ".G2WY5c.sSHqwe.ogfYpf.tPgKwe",
                element => element.textContent
            );
            // this gives me the Destination Airport 
            var arrivalAirport = await allFlights[0].$eval(
                ".c8rWCd.sSHqwe.ogfYpf.tPgKwe",
                element => element.textContent
            );
            // console.log("FlightAirports: ", originAirport, " ---> ", departureAirport);
            // this gives me the origin travel time
            var departureTime = await allFlights[0].$eval(
                ".wtdjmc.YMlIz.ogfYpf.tPgKwe",
                element => element.textContent
            );
            // this will give me the destination travel time
            var arrivalTime = await allFlights[0].$eval(
                ".XWcVob.YMlIz.ogfYpf.tPgKwe",
                element => element.textContent
            );
            // this gives me the airlines
            var Airline = await allFlights[0].$eval(
                ".TQqf0e.sSHqwe.tPgKwe.ogfYpf > span",
                element => element.textContent
            );
            // this gives me the Stops
            var flightStops = await allFlights[0].$eval(
                ".pIgMWd.ogfYpf",
                element => element.textContent
            );
            // this gives me the flight duration hours
            var flightStopDuration = await allFlights[0].$eval(
                ".nQgyaf.sSHqwe.tPgKwe.ogfYpf",
                element => element.innerText
            );

            // Trim the word for flight duration
            var duration = flightStopDuration.substring(0, flightStopDuration.indexOf("min")).concat("min");

            var flightStopDurationInfo = flightStops ? duration : ""

            var dayOfScheduledFlight = await (allDatesAndDestinations[index].queryDate);

            var flightResults = {
                AirlineLogo,
                Airline,
                flightPrice,
                departureTime,
                arrivalTime,
                arrivalAirport,
                departureAirport,
                flightStops,
                flightStopDurationInfo,
                dayOfScheduledFlight,
                fareClassDescription,
                destinationDescription,
                originDescription,
                currency,
            };

            flightResultsRef = db.ref(`flightResultsRef/${originDescription}/${destinationDescription}/${fareClassDescription}/${dBYear}/${dBMonth}/${dBDay}/`);
            flightResultsRef.update({
                flightResults
            });




            console.log(flightResults);
            console.log('\n\n\n');



            await browser.close();


        } catch (errorMsg) {
            console.log("queryErrorIs", errorMsg);
        }
    }
    /* eslint-enable no-await-in-loop */

    console.log('Finished!');
    readyToTriggerPuppteer++
    //loop through all destinations
    switch (readyToTriggerPuppteer) {
        case 0:
            return loop.mainLoop(YYZtoCUN);
        case 1:
            return loop.mainLoop(CUNtoYYZ);
        case 2:
            return loop.mainLoop(YULtoCUN);
        case 3:
            return loop.mainLoop(CUNtoYUL);
        case 4:
            return loop.mainLoop(YVRtoCUN);
        case 5:
            return loop.mainLoop(CUNtoYVR);
        case 6:
            return loop.mainLoop(ORDtoCUN);
        case 7:
            return loop.mainLoop(CUNtoORD);
        case 8:
            return loop.mainLoop(PHLtoCUN);
        case 9:
            return loop.mainLoop(CUNtoPHL);
        case 10:
            return loop.mainLoop(JFKtoCUN);
        case 11:
            return loop.mainLoop(CUNtoJFK);
        case 12:
            return loop.mainLoop(MSPtoCUN);
        case 13:
            return loop.mainLoop(CUNtoMSP);
        case 14:
            return loop.mainLoop(CLEtoCUN);
        case 15:
            return loop.mainLoop(CUNtoCLE);
        case 16:
            return loop.mainLoop(DENtoCUN);
        case 17:
            return loop.mainLoop(CUNtoDEN);
        case 18:
            return loop.mainLoop(EWRtoCUN);
        case 19:
            return loop.mainLoop(CUNtoEWR);
        case 20:
            return loop.mainLoop(BOStoCUN);
        case 21:
            return loop.mainLoop(CUNtoBOS);
        case 22:
            return loop.mainLoop(BWItoCUN);
        case 23:
            return loop.mainLoop(CUNtoBWI);
        case 24:
            return loop.mainLoop(ATLtoCUN);
        case 25:
            return loop.mainLoop(CUNtoATL);
        case 26:
            return loop.mainLoop(DFWtoCUN);
        case 27:
            return loop.mainLoop(CUNtoDFW);
        case 28:
            return loop.mainLoop(YYCtoCUN);
        case 29:
            return loop.mainLoop(CUNtoYYC);
        case 30:
            return loop.mainLoop(SEAtoCUN);
        case 31:
            return loop.mainLoop(CUNtoSEA);
        case 32:
            return loop.mainLoop(DTWtoCUN);
        case 33:
            return loop.mainLoop(CUNtoDTW);
        case 34:
            return loop.mainLoop(FATtoCUN);
        case 35:
            return loop.mainLoop(CUNtoFAT);
        case 36:
            return loop.mainLoop(IAHtoCUN);
        case 37:
            return loop.mainLoop(CUNtoIAH);
        case 38:
            return loop.mainLoop(LAStoCUN);
        case 39:
            return loop.mainLoop(CUNtoLAS);
        case 40:
            return loop.mainLoop(MIAtoCUN);
        case 41:
            return loop.mainLoop(CUNtoMIA);
        case 42:
            return loop.mainLoop(MCOtoCUN);
        case 43:
            return loop.mainLoop(CUNtoMCO);
        case 44:
            return loop.mainLoop(SMFtoCUN);
        case 45:
            return loop.mainLoop(CUNtoSMF);
        case 46:
            return loop.mainLoop(SLCtoCUN);
        case 47:
            return loop.mainLoop(CUNtoSLC);
        case 48:
            return loop.mainLoop(SATtoCUN);
        case 49:
            return loop.mainLoop(CUNtoSAT);
        case 50:
            return loop.mainLoop(SFOtoCUN);
        case 51:
            return loop.mainLoop(CUNtoSFO);
        case 52:
            return loop.mainLoop(AUStoCUN);
        case 53:
            return loop.mainLoop(CUNtoAUS);
        case 54:
            return loop.mainLoop(CUNtoMCO);
        default:
            return true;
    }
}