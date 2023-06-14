import connectDB from "@src/database/dbConfig";
import userModal from "@src/models/user.modal";
import { hashPassword } from "@src/services/bcrypt";
import _ from "lodash";
import { Error } from "mongoose";

export default async function handler(req, res) {
  connectDB();
  if (req.method === "POST") {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const existing = await userModal.find({ email });
    if (_.size(existing) > 0) {
      res.status(400).json("user already exists");
    }
    const newPass = await hashPassword(password);
    const data = new userModal({ username, email, password: newPass });
    await data.save();
    res.status(200).send(data);
  }
}
