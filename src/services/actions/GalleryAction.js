import FIREBASE from "services/config/FIREBASE"
import { dispatchError, dispatchLoading, dispatchSuccess } from "utils"

export const GET_IMAGE_FROM_STORAGE = "GET_IMAGE_FROM_STORAGE"
export const DELETE_IMAGE_FROM_STORAGE = "DELETE_IMAGE_FROM_STORAGE"

export const getImageFromStorage = () => {
	return (dispatch) => {
		dispatchLoading(dispatch, GET_IMAGE_FROM_STORAGE)

		const listRef = FIREBASE.storage().ref("places/")
		listRef
			.listAll()
			.then((list) => {
				let promise = list.items.map((item) => item.getDownloadURL())
				// console.log(promise)
				Promise.all(promise).then((url) => {
					dispatchSuccess(dispatch, GET_IMAGE_FROM_STORAGE, url)
				})
			})
			.catch((err) => {
				dispatchError(dispatch, GET_IMAGE_FROM_STORAGE, err)
			})
	}
}

export const deleteImageFromStorage = (imageUrl) => {
    return dispatch => {
        dispatchLoading(dispatch, DELETE_IMAGE_FROM_STORAGE)

        const desertRef = FIREBASE.storage().refFromURL(imageUrl)

        desertRef.delete()
        .then(res => {
            dispatchSuccess(dispatch, DELETE_IMAGE_FROM_STORAGE, 'Image successfully deleted!')
        })
        .catch(err => {
            dispatchError(dispatch, DELETE_IMAGE_FROM_STORAGE, err)
        })
    }
}