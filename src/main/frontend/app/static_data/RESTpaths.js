/**
 * This file contains the API routes used by the service.
 * Make sure to update the BASE_URL variable to 'http://dc16-citizen.demo.difi.no/'
 * before making a pull request.
 */

//var BASE_URL = 'http://dc16-citizen.demo.difi.no/';
var BASE_URL = 'http://localhost:9090/';

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
 