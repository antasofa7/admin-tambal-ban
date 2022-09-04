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
import { useEffect } from "react"
import { connect, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
// reactstrap components
import {
	Breadcrumb,
	BreadcrumbItem,
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	Col,
	Row,
	Spinner,
	Table,
} from "reactstrap"
import { getListPlace } from "services/actions/PlaceActions"

// const MapWrapper = () => {
//   const mapRef = React.useRef(null);
//   React.useEffect(() => {
//     let google = window.google;
//     let map = mapRef.current;
//     let lat = "40.748817";
//     let lng = "-73.985428";
//     const myLatlng = new google.maps.LatLng(lat, lng);
//     const mapOptions = {
//       zoom: 13,
//       center: myLatlng,
//       scrollwheel: false,
//       zoomControl: true,
//       styles: [
//         {
//           featureType: "water",
//           stylers: [
//             {
//               saturation: 43
//             },
//             {
//               lightness: -11
//             },
//             {
//               hue: "#0088ff"
//             }
//           ]
//         },
//         {
//           featureType: "road",
//           elementType: "geometry.fill",
//           stylers: [
//             {
//               hue: "#ff0000"
//             },
//             {
//               saturation: -100
//             },
//             {
//               lightness: 99
//             }
//           ]
//         },
//         {
//           featureType: "road",
//           elementType: "geometry.stroke",
//           stylers: [
//             {
//               color: "#808080"
//             },
//             {
//               lightness: 54
//             }
//           ]
//         },
//         {
//           featureType: "landscape.man_made",
//           elementType: "geometry.fill",
//           stylers: [
//             {
//               color: "#ece2d9"
//             }
//           ]
//         },
//         {
//           featureType: "poi.park",
//           elementType: "geometry.fill",
//           stylers: [
//             {
//               color: "#ccdca1"
//             }
//           ]
//         },
//         {
//           featureType: "road",
//           elementType: "labels.text.fill",
//           stylers: [
//             {
//               color: "#767676"
//             }
//           ]
//         },
//         {
//           featureType: "road",
//           elementType: "labels.text.stroke",
//           stylers: [
//             {
//               color: "#ffffff"
//             }
//           ]
//         },
//         {
//           featureType: "poi",
//           stylers: [
//             {
//               visibility: "off"
//             }
//           ]
//         },
//         {
//           featureType: "landscape.natural",
//           elementType: "geometry.fill",
//           stylers: [
//             {
//               visibility: "on"
//             },
//             {
//               color: "#b8cb93"
//             }
//           ]
//         },
//         {
//           featureType: "poi.park",
//           stylers: [
//             {
//               visibility: "on"
//             }
//           ]
//         },
//         {
//           featureType: "poi.sports_complex",
//           stylers: [
//             {
//               visibility: "on"
//             }
//           ]
//         },
//         {
//           featureType: "poi.medical",
//           stylers: [
//             {
//               visibility: "on"
//             }
//           ]
//         },
//         {
//           featureType: "poi.business",
//           stylers: [
//             {
//               visibility: "simplified"
//             }
//           ]
//         }
//       ]
//     };

//     map = new google.maps.Map(map, mapOptions);

//     const marker = new google.maps.Marker({
//       position: myLatlng,
//       map: map,
//       animation: google.maps.Animation.DROP,
//       title: "Paper Dashboard React!"
//     });

//     const contentString =
//       '<div class="info-window-content"><h2>Paper Dashboard React</h2>' +
//       "<p>A free Admin for React, Reactstrap, and React Hooks.</p></div>";

//     const infowindow = new google.maps.InfoWindow({
//       content: contentString
//     });

//     google.maps.event.addListener(marker, "click", function () {
//       infowindow.open(map, marker);
//     });
//   });
//   return (
//     <>
//       <div style={{ height: `100%` }} ref={mapRef}></div>
//     </>
//   );
// };

const Places = (props) => {
	const {
		getListPlaceResult,
		getListPlaceLoading,
		getListPlaceError,
		deletePlaceResult,
	} = props
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getListPlace())

		return () => {
			if (deletePlaceResult) {
				dispatch(getListPlace())
			}
		}
	}, [dispatch, deletePlaceResult])

	console.log('date', new Date().toLocaleString());

	return (
		<>
			<div className="content">
				<Breadcrumb>
					<BreadcrumbItem active>Tambal Ban</BreadcrumbItem>
				</Breadcrumb>
				<Row>
					<Col md="12">
						<Card>
							<CardHeader className="d-flex justify-content-between">
								<CardTitle tag="h4">Data Tambal Ban</CardTitle>
								<Link to="/admin/place/add" className="btn btn-primary">
									<i className="nc-icon nc-simple-add mr-2"></i>
									Add Data
								</Link>
							</CardHeader>
							<CardBody>
								{/* <div
                  id="map"
                  className="map"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <MapWrapper />
                </div> */}
								<Table responsive>
									<thead className="text-primary">
										<tr>
											<th>No.</th>
											<th className="text-center">Foto</th>
											<th>Name</th>
											<th>Phone Number</th>
											<th>Coordinate</th>
											{/* <th>Services</th> */}
											<th>Status</th>
											<th className="text-center">Action</th>
										</tr>
									</thead>
									<tbody>
										{getListPlaceResult ? (
											getListPlaceResult.map((item, index) => {
												const place = item.data()
												let status;
												switch (place.status) {
													case 'pending':
														status = 'warning'
														break;
													case 'approved':
														status = 'success'
														break;
													case 'rejected':
														status = 'danger'
														break;
													default:
														break;
												}
												return (
													<tr key={index}>
														<td>{index + 1}</td>
														<td>
															<img
																src={place.imageUrl}
																width={50}
																alt="Lokasi tambal ban"
															/>
														</td>
														<td>{place.name}</td>
														<td>{place.phoneNumber}</td>
														<td>{`${place.latitude}, ${place.longitude}`}</td>
														<td className={`text-${status} `}><strong>{place.status.toUpperCase()}</strong></td>
														<td align="center">
															<Link
																className="btn btn-info mr-2"
																to={`/admin/place/detail/${item.id}`}
															>
																<span>
																	<i className="nc-icon nc-paper mr-2"></i>{" "}
																	Detail
																</span>
															</Link>
														</td>
													</tr>
												)
											})
										) : getListPlaceLoading ? (
											<tr>
												<td colSpan={7} align="center">
													<Spinner
														className="mt-5"
														color="primary"
														type="grow"
													/>{" "}
													<br />
													<br /> Memuat data...
												</td>
											</tr>
										) : getListPlaceError ? (
											<tr>{getListPlaceError}</tr>
										) : (
											<tr>
												<td colSpan={4} align="center">
													Belum ada data!
												</td>
											</tr>
										)}
									</tbody>
								</Table>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	)
}

const mapsStateToProps = (state) => ({
	getListPlaceLoading: state.PlaceReducer.getListPlaceLoading,
	getListPlaceResult: state.PlaceReducer.getListPlaceResult,
	getListPlaceError: state.PlaceReducer.getListPlaceError,
})

export default connect(mapsStateToProps, null)(Places)
