/**
 * Created by camp-vhe on 21.06.2016.
 */

import {reducer as formReducer} from 'redux-form';
const reducers = {
    // ... your other reducers here ...
    form: formReducer     // <---- Mounted at 'form'. See note below.
}



export default reducers ;