import React, {useState} from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import {savePaymentMethod} from '../actions/cartActions';

const PaymentScreen = ({history}) => {
	const cart = useSelector(state => state.cart);
	const {shippingAddress} = cart;

	if(!shippingAddress){
		history.push('/shipping');
	}

	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>
					<Col>
						<Form.Check
							type='radio'
							checked
							value='PayPal'
							id='PayPal'
							onChange={e=>setPaymentMethod(e.target.value)}
							name='paymentMethod'
							label='PayPal or Credit Card'>
						</Form.Check>
					</Col>
				</Form.Group>
				<Button type='submit' className='my-3' variant='primary'>Continue</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;