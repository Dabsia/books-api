import User from "../models/user.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, age, isActive, tags } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password, // In real app, hash this password!
      age,
      isActive: isActive !== undefined ? isActive : true,
      tags: tags || [],
    });

    // Remove password from response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create user",
    });
  }
};
