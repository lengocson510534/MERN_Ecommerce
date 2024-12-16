const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const sendMail = require('../ultils/sendMail')
const crypto = require('crypto')

const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body
  if (!email || !password || !firstName || !lastName)
    return res.status(400).json({
      success: false,
      message: 'Missing inputs'
    })
  const user = await User.findOne({ email })
  if (user) throw new Error('User da ton tai')
  else {
    const newUser = await User.create(req.body)
    return res.status(200).json({
      success: newUser ? true : false,
      mes: newUser ? 'Register is successfully. Please go login.' : 'Something went wrong'
    })
  }
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({
      success: false,
      message: 'Missing inputs'
    })
  const response = await User.findOne({ email })
  if (response && await response.isCorrectPassword(password)) {
    const { password, role, refreshToken, ...userData } = response.toObject()
    // Tạo accessToken và refreshToken
    const accessToken = generateAccessToken(response._id, role)
    const newRefreshToken = generateRefreshToken(response._id)
    // Lưu refreshToken vào database
    await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true })
    // Lưu refreshToken vào cookie
    res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
    return res.status(200).json({
      success: true,
      accessToken,
      userData: userData
    })
  } else {
    throw new Error('Thông tin xác thực không hợp lệ!')
  }
})

const getCurrentUser = asyncHandler(async (req, res, next) => {
  const { _id } = req.user
  const user = await User.findById(_id).select('-refreshToken -password -role')
  return res.status(200).json({
    success: user ? true : false,
    result: user ? user : 'User not found'
  })
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  // Lấy token từ cookies
  const cookie = req.cookies
  // Check xem có token hay không
  if (!cookie & !cookie.refreshToken) throw new Error('No refresh token in cookies')
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
  const response = await User.findOne({ _id: rs._id, refreshToken: cookie.refreshToken })
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token is not matched'
  })
})

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies
  if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookies')
  // Xóa token ở DB
  await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true })
  // Xóa token ở cookie trình duyệt
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true
  })
  return res.status(200).json({
    success: true,
    mes: 'Logout is done'
  })
})

// logic reset password 
// người dùng gửi lên email -> sever check email hợp lệ hay không -> gửi mail + kèm theo link (password change token)
// người dùng checkmail -> click link
// client gửi api kèm theo token
// check token có giống với sever đã gửi mail hay không
// change password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.query
  if (!email) throw new Error('Missing email!')
  const user = await User.findOne({ email })
  if (!user) throw new Error('User not found!')
  const resetToken = user.createPasswordChangedToken()
  await user.save()

  const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`

  const data = {
    email,
    html
  }
  const result = await sendMail(data)
  return res.status(200).json({
    success: true,
    result
  })
})

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body
  if (!password || !token) throw new Error('Missing inputs')
  const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
  const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
  if (!user) throw new Error('Invalid reset token')
  user.password = password
  user.passwordResetToken = undefined
  user.passwordChangeAt = Date.now()
  user.passwordResetExpires = undefined
  await user.save()
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? 'Update password' : 'Something went wrong'
  })
})

const getUsers = asyncHandler(async (req, res) => {
  const response = await User.find().select('-refreshToken -password -role')
  return res.status(200).json({
    success: response ? true : false,
    users: response
  })
})

const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query
  if (!_id) throw new Error('Missing inputs')
  const response = await User.findByIdAndDelete(_id)
  return res.status(200).json({
    success: response ? true : false,
    deletedUser: response ? `User with email ${response.email} deleted` : 'No user delete'
  })
})

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user
  if (!_id || Object.keys(req.body).length === 0) throw new Error('Missing inputs')
  const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select('-password -role -refreshToken')
  return res.status(200).json({
    success: response ? true : false,
    updateUser: response ? response : 'Something went wrong!'
  })
})

const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params
  if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
  const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password -role -refreshToken')
  return res.status(200).json({
    success: response ? true : false,
    updateUser: response ? response : 'Something went wrong!'
  })
})

const updateUserAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user
  if (!req.body.address) throw new Error('Missing Inputs')
  const response = await User.findByIdAndUpdate(
    _id,
    { $push: { address: req.body.address } },
    { new: true })

  return res.status(200).json({
    success: response ? true : false,
    updateUser: response ? response : 'Some thing went wrong!'
  })
})

const updateCart = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const { pid, quantity, color } = req.body
  if (!pid || !quantity || !color) throw new Error('Missing Inputs')
  const user = await User.findById(_id).select('cart')
  const alreadyProduct = user?.cart?.find(el => el.product.toString() === pid)
  if (alreadyProduct) {
    if (alreadyProduct.color === color) {
      const response = await User.updateOne(
        { cart: { $elemMath: alreadyProduct } },
        { $set: { 'cart.$quantity': quantity } },
        { new: true }
      )
      return res.status(200).json({
        success: response ? true : false,
        updateCart: response ? response : 'Some thing went wrong!'
      })
    } else {
      const response = await User.findByIdAndUpdate(
        _id,
        { $push: { cart: { product: pid, quantity, color } } },
        { new: true }
      )
      return res.status(200).json({
        success: response ? true : false,
        updateCart: response ? response : 'Some thing went wrong!'
      })
    }

  } else {
    const response = await User.findByIdAndUpdate(
      _id,
      { $push: { cart: { product: pid, quantity, color } } },
      { new: true }
    )
    return res.status(200).json({
      success: response ? true : false,
      updateCart: response ? response : 'Some thing went wrong!'
    })
  }
})

module.exports = {
  register,
  login,
  getCurrentUser,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  updateUserAddress,
  updateCart
}