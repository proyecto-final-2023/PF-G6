const { Op } = require("sequelize");
const { User, Membership } = require("../db");
const data = async () => {
  const cantUser = await User.count();
  const cantTrainer = await User.count({
    where: {
      role: "trainer",
    },
  });
  const cantTrainee = await User.count({
    where: {
      role: "trainee",
    },
  });

  const cantMerbership = await Membership.count();
  return {
    user: { cantUser, cantTrainer, cantTrainee },
    membership: { cantMerbership },
  };
};

module.exports = {
  data,
};
