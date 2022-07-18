const Users = require("../schema/User");

module.exports = {
  donateToUser: async (req, res) => {
    const { amount, username } = req.body;
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        message: "Token is required",
      });
    }
    const tkn = token.split(" ")[1];
    const decoded = jwt.verify(tkn, process.env.JWT_SECRET);
    const user = await Users.findOne({
      where: {
        uuid: decoded.uuid,
      },
    });
    const userReceiveingDonation = await Users.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    if (!amount) {
      return res.status(400).json({
        message: "Amount is required",
      });
    }
    if (amount < 1) {
      return res.status(400).json({
        message: "Amount must be greater than 0",
      });
    }
    if (!userReceiveingDonation) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    userReceiveingDonation.update({
      balance: userReceiveingDonation.balance + amount,
      isNewNotification: true,
      notifications: [
        ...userReceiveingDonation.notifications,
        {
          userUuid: user.uuid,
          date: new Date(),
          message: `${user.username} donated ${amount} to you`,
          link: `/${user.username}`,
        },
      ],
    });
    await userReceiveingDonation.save();
    user.update({
      isNewNotification: true,
      notifications: [
        ...user.notifications,
        {
          userUuid: user.uuid,
          date: new Date(),
          message: `You donated ${amount} to ${userReceiveingDonation.username}`,
          link: `/${userReceiveingDonation.username}`,
        },
      ],
    });
    return res.status(200).json({
      message: "Donation successful",
    });
  },
};
