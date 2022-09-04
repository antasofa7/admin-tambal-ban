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
import { useCallback, useEffect, useRef, useState } from "react"
import { connect, useDispatch } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom"
// reactstrap components
import {
	Alert,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	Col,
	Input,
	Row,
	Spinner,
} from "reactstrap"
import { updatePlace } from "services/actions/PlaceActions"
import { deletePlace, getPlaceDetail } from "services/actions/PlaceActions"

const PlaceDetail = (props) => {
	const { id } = useParams()
	const {
		getPlaceDetailLoading,
		getPlaceDetailResult,
		getPlaceDetailError,
		updatePlaceLoading,
		updatePlaceResult,
		deletePlaceResult,
	} = props
	const dispatch = useDispatch()
	const history = useHistory()
	const [visible, setVisible] = useState(false)
	const [status, setStatus] = useState('approved');
	const ref = useRef(null)

	const getPlace = useCallback(async () => {
		await dispatch(getPlaceDetail(id))
	}, [dispatch, id])

	useEffect((prevState) => {
		getPlace()
		return () => {
			if (ref.current !== updatePlaceResult && updatePlaceResult) {
				setVisible(true)
				setTimeout(() => {
					history.push("/admin/places")
				}, 1500)
			}
		}
	}, [getPlace, updatePlaceResult, deletePlaceResult])

	const handleChange = event => {
		setStatus(event.target.value)
	}

	const editPlace = () => {
		dispatch(updatePlace(status, id))
	}

	const removePlace = (imageUrl) => {
		dispatch(deletePlace(imageUrl, id))
	}
console.log('visible', visible);
	return (
		<div className="content">
			<Breadcrumb>
				<BreadcrumbItem>
					<Link to="/admin/places">Tambal Ban</Link>
				</BreadcrumbItem>
				<BreadcrumbItem active>Detail</BreadcrumbItem>
			</Breadcrumb>
			<Row>
				<Col md={12}>
					<Card>
						<CardHeader className="d-flex justify-content-between">
							<CardTitle tag="h5">Detail Tambal Ban</CardTitle>
							<Link to="/admin/places" className="btn btn-default">
								Back
							</Link>
						</CardHeader>
						<CardBody>
							<Row>
								{getPlaceDetailResult ? (
									<Col>
										<form onSubmit={(event) => this.handleSubmit(event)}>
											<Row>
												<Col md={5} className="mb-3">
													<img
														src={getPlaceDetailResult.imageUrl}
														alt="Foto lokasi tambal ban"
													/>
												</Col>
												<Col>
													<Row className="mb-2">
														<Col md={3}>
															<span>Name: </span>
														</Col>
														<Col>
															<strong>{getPlaceDetailResult.name}</strong>
														</Col>
													</Row>
													<Row className="mb-2">
														<Col md={3}>
															<span>Address:</span>
														</Col>
														<Col>
															<strong>{getPlaceDetailResult.address}</strong>
														</Col>
													</Row>
													<Row className="mb-2">
														<Col md={3}>
															<span>Open Time:</span>
														</Col>
														<Col>
															<strong>{getPlaceDetailResult.openTime}</strong>
														</Col>
													</Row>
													<Row className="mb-2">
														<Col md={3}>
															<span>Phone Number:</span>
														</Col>
														<Col>
															<strong>
																{getPlaceDetailResult.phoneNumber}
															</strong>
														</Col>
													</Row>
													<Row className="mb-2">
														<Col md={3}>
															<span>Latitude:</span>
														</Col>
														<Col>
															<strong>{getPlaceDetailResult.latitude}</strong>
														</Col>
													</Row>
													<Row className="mb-2">
														<Col md={3}>
															<span>Longitude:</span>
														</Col>
														<Col>
															<strong>{getPlaceDetailResult.longitude}</strong>
														</Col>
													</Row>
													<Row className="mb-2">
														<Col md={3}>
															<span>Vehicle:</span>
														</Col>
														<Col>
															{/* {getPlaceDetailResult.vehicle.map(
																(vehicle, index) => (
																	<>
																		<strong key={index}>
																			{vehicle.toUpperCase()}
																		</strong>{" "}
																		<br />
																	</>
																)
															)} */}
														</Col>
													</Row>
													<Row className="mb-2">
														<Col md={3}>
															<span>Home Service:</span>
														</Col>
														<Col>
															<strong>
																{getPlaceDetailResult.homeService
																	? "Yes"
																	: "No"}
															</strong>
														</Col>
													</Row>
													<Row className="mb-2">
														<Col md={3}>
															<span>Services:</span>
														</Col>
														<Col>
															<strong>{getPlaceDetailResult.services}</strong>
														</Col>
													</Row>
													<Row className="mb-2">
														<Col md={3}>
															<span>Status:</span>
														</Col>
														<Col>
															<Input type="select" name="status" id="status" onChange={handleChange}>
																{getPlaceDetailResult.status === "pending" && (
																	<option value="Pending">Pending</option>
																)}
																<option value="approved">Appove</option>
																<option value="rejected">Reject</option>
															</Input>
														</Col>
													</Row>
													<Row>
														<Col>
															<Button
																color="success"
																type="button"
																onClick={editPlace}
															>
																{updatePlaceLoading ? (
																	<div className="d-flex align-items-center">
																		<Spinner
																			color="white"
																			size="sm"
																			className="mr-2"
																		/>{" "}
																		Loading...
																	</div>
																) : (
																	<span>
																		<i className="nc-icon nc-check-2 mr-2"></i>{" "}
																		Update
																	</span>
																)}
															</Button>
															&nbsp;
															<Button
																color="danger"
																type="button"
																onClick={() =>
																	removePlace(getPlaceDetailResult.imageUrl)
																}
															>
																<span>
																	<i className="nc-icon nc-simple-remove mr-2"></i>{" "}
																	Delete
																</span>
															</Button>
														</Col>
													</Row>
												</Col>
											</Row>
										</form>
									</Col>
								) : (
									<Col className="d-flex justify-content-center">
										{getPlaceDetailLoading ? (
											<div className="text-center p-5">
												<Spinner className="mt-5" color="primary" type="grow" />
												<br />
												<br /> Memuat data...
											</div>
										) : (
											<span>{getPlaceDetailError}</span>
										)}
									</Col>
								)}
							</Row>
						</CardBody>
					</Card>
				</Col>
			</Row>
			{deletePlaceResult ? (
				<Alert color="danger" isOpen={visible} toggle={() => setVisible(false)}>
					<span>Document successfully deleted!</span>
				</Alert>
			) : (
				<Alert
					color="success"
					isOpen={visible}
					toggle={() => setVisible(false)}
				>
					<span>Document successfully updated!</span>
				</Alert>
			)}
		</div>
	)
}

const mapsStateToProps = (state) => ({
	getPlaceDetailLoading: state.PlaceReducer.getPlaceDetailLoading,
	getPlaceDetailResult: state.PlaceReducer.getPlaceDetailResult,
	getPlaceDetailError: state.PlaceReducer.getPlaceDetailError,

	updatePlaceLoading: state.PlaceReducer.updatePlaceLoading,
	updatePlaceResult: state.PlaceReducer.updatePlaceResult,
	updatePlaceError: state.PlaceReducer.updatePlaceError,

	deletePlaceLoading: state.PlaceReducer.deletePlaceLoading,
	deletePlaceResult: state.PlaceReducer.deletePlaceResult,
})

export default connect(mapsStateToProps, null)(PlaceDetail)
