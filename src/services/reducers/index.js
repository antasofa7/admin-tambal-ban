import { combineReducers } from "redux";
import PlaceReducer from './place'
import GalleryReducer from './gallery'

export default combineReducers({
    PlaceReducer,
    GalleryReducer
})