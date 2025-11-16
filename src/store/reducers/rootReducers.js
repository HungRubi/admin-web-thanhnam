import appReducer from "./appReducer";
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from 'redux-persist';
import userReducer from "./userReducer";

const commonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
}

const userConfig = {
    ...commonConfig,
    key: 'userAdmin',
    whitelist: [
        'currentUser', 
    ],
}

const rootReducer = combineReducers({
    app: appReducer,
    user: persistReducer(userConfig, userReducer),
})

export default rootReducer