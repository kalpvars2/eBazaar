import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';

const SearchBox = ({history}) => {
	const [keyword, setKeyWord] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		if(keyword.trim()){
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
	};

	return (
		<Form style={{display: "flex"}} onSubmit={submitHandler}>
			<Form.Control type='text' 
						  name='q' 
						  onChange={(e) => setKeyWord(e.target.value)}
						  placeholder='Search Products...'
						  style={{marginLeft: "10px", marginRight: "5px"}}>
			</Form.Control>
			<Button type='submit' variant='outline-success' className='btn-sm p-2'>
				Search
			</Button>
		</Form>
	);
};

export default SearchBox;