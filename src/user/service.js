import bcrypt from "bcrypt";
import { generateToken, handleResponse } from "../helpers/util";
import Users from "../user/user_model";

class UserServices {
    static async loginUser(req, res) {
        const { email, password } = req.body

        try {
            let user = await Users.findOne({ email });
            if (!user) {
                return handleResponse(res, 401, "Invalid Credentials");
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return handleResponse(res, 401, "Invalid Credentials");
            }
            const token = generateToken({
                _id: user._id,
                role: user._doc.role,
                email: user._doc.email,
                passwordResetRequired: user._doc.passwordResetRequired,
            });
            return handleResponse(res, 200, "Successfully login", {
                ...user._doc,
                _id: user._id,
                password: undefined,
                token,
            });
        } catch (error) {
            return handleResponse(res, 500, "Some error occured");
        }
    }

    static async registerUser(req, res) {
        try {
            const {
                full_name,
                email,
                phone_number,
                password,
            } = req.body; 

            const user = new Users({
                full_name,
                email,
                phone_number,
                password,
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();
            let token = generateToken({ ...user._doc });
            res.status(200).json({
                user: { ...user._doc, token },
            });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}

export default UserServices;