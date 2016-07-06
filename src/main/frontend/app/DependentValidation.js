/**
 * Created by camp-cha on 05.07.2016.
 */
import {checkPhoneNumber} from './validation';
import {checkEmail} from './validation';

function feedback(data) {
    var errors = {};
    if (!(checkPhoneNumber(data.phone))) {
        errors.phone = "Dette er ikke et gyldig telefonnummer";
    }
    if (!(checkEmail(data.mail))) {
        console.log("Check mail")
        errors.mail = "Dette er ikke en gyldig epostadresse";
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

/*if (!(checkPhoneNumber(values.phone))) {
 console.log("Val");
 errors.phone = "Dette er ikke et gyldig telefonnummer";
 }
 if (!(checkEmail(values.mail))) {
 errors.mail = "Dette er ikke en gyldig epostadresse";
 }
 return errors;*/

/*names.reduce((errors, name) => {
 console.log("Hei")
 if(!data[name]) {
 console.log("Ugyldig telefonnr")
 errors[name] = 'Ugyldig telefonnr'
 }
 return errors
 }*/