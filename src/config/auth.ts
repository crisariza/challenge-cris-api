import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//? JWT config
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

// Validate required environment variables
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error(
    "Missing or too short JWT_SECRET environment variable (min 32 characters)"
  );
}

const SECRET: string = JWT_SECRET;
const ALGORITHM = "HS256";
const EXPIRES_IN = (JWT_EXPIRES_IN || "1h") as SignOptions["expiresIn"];

export interface AuthUser {
  id: number;
  email: string;
}

export const signToken = (user: AuthUser): string => {
  return jwt.sign({ email: user.email }, SECRET, {
    algorithm: ALGORITHM,
    subject: String(user.id),
    expiresIn: EXPIRES_IN,
  });
};

// Throws if the token is invalid, expired or signed with another algorithm
export const verifyToken = (token: string): AuthUser => {
  const payload = jwt.verify(token, SECRET, { algorithms: [ALGORITHM] });

  if (typeof payload === "string") {
    throw new Error("Invalid token payload");
  }

  const id = Number(payload.sub);
  if (!Number.isInteger(id) || id <= 0 || typeof payload.email !== "string") {
    throw new Error("Invalid token payload");
  }

  return { id, email: payload.email };
};
