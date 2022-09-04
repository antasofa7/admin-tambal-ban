import FIREBASE from "services/config/FIREBASE"
import { firestore } from "services/config/FIREBASE"
import { dispatchError, dispatchLoading, dispatchSuccess } from "utils"

export const GET_LIST_PLACE = "GET_LIST_PLACE"
export const ADD_PLACE = "ADD_PLACE"
export const GET_PLACE_DETAIL = "GET_PLACE_DETAIL"
export const UPDATE_PLACE = "UPDATE_PLACE"
export const DELETE_PLACE = "DELETE_PLACE"

export const getListPlace = () => {
	return (dispatch) => {
		dispatchLoading(dispatch, GET_LIST_PLACE)

		const places = firestore.collection("places");
		
		places.get()
		.then((querySnapshot) => {
				let data = querySnapshot.docs;
				// console.log('data', data);
				dispatchSuccess(dispatch, GET_LIST_PLACE, data)
			})
			.catch((err) => {
				dispatchError(dispatch, GET_LIST_PLACE, err)
				alert(err)
			})
	}
}

export const addPlace = (data) => {
	console.log('data', data);
	return (dispatch) => {
		dispatchLoading(dispatch, ADD_PLACE,)

		// upload ke storage
		const uploadTask = FIREBASE.storage()
			.ref("places")
			.child(data.imageToDb.name)
			.put(data.imageToDb)

		// // Register three observers:
		// // 1. 'state_changed' observer, called any time the state changes
		// // 2. Error observer, called on failure
		// // 3. Completion observer, called on successful completion
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				console.log("Upload is " + progress + "% done")
				console.log(snapshot)
			},
			(error) => {
				console.log(error)
			},
			() => {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					console.log("File available at", downloadURL)
					const date = new Date().toLocaleString()
					const dataBaru = {
						imageUrl: downloadURL,
						name: data.name,
						address: data.address,
						openTime: data.openTime,
						phoneNumber: data.phoneNumber,
						latitude: parseFloat(data.latitude),
						longitude: parseFloat(data.longitude),
						vehicle: data.vehicle,
						homeService: data.homeService,
						services: data.services,
						status: 'approved',
						createdAt: date,
						updatedAt: date
					}
					const places = firestore.collection("places").doc();
					places.set(dataBaru)
						.then((res) => {
							dispatchSuccess(dispatch, ADD_PLACE, 'Create document successfully!')
						})
						.catch((err) => {
							dispatchError(dispatch, ADD_PLACE, err)
							alert(err)
						})
				})
			}
		)
	}
}

export const getPlaceDetail = (id) => {
	return (dispatch) => {
		dispatchLoading(dispatch, GET_PLACE_DETAIL)

		const place = firestore.collection("places").doc(id);
		
		place.get()
		.then((querySnapshot) => {
			if (querySnapshot.exists) {
				let data = querySnapshot.data();
				// console.log('data', data);
				dispatchSuccess(dispatch, GET_PLACE_DETAIL, data)
			} else {
				console.log("No such document!");
			}
		})
		.catch((err) => {
			dispatchError(dispatch, GET_PLACE_DETAIL, err)
			alert(err)
		})
	}
}

export const updatePlace = (status, id) => {
	console.log(status)

	return (dispatch) => {
		dispatchLoading(dispatch, UPDATE_PLACE)

		// current image check
		// if (data.imageToDb) {
		// 	// get current image firebase storage
		// 	const desertRef = FIREBASE.storage().refFromURL(data.imageUrl)

		// 	// Delete the file
		// 	desertRef
		// 		.delete()
		// 		.then(() => {
		// 			// File deleted successfully
		// 			const uploadTask = FIREBASE.storage()
		// 				.ref("ligas")
		// 				.child(data.imageToDb.name)
		// 				.put(data.imageToDb)

		// 			uploadTask.on(
		// 				"state_changed",
		// 				(snapshot) => {
		// 					// Observe state change events such as progress, pause, and resume
		// 					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
		// 					const progress =
		// 						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
		// 					console.log("Upload is " + progress + "% done")
		// 					console.log(snapshot)
		// 				},
		// 				(error) => {
		// 					console.log(error)
		// 				},
		// 				() => {
		// 					// Handle successful uploads on complete
		// 					// For instance, get the download URL: https://firebasestorage.googleapis.com/...
		// 					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
		// 						console.log("File available at", downloadURL)
		// 						const dataBaru = {
		// 							namaLiga: data.namaLiga,
		// 							image: downloadURL,
		// 						}

		// 						FIREBASE.database()
		// 							.ref(`ligas/${data.id}`)
		// 							.update(dataBaru)
		// 							.then((res) => {
		// 								dispatchSuccess(dispatch, UPDATE_PLACE, res ? res : [])
		// 							})
		// 							.catch((err) => {
		// 								dispatchError(dispatch, UPDATE_PLACE, err)
		// 								alert(err)
		// 							})
		// 					})
		// 				}
		// 			)
		// 		})
		// 		.catch((error) => {
		// 			// Uh-oh, an error occurred!
		// 			dispatchError(dispatch, UPDATE_PLACE, error)
		// 		})
		// } else {
			// const dataBaru = {
			// 	namaLiga: data.namaLiga,
			// 	image: data.image,
			// }
			const place = firestore.collection("places").doc(id);
			new Date().toLocaleString()
			
			place.update({'status': status, 'updatedAt': new Date().toLocaleString()})
				.then((res) => {
					dispatchSuccess(dispatch, UPDATE_PLACE, "Document successfully updated!")
				})
				.catch((err) => {
					dispatchError(dispatch, UPDATE_PLACE, err)
					alert(err)
				})
		// }
	}
}

export const deletePlace = (imageUrl, id) => {
	console.log(imageUrl, id);
	return (dispatch) => {
		dispatchLoading(dispatch, DELETE_PLACE)

		const desertRef = FIREBASE.storage().refFromURL(imageUrl)

		// Delete the file
		desertRef.delete().then(() => {
			// hapus data di realtime database
			const place = firestore.collection("places").doc(id);
			place.delete()
				.then((_) => {
					dispatchSuccess(dispatch, DELETE_PLACE, "Document successfully deleted!")
				})
				.catch((err) => {
					dispatchError(dispatch, DELETE_PLACE, err)
					alert(err)
				})
		})
	}
}
