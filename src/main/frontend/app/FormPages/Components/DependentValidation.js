import {checkPhoneNumber} from '../Utilities/validation';
import {checkEmail} from '../Utilities/validation';
import {fieldIsEmpty} from '../Utilities/validation';

function feedback(data) {
    var errors = {};
    if (!(checkPhoneNumber(data.phone))) {
        errors.phone = "Dette er ikke et gyldig telefonnummer";
    }
    if (!(checkEmail(data.mail))) {
        errors.mail = "Dette er ikke en gyldig epostadresse";
    }
    if ((fieldIsEmpty(data.name)) || data.name.replace(" ", "").length<=2) {
        errors.name = "Dette er ikke et gyldig navn";
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