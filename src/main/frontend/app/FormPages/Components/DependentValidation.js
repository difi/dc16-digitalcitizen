import {checkPhoneNumber} from '../Utilities/validation.js';
import {checkEmail} from '../Utilities/validation.js';
import {fieldIsEmpty} from '../Utilities/validation.js';

function feedback(data) {
    var errors = {};
    if (!(checkPhoneNumber(data.phone))) {
        errors.phone = "et åttesifret telefonnummer, ";
    }
    if (!(checkEmail(data.mail))) {
        errors.mail = "en epostadresse på formatet \"epost-id@domene-navn\", ";
    }
    if (fieldIsEmpty(data.name)) {
        errors.name = "et navn på minst tre bokstaver, ";
    } else if(data.name.replace(" ", "").length<=2){
        errors.name="et navn på minst tre bokstaver, ";
    }

    if (!data.relation) {
        errors.relation = "relasjon, ";
    }
    return errors
}

const DependentValidation = data => {
    var errors = {};

    errors.form1 = feedback(data.form1);
    errors.form2 = feedback(data.form2);
    errors.form3 = feedback(data.form3);

    return errors;
};

export default DependentValidation

//|| data.name.replace(" ", "").length<=2