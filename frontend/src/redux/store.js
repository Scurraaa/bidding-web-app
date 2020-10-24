import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Auth } from './reducers/AuthReducers'
import { Bid } from './reducers/BidReducers'
import { Product } from './reducers/ProductReducers'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

const AuthpersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['isAuthenticated', 'credentials']
}

const store = createStore(
    combineReducers({
        authentication: persistReducer(AuthpersistConfig, Auth),
        bids: Bid,
        products: Product,
    }),
    composeWithDevTools(applyMiddleware(thunk))
)

const persistor = persistStore(store)
export { persistor, store }