const Admin = require('../models/adminModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.TOKEN_SECRET, { expiresIn: '1h' })
}

const loginAdmin = async (req, res) => {
  const { username, password } = req.body

  try {
    const admin = await Admin.login(username, password)
    const token = createToken(admin._id)

    res.status(200).json({username, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const createAdmin = async (req, res) => {
  const {username, email, password} = req.body

  try {
    const admin = await Admin.new(username, email, password)
    const token = createToken(admin._id)

    res.status(200).json({username, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const deleteAdmin = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such admin'})
  }
  const admin = await Admin.findOneAndDelete({_id: id})
  if (!admin) {
    return res.status(400).json({error: 'No such admin'})
  }
  res.status(200).json(admin)
}

const updateAdmin = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such admin'})
  }
  const admin = await Admin.findOneAndUpdate({_id: id}, {
    ...req.body
  })
  if (!admin) {
    return res.status(400).json({error: 'No such admin'})
  }
  res.status(200).json(admin)
}

const getAdmin = (req, res) => {
  res.json(req.admin)
}

const getAdmins = async (req, res) => {
  const admins = await Admin.find({}).select('_id')
  res.json(admins)
}

module.exports = { createAdmin, loginAdmin, updateAdmin, deleteAdmin, getAdmin, getAdmins }