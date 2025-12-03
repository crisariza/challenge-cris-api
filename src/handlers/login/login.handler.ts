import User from "../../models/user";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResult {
  name: string;
  token: string;
}

export const generateToken = (email: string): string => {
  // Dummy token
  return Buffer.from(`${email}:${Date.now()}`).toString("base64");
};

export const loginHandler = async (
  credentials: LoginCredentials
): Promise<LoginResult> => {
  const { email, password } = credentials;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(email);

  return {
    name: user.username,
    token,
  };
};
