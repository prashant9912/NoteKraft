import jwt from "jsonwebtoken";

type PayloadType = { [key: string]: any };

const JWT_KEY = process.env.JWT_KEY || "";

export const jwtUtil = {
  getToken: <T extends PayloadType>(json: T) => {
    return jwt.sign(json, JWT_KEY, { expiresIn: "1h" });
  },

  verifyToken: <T extends PayloadType>(jwtToken: string) => {
    try {
      return jwt.verify(jwtToken, JWT_KEY);
    } catch {
      return false;
    }
  },
};
