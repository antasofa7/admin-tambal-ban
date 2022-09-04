/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { useEffect, useState } from "react"
import { connect, useDispatch } from "react-redux"
import {
	Alert,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Card, CardBody, CardHeader, CardImg, CardImgOverlay, CardTitle, Col, Row, Spinner
} from "reactstrap"
import { deleteImageFromStorage } from "services/actions/GalleryAction"
import { getImageFromStorage } from "services/actions/GalleryAction"

const Gallery = (props) => {
	const dispatch = useDispatch()
	const { getImageLoading, getImageResult, getImageError, deleteImageLoading,
		deleteImageResult } = props
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		dispatch(getImageFromStorage())

		return () => {
			if (deleteImageResult) {
				dispatch(getImageFromStorage())
				setVisible(true)
			}
		}
	}, [dispatch, deleteImageResult])
	console.log('getImage', deleteImageResult);
	console.log("load", deleteImageLoading)

	const deleteImage = imageUrl => {
		dispatch(deleteImageFromStorage(imageUrl))
	}
	
	const onDismiss = () => {
		setVisible(false)
	}

	return (
		<>
			<div className="content">
				<Alert color="danger" isOpen={visible} toggle={onDismiss}>
					Image successfully deleted!
				</Alert>
				<Breadcrumb>
					<BreadcrumbItem active>Gallery</BreadcrumbItem>
				</Breadcrumb>
				<Row>
					<Col md="12">
						<Card className="demo-icons">
							<CardHeader>
								<CardTitle tag="h5">Gallery</CardTitle>
							</CardHeader>
							<CardBody>
								<div className="d-flex justify-content-center">
									<section>
										{getImageResult ? (
											<ul>
												{getImageResult?.map((image, index) => {
													return (
														<li key={index} className="image">
															<CardImg src={image} alt="gallery" />
															<CardImgOverlay>
																<Button color="danger" onClick={() => deleteImage(image)}>
																	{!deleteImageLoading ? <span>Delete</span>:<Spinner />}
																</Button>
															</CardImgOverlay>
														</li>
													)
												})}
											</ul>
										) : getImageLoading ? (
											<div className="text-center p-5">
												<Spinner className="mt-5" color="primary" type="grow" />{" "}
												<br />
												<br /> Memuat data...
											</div>
										) : (
											<div>{ getImageError }</div>
										)}
									</section>
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	)
}

const mapsStateToProps = (state) => ({
	getImageLoading: state.GalleryReducer.getImageLoading,
	getImageResult: state.GalleryReducer.getImageResult,
	getImageError: state.GalleryReducer.getImageError,

	deleteImageLoading: state.GalleryReducer.deleteImageLoading,
	deleteImageResult: state.GalleryReducer.deleteImageResult,
	deleteImageError: state.GalleryReducer.deleteImageError,
})

export default connect(mapsStateToProps, null)(Gallery)
