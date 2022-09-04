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
import { useEffect, useState } from "react"
import { connect, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import DefaultImage from "../../assets/img/default-image.jpg"
// reactstrap components
import {
    Alert,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    CardBody,
    CardHeader, CardTitle,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    Spinner
} from "reactstrap"
import { addPlace } from "services/actions/PlaceActions"

const AddPlace = (props) => {
	const { addPlaceLoading, addPlaceResult, addPlaceError } = props
	const dispatch = useDispatch()

	const [place, setPlace] = useState({
		imageToDb: false,
		imageUrl: DefaultImage,
		name: "",
		address: "",
		openTime: "",
		phoneNumber: "",
		latitude: "",
		longitude: "",
		bycicle: false,
		motorbike: false,
		car: false,
        vehicle: [],
        homeService: false,
        services: ''
	})
	const [visible, setVisible] = useState(false)

	const {
		imageUrl,
		name,
		address,
		openTime,
		phoneNumber,
		latitude,
		longitude,
		bycicle,
		motorbike,
		car,
        vehicle,
        services
	} = place

	// console.log("place", longitude)

	useEffect(() => {
        if (addPlaceResult) {
            setVisible(true)
        }
		// return () => {
		// }
	}, [addPlaceResult])

	const handleImage = (event) => {
		const file = event.target.files
		console.log("event: ", file[0])
		if (file && file[0]) {
			const img = file[0]
			setPlace((prevState) => {
				return {
					...prevState,
					[event.target.name]: URL.createObjectURL(img),
					imageToDb: img,
				}
			})
		}
	}

	const handleChange = (event) => {
		const eventName = event.target.name
		const eventValue = event.target.value
		setPlace((prevState) => {
			return {
				...prevState,
				[eventName]: eventValue,
			}
		})
	}
    
    const handleCheck = event => {
        const eventName = event.target.name
		const eventValue =event.target.checked

		setPlace((prevState) => {
			return {
				...prevState,
				[eventName]: eventValue,
			}
		})

        if (eventName !== 'homeService') {
            if (eventValue === 'car') {
                vehicle.push('Mobil')
            } else if (eventValue === 'motorbike') {
                vehicle.push('Motor')
            } else if (eventValue === 'bycicle') {
                vehicle.push('Sepeda')
            } else {
                vehicle.pop()
            }
        }
    }

	const handleSubmit = (event) => {
		event.preventDefault()
		if (
			imageUrl &&
			name &&
			address &&
			openTime &&
			phoneNumber &&
			latitude &&
			longitude
		) {
			dispatch(addPlace(place))
		} else {
			console.log("Input harus diisi semua")
			console.log(place)
			setVisible(true)
		}
	}
	console.log(place.homeService)
    console.log(place.vehicle)

	return (
		<div className="content">
			<Breadcrumb>
				<BreadcrumbItem>
					<Link to="/admin/places">Tambal Ban</Link>
				</BreadcrumbItem>
				<BreadcrumbItem active>Add</BreadcrumbItem>
			</Breadcrumb>
			<Row>
				<Col md={12}>
					<Card>
						<CardHeader className="d-flex justify-content-between">
							<CardTitle tag="h4">Add Tambal Ban</CardTitle>
							<Link to="/admin/places" className="btn btn-default">
								Back
							</Link>
						</CardHeader>
						<CardBody>
							<form onSubmit={(event) => handleSubmit(event)}>
								<Row>
									<Col>
										<Row>
											<Col className="col-auto">
												<img
													src={imageUrl}
													width={200}
													alt="foto lokasi tambal ban"
												/>
												<FormGroup className="mt-3">
													<Input
														type="file"
														id="imageUrl"
														name="imageUrl"
														onChange={handleImage}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col>
												<FormGroup className="mt-2">
													<Label for="name">Name</Label>
													<Input
														type="text"
														value={name}
														name="name"
														id="name"
														onChange={handleChange}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col>
												<FormGroup className="mt-2">
													<Label for="address">Address</Label>
													<Input
														type="textarea"
														value={address}
														name="address"
														id="address"
														onChange={handleChange}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col md={6}>
												<FormGroup className="mt-2">
													<Label for="openTime">Open Time</Label>
													<Input
														type="text"
														value={openTime}
														name="openTime"
														id="openTime"
														onChange={handleChange}
													/>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup className="mt-2">
													<Label for="phoneNumber">Phone Number</Label>
													<Input
														type="number"
														value={phoneNumber}
														name="phoneNumber"
														id="phoneNumber"
														onChange={handleChange}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col md={6}>
												<FormGroup className="mt-2">
													<Label for="latitude">Latitude</Label>
													<Input
														type="number"
														value={latitude}
														name="latitude"
														id="latitude"
														onChange={handleChange}
													/>
												</FormGroup>
											</Col>
											<Col md={6}>
												<FormGroup className="mt-2">
													<Label for="longitude">Longitude</Label>
													<Input
														type="number"
														value={longitude}
														name="longitude"
														id="longitude"
														onChange={handleChange}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col>
												<Label>Vehicle</Label>
											</Col>
										</Row>
										<Row>
											<Col>
												<FormGroup check>
													<Label check>
														<Input
															type="checkbox"
															name="bycicle"
															value={bycicle}
															onChange={handleCheck}
														/>
														Bycicle
														<span className="form-check-sign mr-4">
															<span className="check"></span>
														</span>
													</Label>
												</FormGroup>
											</Col>
											<Col>
												<FormGroup check>
													<Label check>
														<Input
															type="checkbox"
															name="motorbike"
															value={motorbike}
															onChange={handleCheck}
														/>
														Motorbike
														<span className="form-check-sign mr-4">
															<span className="check"></span>
														</span>
													</Label>
												</FormGroup>
											</Col>
											<Col>
												<FormGroup check>
													<Label check>
														<Input
															type="checkbox"
															name="car"
															value={car}
															onChange={handleCheck}
														/>
														Car
														<span className="form-check-sign mr-4">
															<span className="check"></span>
														</span>
													</Label>
												</FormGroup>
											</Col>
										</Row>
                                        <Row>
                                            <Col>
                                                <Label>Home Service</Label>
                                                <div className="form-check-radio inline">
                                                    <Label className="form-check-label">
                                                        <Input type="radio" name="homeService" id="homeService" value={true} onChange={handleCheck
                                                        } />
                                                        Ya
                                                        <span className="form-check-sign"></span>
                                                    </Label>
                                                </div>
                                                <div check className="form-check-radio inline">
                                                    <Label className="form-check-label">
                                                        <Input type="radio" name="homeService" id="homeService" value={false} onChange={handleCheck
                                                        } defaultChecked/>
                                                        Tidak
                                                        <span className="form-check-sign"></span>
                                                    </Label>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
											<Col>
												<FormGroup className="mt-2">
													<Label for="address">Services</Label>
													<Input
														type="textarea"
														value={services}
														name="services"
														id="services"
														onChange={handleChange}
													/>
												</FormGroup>
											</Col>
										</Row>
										<Row>
											<Col>
												<Button color="primary" type="submit">
													{addPlaceLoading ? (
														<Spinner />
													) : (
														<span>
															<i className="nc-icon nc-box-2 mr-2"></i> Simpan
														</span>
													)}
												</Button>
											</Col>
										</Row>
									</Col>
								</Row>
							</form>
						</CardBody>
					</Card>
				</Col>
			</Row>
			{addPlaceResult ? (
				<Alert
					color="success"
					isOpen={visible}
					toggle={() => setVisible(false)}
				>
					<span>Document successfully created!</span>
				</Alert>
			) : (
				<Alert color="danger" isOpen={visible} toggle={() => setVisible(false)}>
					<span>All input required!</span>
				</Alert>
			)}
		</div>
	)
}

const mapsStateToProps = (state) => ({
	addPlaceLoading: state.PlaceReducer.addPlaceLoading,
	addPlaceResult: state.PlaceReducer.addPlaceResult,
	addPlaceError: state.PlaceReducer.addPlaceError,
})

export default connect(mapsStateToProps, null)(AddPlace)
