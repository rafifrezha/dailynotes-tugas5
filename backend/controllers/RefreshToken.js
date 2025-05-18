import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(403).json({ message: "Refresh token diperlukan" });
    }

    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user || user.refresh_token !== refreshToken) {
      return res.status(403).json({ message: "Refresh token tidak valid" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Refresh token tidak valid" });
      }

      const newAccessToken = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );

      const newRefreshToken = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" } 
      );

      user.refresh_token = newRefreshToken;
      user.save();

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
      });

      res.status(200).json({
        status: "Berhasil",
        message: "Access token baru berhasil dibuat",
        accessToken: newAccessToken,
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};