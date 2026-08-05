import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(404).json({
                message: "User already exists",
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userNew = new User({
            name,
            email,
            password: hashedPassword
        })
        await userNew.save();
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: userNew._id,
                name: userNew.name,
                email: userNew.email,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email })

        if (!findUser) {
            return res.status(400).json({
                message: "User Not Found"
            })
        }
        const isMatch = await bcrypt.compare(password, findUser.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password",
            });
        }

        const token = jwt.sign(
            {
                id: findUser._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: findUser._id,
                name: findUser.name,
                email: findUser.email,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }


}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Generate a 6-digit random code
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        // Save code and expiry (15 minutes)
        user.resetToken = code;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
        await user.save();

        // Send reset code email using nodemailer
        const html = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Password Reset Request</h2>
            <p>Hello ${user.name || "User"},</p>
            <p>You requested a password reset for your Finance Tracker account. Please use the following 6-digit verification code to complete the reset process:</p>
            <div style="text-align: center; margin: 30px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; background-color: #f1f5f9; padding: 10px 20px; border-radius: 8px; border: 1px solid #cbd5e1; color: #0f172a;">${code}</span>
            </div>
            <p>This code is valid for <strong>15 minutes</strong>. If you did not make this request, you can safely ignore this email.</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;">
            <p style="font-size: 11px; color: #64748b; text-align: center;">Finance Tracker &copy; ${new Date().getFullYear()}</p>
          </div>
        `;

        await sendEmail({
            email: user.email,
            subject: "Your Password Reset Code - Finance Tracker",
            html,
        });

        res.status(200).json({
            message: "Reset code sent to your email.",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, code, newPassword } = req.body;

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long",
            });
        }

        const user = await User.findOne({
            email,
            resetToken: code,
            resetTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired reset code",
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        // Clear reset fields
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();

        res.status(200).json({
            message: "Password reset successful. You can now log in.",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export { signupUser, loginUser, forgotPassword, resetPassword };