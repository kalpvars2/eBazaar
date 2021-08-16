import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc	Fetch all products
// @route 	GET /api/products
// @access	Public
const getProducts = asyncHandler(async (req, res) => {
	const pageSize = 10;
	const page = Number(req.query.pageNumber) || 1;

	const keyword = req.query.keyword ? {
		name: {
			$regex: req.query.keyword,
			$options: 'i' // 'i' = case-insensitive
		}
	} : {}

	const count = await Product.countDocuments({...keyword});

	// Finding products in group of size 'pageSize' and depending on
	// the page number, skipping appropriate number of groups
	const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));
	res.json({ products, page, pages: Math.ceil(count/pageSize) });
});

// @desc	Fetch single product
// @route 	GET /api/products/:id
// @access	Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if(product){
		res.json(product);
	} else {
		res.status(404);
		throw new Error(`Product not found!`);
	}
});

// @desc	Delete a product
// @route 	DELETE /api/products/:id
// @access	Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if(product){
		await product.remove();
		res.json({ message: "Product removed." });
	} else {
		res.status(404);
		throw new Error(`Product not found!`);
	}
});

// @desc	Create a product
// @route 	POST /api/products
// @access	Private/Admin
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample brand',
		category: 'Sample category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample description'
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

// @desc	Update a product
// @route 	PUT /api/products/:id
// @access	Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
	const {name, 
		   price, 
		   description, 
		   countInStock, 
		   brand, 
		   category, 
		   image} = req.body;

	const product = await Product.findById(req.params.id);

	if(product){
		product.name = name || product.name;
		product.price = price || product.price;
		product.description = description || product.description;
		product.countInStock = countInStock || product.countInStock;
		product.brand = brand || product.brand;
		product.category = category || product.category;
		product.image = image || product.image;

		const updatedProduct = await product.save();
		res.status(201).json(updatedProduct);
	} else {
		res.status(404);
		throw new Error(`Product not found.`);
	}

});

// @desc	Create new review
// @route 	POST /api/products/:id/reviews
// @access	Private
const createProductReview = asyncHandler(async (req, res) => {
	const {rating, comment} = req.body;

	const product = await Product.findById(req.params.id);

	if(product){
		const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());

		if(alreadyReviewed){
			res.status(400);
			throw new Error(`Product already reviewed.`);
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id
		}

		product.reviews.push(review);
		product.numReviews = product.reviews.length;
		product.rating = product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length;

		await product.save();
		res.status(201).json('Review added.');
	} else {
		res.status(404);
		throw new Error(`Product not found.`);
	}

});

export {getProducts, 
		getProductById, 
		deleteProduct, 
		createProduct, 
		updateProduct,
		createProductReview
	};