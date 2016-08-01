import {onlyDigitsInString} from './validation.js';
import {onlyLettersInString} from './validation.js';
import {alphaNumericInString} from './validation.js';
import {formatPhone} from './validation.js';
import {email} from './validation.js';
import {checkPostCode} from './validation.js';
import {checkPNR} from './validation.js';
import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
const reducers = combineReducers({
    // ... your other reducers here ...
    form: form.normalize({
        application: {
            'form1.name': (name) => onlyLettersInString(name),
            'form1.phone': (phone) => formatPhone(phone),
            'form2.name': (name) => onlyLettersInString(name),
            'form2.phone': (phone) => formatPhone(phone),
            'form3.name': (name) => onlyLettersInString(name),
            'form3.phone': (phone) => formatPhone(phone),
            'form3.mail': (mail) => email(mail),
            'form2.mail': (mail) => email(mail),
            'form1.mail': (mail) => email(mail),

            pnr: value => checkPNR(value),
            name: value=> onlyLettersInString(value),
            number: value=>formatPhone(value),
            zipcode: value=>checkPostCode(value),
            street: value=>alphaNumericInString(value),
            doctorName: value=>onlyLettersInString(value),
            otherRelation: value=>alphaNumericInString(value)

        }
    })
});


export default reducers ;


