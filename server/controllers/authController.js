import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
export { signupUser, loginUser };