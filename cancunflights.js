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
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "Toronto",
    originDescription: "newYorkCity",

};
var CUNtoYYC = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CUN.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "YYZ.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "newYorkCity",
    originDescription: "Toronto",

};
var YULtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "/m/0rh6k.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "/m/0h7h6.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "Toronto",
    originDescription: "washingtonDC",

};
var CUNtoYUL = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "/m/0h7h6.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "/m/0rh6k.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "washingtonDC",
    originDescription: "Toronto",

};
var YVRtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "PHL.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "/m/0h7h6.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "Toronto",
    originDescription: "Philadelphia",

};
var CUNtoYVR = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "/m/0h7h6.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "PHL.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "Philadelphia",
    originDescription: "Toronto",

};
var ORDtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "/m/01_d4.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "/m/0h7h6.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "Toronto",
    originDescription: "Chicago",

};
var CUNtoORD = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "/m/0h7h6.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "/m/01_d4.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "Chicago",
    originDescription: "Toronto",

};
var PHLtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "ATL.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "/m/0h7h6.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "Toronto",
    originDescription: "Atlanta",

};
var CUNtoPHL = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "/m/0h7h6.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "ATL.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "Atlanta",
    originDescription: "Toronto",

};
var JFKtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CLT.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "/m/0h7h6.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "Toronto",
    originDescription: "Charlotte",

};
var CUNtoJFK = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "/m/0h7h6.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CLT.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "Charlotte",
    originDescription: "Toronto",

};
var MSPtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "/m/02_286.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "/m/0h7h6.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "Toronto",
    originDescription: "newYorkCity",

};
var CUNtoMSP = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "/m/0h7h6.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "/m/02_286.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "newYorkCity",
    originDescription: "Toronto",

};
var CLEtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "/m/0rh6k.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "/m/0h7h6.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "Toronto",
    originDescription: "washingtonDC",

};
var CUNtoCLE = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "/m/0h7h6.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "/m/0rh6k.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "washingtonDC",
    originDescription: "Toronto",

};
var DIAtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "PHL.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "/m/0h7h6.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "Toronto",
    originDescription: "Philadelphia",

};
var CUNtoDIA = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "/m/0h7h6.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "PHL.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "Philadelphia",
    originDescription: "Toronto",

};
var EWRtoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "/m/01_d4.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "/m/0h7h6.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "Toronto",
    originDescription: "Chicago",

};
var CUNtoEWR = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "/m/0h7h6.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "/m/01_d4.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "Chicago",
    originDescription: "Toronto",

};
var BOStoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "ATL.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "/m/0h7h6.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "Toronto",
    originDescription: "Atlanta",

};
var CUNtoBOS = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "/m/0h7h6.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "ATL.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "Atlanta",
    originDescription: "Toronto",

};
var BWItoCUN = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "CLT.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "/m/0h7h6.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "Toronto",
    originDescription: "Charlotte",

};
var CUNtoBWI = {
    root: "https://www.google.com/flights?hl=en#flt=",
    origin: "/m/0h7h6.", // montreal is /m/052p7 , new york is /m/02_286, toronto is /m/0h7h6
    destination: "CLT.", // montreal is /m/052p7. , new york is /m/02_286. , toronto is /m/0h7h6.
    queryDate: `${yyyy}-${mm}-${dd}`, //YYYY-MM-DD
    oneCarryOnBagAndCurrency: ";b:1;c:USD", // CAD is ;c:CAD , USD is ;c:USD
    fareClass: ";e:1;sc:b;so:1;sd:1;t:f;tt:o", // economy is ";e:1;so:1;sd:1;t:f;tt:o" , business is ";e:1;sc:b;so:1;sd:1;t:f;tt:o"
    fareClassDescription: "business",
    destinationDescription: "Charlotte",
    originDescription: "Toronto",

};





//Orlando starts here
  var allDestinations = [YYZtoCUN];
//  var allDestinations = [CUNtoYYC];
//  var allDestinations = [YULtoCUN];
//  var allDestinations = [CUNtoYUL];
//  var allDestinations = [YVRtoCUN];
//  var allDestinations = [CUNtoYVR];
//  var allDestinations = [ORDtoCUN];
//  var allDestinations = [CUNtoORD];
//  var allDestinations = [PHLtoCUN];
//  var allDestinations = [CUNtoPHL];
//  var allDestinations = [JFKtoCUN];
//  var allDestinations = [CUNtoJFK];
//  var allDestinations = [MSPtoCUN];
//  var allDestinations = [CUNtoMSP];
//  var allDestinations = [CLEtoCUN];
//  var allDestinations = [CUNtoCLE];
//  var allDestinations = [DIAtoCUN];
//  var allDestinations = [CUNtoDIA];
//  var allDestinations = [EWRtoCUN];
//  var allDestinations = [CUNtoEWR];
//  var allDestinations = [BOStoCUN];
//  var allDestinations = [CUNtoBOS];
//  var allDestinations = [BWItoCUN];
//  var allDestinations = [CUNtoBWI];


var allDatesAndDestinations = [];
var readyToTriggerPuppteer = 0;


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
            readyToTriggerPuppteer++;



            //if (readyToTriggerPuppteer === 16) {
                getFlights();
            //}

        }

    }
}



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

            var allFlights = await page.$$("ol.VKb8lb.H4aYKc > li");
            console.log("allFlights: ", allFlights.length);
             //const flightName = await allFlights[0].$eval("span", span => span.textContent);

            // this will provide the flight logo
            // var flightAirlineLogo = await page.$('.x8klId > img', element => element.getAttribute('src'));
            var flightAirlineLogo = await allFlights[0].$eval('.x8klId > img', element => element.src);
            
            // this gives me the specific price
            var price = await allFlights[0].$eval(".YMlIz.FpEdX.jLMuyc > span", element => element.innerHTML); 
            
            var splitterA = price.split('$');
            var currency = splitterA[0].trim();
            var flightPrice = splitterA[1].trim();
            
            // this gives me the Departure Airport
            var originAirport = await allFlights[0].$eval(
                ".G2WY5c.sSHqwe.ogfYpf.tPgKwe",
                element => element.textContent
            );
            // this gives me the Destination Airport 
            var departureAirport = await allFlights[0].$eval(
                ".c8rWCd.sSHqwe.ogfYpf.tPgKwe",
                element => element.textContent
            );
            // console.log("FlightAirports: ", originAirport, " ---> ", departureAirport);
            // this gives me the origin travel time
            var originFlightTime = await allFlights[0].$eval(
                ".wtdjmc.YMlIz.ogfYpf.tPgKwe",
                element => element.textContent
            );
            // this will give me the destination travel time
            var destinationFlightTime = await allFlights[0].$eval(
                ".XWcVob.YMlIz.ogfYpf.tPgKwe",
                element => element.textContent
            );
            // this gives me the airlines
            var flightAirlines = await allFlights[0].$eval(
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
                flightAirlineLogo,
                flightAirlines,
                flightPrice,
                originFlightTime,
                destinationFlightTime,
                originAirport,
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
    return true;
}