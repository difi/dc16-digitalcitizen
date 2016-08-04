/**
 * This file contains the API routes used by the service.
 */

var pathArray = location.href.split( '/' );
var protocol = pathArray[0];
var host = pathArray[2];
var BASE_URL = protocol + '//' + host + "/";

exports.PATHS = {
    BRING_BASE: 'https://api.bring.com/shippingguide/api/postalCode.json?clientUrl=insertYourClientUrlHere&',
    DEPENDENT_BASE: BASE_URL + 'api/dependent',
    DOCTORS_BASE: BASE_URL + 'api/doctors',
    GEONAMES_BASE: 'http://api.geonames.org/postalCodeLookupJSON?',
    GETPDF_BASE: BASE_URL + 'getpdf/',
    GUARDIAN_BASE: BASE_URL + 'api/guardians',
    HOME_BASE: BASE_URL + 'api/homes',
    MUNICIPALITY_BASE: BASE_URL + 'api/municipality',
    PERSON_BASE: BASE_URL + 'api/person',
    SUBMIT: BASE_URL + 'send',
    USER_BASE: BASE_URL + 'api/getPNR'
};
 