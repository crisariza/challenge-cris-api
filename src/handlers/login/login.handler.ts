import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import User from "../../models/user";
import { signToken } from "../../config/auth";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResult {
  name: string;
  token: string;
}

// Compared against when the email does not exist, so a missing user takes
// as long as a wrong password and the response time doesn't reveal emails
const dummyHash = bcrypt.hash(randomUUID(), 10);

export const loginHandler = async (
  credentials: LoginCredentials
): Promise<LoginResult> => {
  const { email, password } = credentials;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    await bcrypt.compare(password, await dummyHash);
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = signToken({ id: user.id, email: user.email });

  return {
    name: user.username,
    token,
  };
};
