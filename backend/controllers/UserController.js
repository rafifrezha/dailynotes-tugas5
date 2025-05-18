import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function getUser(req, res) {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'username']
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ 
      status: "Error", 
      message: error.message 
    });
  }
}

async function register(req, res) {
  try {
    const { email, username, password } = req.body;
    
    const existingUser = await User.findOne({
      where: {
        email: email
      }
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        status: "Error", 
        message: "Email already registered" 
      });
    }
    
    const encryptedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
      email,
      username,
      password: encryptedPassword,
      refresh_token: null
    });
    
    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    
    res.status(201).json({
      status: "Success",
      message: "Registration successful",
      data: userWithoutPassword
    });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ 
      status: "Error", 
      message: error.message 
    });
  }
}

async function login(req, res) {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({
        where: { email }
      });
  
      if (!user) {
        return res.status(400).json({ status: "Error", message: "Invalid email or password" });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
  
      if (!validPassword) {
        return res.status(400).json({ status: "Error", message: "Invalid email or password" });
      }
  
      const userPlain = user.toJSON();
      const { password: _, refresh_token: __, ...safeUserData } = userPlain;
  
      const accessToken = jwt.sign(safeUserData, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30s"
      });
  
      const refreshToken = jwt.sign(safeUserData, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d"
      });
  
      await User.update(
        { refresh_token: refreshToken },
        { where: { id: user.id } }
      );
  
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
      });
  
      res.status(200).json({
        status: "Success",
        message: "Login successful",
        data: safeUserData,
        accessToken,
      });
  
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
}
  
async function logout(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.sendStatus(204);
  
      const user = await User.findOne({
        where: { refresh_token: refreshToken }
      });
  
      if (!user) {
        return res.sendStatus(204);
      }
  
      await User.update(
        { refresh_token: null },
        { where: { id: user.id } }
      );
  
      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
  
      res.sendStatus(200);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
}

export { login, logout, getUser, register };