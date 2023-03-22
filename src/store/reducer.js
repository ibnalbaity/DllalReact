// third-party
import { combineReducers } from 'redux';

// project imports
import categoryReducer from './slices/category';
import dllalReducer from './slices/dllal';
import dllalDetailsReducer from './slices/dllalDetails';
import gvernorateReducer from './slices/gvernorate';
import cityReducer from './slices/city';
import vehicleBrandReducer from './slices/vehicleBrand';
import carModelReducer from './slices/carModel';
import yearReducer from './slices/year';
import adTypeReducer from './slices/adType';
import doubleReducer from './slices/double';
import fuelTypeReducer from './slices/fuelType';
import gearTypeReducer from './slices/gearType';
import treatyReducer from './slices/treaty';
import uploadReducer from './slices/upload';
import userReducer from './slices/user';
import snackbarReducer from './slices/snackbar';
import menuReducer from './slices/menu';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    category: categoryReducer,
    dllal: dllalReducer,
    dllalDetails: dllalDetailsReducer,
    gvernorate: gvernorateReducer,
    city: cityReducer,
    vehicleBrand: vehicleBrandReducer,
    carModel: carModelReducer,
    year: yearReducer,
    adType: adTypeReducer,
    double: doubleReducer,
    fuelType: fuelTypeReducer,
    gearType: gearTypeReducer,
    treaty: treatyReducer,
    upload: uploadReducer,
    user: userReducer,
    snackbar: snackbarReducer,
    menu: menuReducer
});

export default reducer;
