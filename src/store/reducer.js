// third-party
import { combineReducers } from 'redux';

// project imports
import categoryReducer from './slices/category';
import snackbarReducer from './slices/snackbar';
import menuReducer from './slices/menu';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    category: categoryReducer,
    snackbar: snackbarReducer,
    menu: menuReducer
});

export default reducer;
