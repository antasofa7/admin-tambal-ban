import { DELETE_PLACE } from "services/actions/PlaceActions";
import { UPDATE_PLACE } from "services/actions/PlaceActions";
import { ADD_PLACE } from "services/actions/PlaceActions";
import { GET_PLACE_DETAIL } from "services/actions/PlaceActions";
import { GET_LIST_PLACE } from "services/actions/PlaceActions";

const initialState = {
    getListPlaceLoading: false,
    getListPlaceResult: false,
    getListPlaceError: false,

    addPlaceLoading: false,
    addPlaceResult: false,
    addPlaceError: false,

    getPlaceDetailLoading: false,
    getPlaceDetailResult: false,
    getPlaceDetailError: false,

    updatePlaceLoading: false,
    updatePlaceResult: false,
    updatePlaceError: false,

    deletePlaceLoading: false,
    deletePlaceResult: false,
    deletePlaceError: false,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LIST_PLACE:
            return {
                ...state,
                getListPlaceLoading: action.payload.loading,
                getListPlaceResult: action.payload.data,
                getListPlaceError: action.payload.errorMessage,
            }
        case ADD_PLACE:
            return {
                ...state,
                addPlaceLoading: action.payload.loading,
                addPlaceResult: action.payload.data,
                addPlaceError: action.payload.errorMessage,
            }
        case GET_PLACE_DETAIL:
            return {
                ...state,
                getPlaceDetailLoading: action.payload.loading,
                getPlaceDetailResult: action.payload.data,
                getPlaceDetailError: action.payload.errorMessage,
            }
        case UPDATE_PLACE:
            return {
                ...state,
                updatePlaceLoading: action.payload.loading,
                updatePlaceResult: action.payload.data,
                updatePlaceError: action.payload.errorMessage,
            }
        case DELETE_PLACE:
            return {
                ...state,
                deletePlaceLoading: action.payload.loading,
                deletePlaceResult: action.payload.data,
                deletePlaceError: action.payload.errorMessage,
            }
        default:
            return state;
    }
}