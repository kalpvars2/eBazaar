import React from 'react';
import {Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const CheckoutSteps = ({step1, step2, step3, step4}) => {
	return (
		<Nav className='justify-content-center mb-4' style={{fontSize: '0.85rem'}}>
			<Nav.Item>
				{step1 ? (
					<LinkContainer to='/login'>
						<Nav.Link><i className='fas fa-check'>Sign In</i></Nav.Link>
					</LinkContainer>
					) : <Nav.Link disabled>Sign In</Nav.Link>
				}
			</Nav.Item>
			<Nav.Item>
				{step2 ? (
					<LinkContainer to='/shipping'>
						<Nav.Link><i className='fas fa-check'>Shipping</i></Nav.Link>
					</LinkContainer>
					) : <Nav.Link disabled>Shipping</Nav.Link>
				}
			</Nav.Item>
			<Nav.Item>
				{step3 ? (
					<LinkContainer to='/payment'>
						<Nav.Link><i className='fas fa-check'>Payment Method</i></Nav.Link>
					</LinkContainer>
					) : <Nav.Link disabled>Payment Method</Nav.Link>
				}
			</Nav.Item>
			<Nav.Item>
				{step4 ? (
					<LinkContainer to='/placeorder'>
						<Nav.Link><i className='fas fa-check'>Place Order</i></Nav.Link>
					</LinkContainer>
					) : <Nav.Link disabled>Place Order</Nav.Link>
				}
			</Nav.Item>
		</Nav>
	);
};

export default CheckoutSteps;