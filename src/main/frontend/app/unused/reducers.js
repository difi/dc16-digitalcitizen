/**
 * Created by camp-vhe on 21.06.2016.
 */

import {onlyDigitsInString} from '../validation.js';
import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
const reducers = {
    // ... your other reducers here ...
    form: form.normalize({
        normalizing: {
            pnr: value => onlyDigitsInString(value),
            number: value => onlyDigitsInString(value)
        }})     // <---- Mounted at 'form'. See note below.
};


export default reducers ;