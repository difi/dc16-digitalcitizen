import {onlyDigitsInString} from '../validation.js';
import {onlyLettersInString} from '../validation.js';
import {alphaNumericInString} from '../validation.js';
import {formatPhone} from '../validation.js';
import {createStore, combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
const reducers = combineReducers({
    // ... your other reducers here ...
    form: form.normalize({
        application: {
            'form1.firstName': (firstName) => onlyLettersInString(firstName),
            'form1.lastName': (name) => onlyLettersInString(name),
            'form1.phone': (phone) => formatPhone(phone),
            'form2.firstName': (firstName) => onlyLettersInString(firstName),
            'form2.lastName': (name) => onlyLettersInString(name),
            'form2.phone': (phone) => formatPhone(phone),
            'form3.firstName': (firstName) => onlyLettersInString(firstName),
            'form3.lastName': (name) => onlyLettersInString(name),
            'form3.phone': (phone) => formatPhone(phone),
            'form3.mail': (mail) => alphaNumericInString(mail),
            'form2.mail': (mail) => alphaNumericInString(mail),
            'form1.mail': (mail) => alphaNumericInString(mail),

            pnr: value => onlyDigitsInString(value),
            name: value=> onlyLettersInString(value),
            number: value=>formatPhone(value),
            zipcode: value=>onlyDigitsInString(value),
            street: value=>alphaNumericInString(value),
            doctorName: value=>onlyLettersInString(value)
          


        }
    })
});


export default reducers ;


