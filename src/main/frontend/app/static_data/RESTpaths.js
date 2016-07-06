/**
 * Created by camp-shj on 01.07.2016.
 */

//var BASE_URL = 'http://c16-citizen.demo.difi.no/';
var BASE_URL = 'http://localhost:9090/';

exports.PATHS = {
    SUBMIT: BASE_URL + 'send',
    DOCTORS_BASE: BASE_URL + 'api/doctors',
    GETPDF_BASE: BASE_URL + 'getpdf/',
    BRING_BASE: 'https://api.bring.com/shippingguide/api/postalCode.json?clientUrl=insertYourClientUrlHere&',
    GEONAMES_BASE: 'http://api.geonames.org/postalCodeLookupJSON?'
};
 