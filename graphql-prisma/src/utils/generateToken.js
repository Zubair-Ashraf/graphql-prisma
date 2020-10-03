import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ userId }, "thisissecret", {
    expiresIn: "2 days",
  });
};

export { generateToken as default };
