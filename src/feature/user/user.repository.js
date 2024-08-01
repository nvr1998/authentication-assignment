import User from "./user.schema.js";

export const createUser = async (email, password) => {
  const user = new User({ email, password });
  return await user.save();
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const updateUserPassword = async (email, newPassword) => {
  return await User.findOneAndUpdate(
    { email },
    { password: newPassword },
    { new: true }
  );
};
