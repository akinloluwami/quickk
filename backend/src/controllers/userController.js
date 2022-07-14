const User = require("../schema/User");

module.exports = {
  getUserByUsername: async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      message: "User retrieved successfully",
      uuid: user.uuid,
    });
  },
};
//   /*****************************************************/
