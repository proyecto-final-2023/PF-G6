export type FoodResType = {
  id: number;
  dataType: string;
  description: string;
  proteinAmount: number;
  proteinUnit: string;
  carbohydrateAmount: number;
  carbohydrateUnit: string;
  fatTransAmount: number;
  fatTransUnit: string;
  fatSaturatedAmount: number;
  fatSaturatedUnit: string;
  fatTotalAmount: number;
  fatTotalUnit: string;
  sugarsAmount: number;
  sugarsdUnit: string;
  sodiumAmount: number;
  sodiumUnit: string;
  cholesterolAmount: number;
  cholesterolUnit: string;
  energyAmount: number;
  energylUnit: string;
};

export type ExerciesResType = {
  bodyPart: string;
  equipement: string;
  gifUrl: string;
  id: number;
  name: string;
  target: string;
};
