import * as authReducer from 'app/features/auth/redux/reducers';
import * as mainReducer from 'app/features/main/redux/reducers';
export default Object.assign({}, authReducer, mainReducer);
