/**
 * Created by camp-vhe on 21.06.2016.
 */

import {onlyDigitsInString} from '../validation.js';
import {onlyLettersInString} from '../validation.js';
import {alphaNumericInString} from '../validation.js';
import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
const reducers = combineReducers({
    // ... your other reducers here ...
    form: form.normalize({
        application: {
            pnr: value => onlyDigitsInString(value),
            name: value=> onlyLettersInString(value),
            number: value=>onlyDigitsInString(value),
            zipcode: value=>onlyDigitsInString(value),
          


        }
    })
});


export default reducers ;


