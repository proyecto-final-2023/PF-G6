const {
  User,
  Membership,
  PlanTrainee,
  Plantrainer,
  Trainer,
} = require("../db");

const data = async () => {
  const countUser = await User.count();
  const countTrainer = await User.count({
    where: {
      role: "trainer",
    },
  });
  const countTrainee = await User.count({
    where: {
      role: "trainee",
    },
  });

  const countMerbership = await Membership.count();

  const plans = await PlanTrainee.findAll();
  const countTraineeMembership = {};

  for (let plan of plans) {
    const membershipCount = await plan.countMemberships();
    countTraineeMembership[plan.name] = membershipCount;
  }

  const plansT = await Plantrainer.findAll();
  const countTrainerMembership = {};

  for (let plan of plansT) {
    const membershipCount = await plan.countMemberships();
    countTrainerMembership[plan.name] = membershipCount;
  }

  let maxCount = 0;
  let maxCountProp;

  for (let prop in countTrainerMembership) {
    if (countTrainerMembership[prop] > maxCount) {
      maxCount = countTrainerMembership[prop];
      maxCountProp = prop;
    }
  }

  // -------------------------------------------------------------------------------------
  const betsTrainee = {};
  let i = 0;
  for (let plan of plans) {
    i++;
    const membershipCount = await plan.countMemberships();
    betsTrainee[i] = {
      id: plan.id_PlanTrainee,
      name: plan.name,
      count: membershipCount,
    };
  }

  const sortedCountsTrainee = Object.entries(betsTrainee)
    .sort((a, b) => b[1].count - a[1].count)
    .reduce((obj, [key, value], i) => {
      obj[i + 1] = value;
      return obj;
    }, {});

  // sortedCountsTrainee is an object with [number] as key
  const sortedTraineesIds = [];
  for (let index = 0; index < sortedCountsTrainee.length; index++) {
    sortedTraineesIds.push(sortedCountsTrainee[index]?.id);
  }

  const MVPTrainees = await PlanTrainee.findAll({
    where: {
      id_PlanTrainee: sortedTraineesIds,
    },
    attributes: {
      exclude: ["id_PlanTrainee", "category", "trainerIdTrainer"],
    },
    include: [
      {
        model: Trainer,
        attributes: {
          exclude: ["id_trainer"],
        },
        include: [
          {
            model: Membership,
            attributes: {
              exclude: [
                "id_membership",
                "startDate",
                "finishDate",
                "userId",
                "plantrainerIdPlanTrainer",
                "planTraineeIdPlanTrainee",
                // "trainerIdTrainer",
                "traineeIdTrainee",
              ],
            },
            include: [{ model: User }],
          },
        ],
      },
    ],
  });

  //  -----------------------------------------------------------------------
  const betsTrainer = {};
  let j = 0;
  for (let plan of plansT) {
    j++;
    const membershipCount = await plan.countMemberships();
    betsTrainer[j] = {
      id: plan.id_planTrainer,
      name: plan.name,
      count: membershipCount,
    };
  }

  const sortedCountsTrainer = Object.entries(betsTrainer)
    .sort((a, b) => b[1].count - a[1].count)
    .reduce((obj, [key, value], i) => {
      obj[i + 1] = value;
      return obj;
    }, {});

  const MVPtrainer = await Plantrainer.findByPk(sortedCountsTrainer[1].id);

  return {
    user: { countUser, countTrainer, countTrainee },
    membership: {
      countMerbership,
      countTraineeMembership,
      countTrainerMembership,
    },
    bestPlans: {
      Trainer: MVPtrainer,
      Trainee: MVPTrainees,
    },
  };
};

module.exports = {
  data,
};
