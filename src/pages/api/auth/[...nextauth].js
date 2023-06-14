import connectDB from "@src/database/dbConfig";
import userModal from "@src/models/user.modal";
import { verifyPassword } from "@src/services/bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        connectDB();
        const { email, password } = credentials;
        console.log(email, password, "*** next auth ***");
        const data = await userModal.findOne({ email });

        if (!data) {
          throw new Error("invalid username");
        }

        const passCheck = await verifyPassword(password, data.password);

        if (!passCheck) {
          throw new Error("invalid password");
        }

        const session = {
          id: data._id,
          email,
          name: data.username,
        };

        return session;
      },
    }),
  ],
  secret: process.env.SECRET,   
});
