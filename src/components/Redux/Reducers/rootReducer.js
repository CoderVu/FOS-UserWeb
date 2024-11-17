
import productReducer from '../Reducers/productReducer';

const rootReducer = combineReducers({

    product: productReducer,
  

});
export default rootReducer;
