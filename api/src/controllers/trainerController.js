const { Trainer } = require("../db");


const createTrainer= async (idUser, logo)=>{
    const cTrainer = await Trainer.create({logo});
    cTrainer.setUser(idUser)
    return cTrainer;
}

const addData = async (id, name, url) => {
  const user = await User.findByPk(id, {
    attributes: ["first_name", "last_name"],
    include: [
      {
        model: Membership,
        attributes: ["trainerIdTrainer"],
      },
    ],
  });

  const trainer = await Trainer.findByPk(user.membership.trainerIdTrainer);

  const social = await SocialNetworks.create({
    name,
    url,
  });
  console.log(trainer);
  await trainer.addSocialNetworks(social);
  return `El certificado ${social.name} se añadio a ${user.first_name}, ${user.last_name}`;
};
module.exports = {createTrainer}