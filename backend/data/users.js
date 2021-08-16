import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcrypt.hashSync('xxxx'),
		isAdmin: true
	},
	{
		name: 'Kalp',
		email: 'kalp@example.com',
		password: bcrypt.hashSync('xxxx')
	},
	{
		name: 'Varun',
		email: 'varun@example.com',
		password: bcrypt.hashSync('xxxx')
	}
];

export default users;