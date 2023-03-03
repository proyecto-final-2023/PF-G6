const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const {
  User,
  Membership,
  PlanTrainee,
  Plantrainer,
  Trainer,
  Voucher,
} = require("../db");
const moment = require("moment");

const data = async () => {
  const startDate = moment().format("YYYY-MM-DD");

  const vouchers = await Voucher.findAll({
    attributes: ["cost"],
  });

  let totalCost = 0;
  for (let i = 0; i < vouchers.length; i++) {
    totalCost += parseInt(vouchers[i].cost);
  }

  //--------------------------------------------------------------------------------------

  const vouche = await Voucher.findAll({
    attributes: ["cost"],
    where: Sequelize.where(
      Sequelize.fn(
        "date_trunc",
        "month",
        Sequelize.fn(
          "to_date",
          Sequelize.col("date"),
          'YYYY-MM-DD"T"HH24:MI:SS"Z"'
        )
      ),
      Sequelize.fn("date_trunc", "month", Sequelize.fn("now"))
    ),
  });

  let totalCos = 0;
  for (let i = 0; i < vouche.length; i++) {
    totalCos += parseInt(vouche[i].cost);
  }

  console.log(`El total de costos para el mes actual es: ${totalCos}`);

  //-------------------------------------------------------------------------------------------------------
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

  const plans = await PlanTrainee.findAll();
  const countsTrainee = {};

  for (let plan of plans) {
    const membershipCount = await plan.countMemberships();
    countsTrainee[plan.name] = membershipCount;
  }

  const plansT = await Plantrainer.findAll();
  const countsTrainer = {};

  for (let plan of plansT) {
    const membershipCount = await plan.countMemberships();
    countsTrainer[plan.name] = membershipCount;
  }

  let maxCount = 0;
  let maxCountProp;

  for (let prop in countsTrainer) {
    if (countsTrainer[prop] > maxCount) {
      maxCount = countsTrainer[prop];
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
  console.log(!!sortedCountsTrainee[1]);
  let PVPtrainee1;
  let PVPtrainee2;
  let PVPtrainee3;
  if (!!sortedCountsTrainee[1]) {
    PVPtrainee1 = await PlanTrainee.findByPk(sortedCountsTrainee[1].id, {
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
  }
  if (!!sortedCountsTrainee[1]) {
  PVPtrainee2 = await PlanTrainee.findByPk(sortedCountsTrainee[2].id, {
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
  });}
  if (!!sortedCountsTrainee[1]) {
  PVPtrainee3 = await PlanTrainee.findByPk(sortedCountsTrainee[3].id, {
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
  });}
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

  const PVPtrainer = await Plantrainer.findByPk(sortedCountsTrainer[1].id);

  return {
    money: { moneyTotal: totalCost, moneyMes: totalCos },
    user: { cantUser, cantTrainer, cantTrainee },
    membership: { cantMerbership, countsTrainee, countsTrainer },
    bestPlanes: {
      Trainer: PVPtrainer,
      Trainee: { PVPtrainee1, PVPtrainee2, PVPtrainee3 },
    },
  };
};

module.exports = {
  data,
};
