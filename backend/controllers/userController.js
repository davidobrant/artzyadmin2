const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.TOKEN_SECRET, { expiresIn: '1d' })
}

const getUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }
    const user = await User.findOne({_id: id}).select('_id')
    if (!user) {
        return res.status(400).json({error: 'No such user'})
    }
    res.status(200).json(user)
}
  
const getUsers = async (req, res) => {
    const users = await User.find({}).select('_id')
    res.status(200).json(users)
}

const updateUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }
    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!user) {
        return res.status(400).json({error: 'No such user'})
    }
    res.status(200).json(user)
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }
    const user = await User.findOneAndDelete({_id: id})
    if (!user) {
        return res.status(400).json({error: 'No such user'})
    }
    res.status(200).json(user)
}

const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const signupUser = async (req, res) => {
  const {firstname, lastname, email, password} = req.body
  try {
    const user = await User.new(firstname, lastname, email, password)
    const token = createToken(user._id)
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


module.exports = { 
    updateUser, 
    deleteUser, 
    getUser, 
    getUsers,
    signupUser,
    loginUser 
}