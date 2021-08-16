import React, {useEffect} from 'react';
import {Button, Row, Col, Image, ListGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = ({history}) => {
	const cart = useSelector(state => state.cart);

	const dispatch = useDispatch();

	// Calculate prices
	cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
	cart.shippingPrice = cart.itemsPrice >= 500 ? 0 : 50;
	cart.taxPrice = 0.15 * cart.itemsPrice;
	cart.totalPrice = (cart.itemsPrice + cart.shippingPrice + cart.taxPrice).toFixed(2);

	const orderCreate = useSelector(state => state.orderCreate);
	const {order, success, error} = orderCreate;

	useEffect(() => {
		console.log(order, success);
		if(success){
			console.log(order._id);
			history.push(`/order/${order._id}`);
		}
	}, [success, history]);

	const placeOrderHandler = () => {
		dispatch(createOrder({
			orderItems: cart.cartItems,
			shippingAddress: cart.shippingAddress,
			paymentMethod: cart.paymentMethod,
			itemsPrice: cart.itemsPrice,
			shippingPrice: cart.shippingPrice,
			taxPrice: cart.taxPrice.toFixed(2),
			totalPrice: cart.totalPrice
		}))
	};

	return (
		<>
			<CheckoutSteps step1 step2 step3 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address: </strong>
								{cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
								{cart.shippingAddress.postalCode}, {' '}
								{cart.shippingAddress.country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<strong>Method: </strong>
							{cart.paymentMethod}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{cart.cartItems.length === 0 ? 
								<Message>Your cart is empty.</Message> :
								<ListGroup variant='flush'>
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image src={item.image} alt={item.name} fluid rounded />
												</Col>
												<Col>
													<Link to={`/products/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x INR {item.price} = INR {item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							}
						</ListGroup.Item>
					</ListGroup>
				</Col>
					<Col md={4}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>INR {cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>INR {cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>INR {cart.taxPrice.toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>INR {cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{error && <Message variant='danger'>{error}</Message>}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button type='button' 
									className='btn-block w-100' 
									disabled={cart.cartItems.length === 0} 
									onClick={placeOrderHandler}>
											Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;