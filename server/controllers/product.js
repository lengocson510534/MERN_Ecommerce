const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const product = require('../models/product')

const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw Error('Missing inputs')
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
  const newProduct = await Product.create(req.body)
  return res.status(200).json({
    success: newProduct ? true : false,
    createProduct: newProduct ? newProduct : 'Cannot create new product'
  })
})

const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params
  const product = await Product.findById(pid)
  return res.status(200).json({
    success: product ? true : false,
    createData: product ? product : 'Cannot get product'
  })
})

const getProducts = asyncHandler(async (req, res) => {
  const queries = { ...req.query }
  // Tách các trường dữ liệu đặt biệt ra khỏi query
  const excludeFields = ['limit', 'sort', 'page', 'fields']
  excludeFields.forEach(el => delete queries[el])

  // format lại các operators cho đúng cú pháp mongoose
  let queryString = JSON.stringify(queries)
  queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`)
  const formatQueries = JSON.parse(queryString)
  // Filtering
  if (queries?.title) formatQueries.title = { $regex: queries.title, $options: 'i' }
  let queryCommand = Product.find(formatQueries)
  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ')
    queryCommand = queryCommand.sort(sortBy)
  }
  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ')
    queryCommand = queryCommand.select(fields)
  }
  // Pagination
  // limit: số object lấy về 1 lần gọi API
  // skip
  const page = +req.query.page || 1
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
  const skip = (page - 1) * limit
  queryCommand.skip(skip).limit(limit)
  // Execute query
  try {
    const response = await queryCommand.exec(); // Đợi kết quả từ MongoDB
    const counts = await Product.find(formatQueries).countDocuments(); // Tính số lượng tài liệu

    return res.status(200).json({
      success: response ? true : false,
      counts,
      products: response || 'Cannot get product' // Nếu không có sản phẩm, trả về thông báo
    })
  } catch (err) {
    // Xử lý lỗi nếu có
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
})

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
  const updateProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true })
  return res.status(200).json({
    success: updateProduct ? true : false,
    updateProduct: updateProduct ? updateProduct : 'Cannot update product'
  })
})

const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params
  const deleteProduct = await Product.findByIdAndDelete(pid)
  return res.status(200).json({
    success: deleteProduct ? true : false,
    updateProduct: deleteProduct ? deleteProduct : 'Cannot delete product'
  })
})

const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid } = req.body;

  // Kiểm tra thiếu thông tin
  if (!star || !pid) {
    throw new Error('Missing Inputs')
  }

  // Tìm sản phẩm theo ID
  const ratingProduct = await Product.findById(pid);
  if (!ratingProduct) {
    throw new Error('Sản phẩm không tồn tại');
  }

  // Kiểm tra xem người dùng đã đánh giá sản phẩm chưa
  const alreadyRating = ratingProduct?.ratings?.find(el => el.postedBy.toString() === _id);

  if (alreadyRating) {
    // Nếu đã đánh giá, cập nhật lại đánh giá
    await Product.updateOne(
      {
        // ratings: { $elemMath: alreadyRating }
        'ratings.postedBy': _id
      },
      {
        $set: {
          'ratings.$.star': star,
          'ratings.$.comment': comment
        }
      }
    );
  } else {
    // Nếu chưa đánh giá, thêm đánh giá mới
    await Product.findByIdAndUpdate(
      pid,
      {
        $push: { ratings: { star, comment, postedBy: _id } }
      },
      { new: true }
    );
  }

  // Sum ratings
  const updatedProduct = await Product.findById(pid)
  const ratingCount = updatedProduct.ratings.length
  const sumRating = updatedProduct.ratings.reduce((sum, el) => sum + +el.star, 0)
  updatedProduct.totalRatings = Math.round(sumRating * 10 / ratingCount) / 10

  await updatedProduct.save()


  return res.status(200).json({
    success: true,
    updatedProduct
  })
})

const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params
  if (!req.files) throw new Error('Missing Inputs')
  const response = await Product.findByIdAndUpdate(pid, { $push: { images: { $each: req.files.map(el => el.path) } } }, { new: true })
  return res.status(200).json({
    status: response ? true : false,
    updatedProduct: response ? response : 'Cannot upload images product'
  })
})

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  ratings,
  uploadImagesProduct
}