import { DELETE_IMAGE_FROM_STORAGE } from "services/actions/GalleryAction";
import { GET_IMAGE_FROM_STORAGE } from "services/actions/GalleryAction";

const initialState = {
    getImageLoading: false,
    getImageResult: false,
    getImageError: false,

    deleteImageLoading: false,
    deleteImageResult: false,
    deleteImageError: false,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_IMAGE_FROM_STORAGE:
            return {
                getImageLoading: action.payload.loading,
                getImageResult: action.payload.data,
                getImageError: action.payload.errorMessage,
            }
    
        case DELETE_IMAGE_FROM_STORAGE:
            return {
                deleteImageLoading: action.payload.loading,
                deleteImageResult: action.payload.data,
                deleteImageError: action.payload.errorMessage,
            }

        default:
            return state;
    }    
}