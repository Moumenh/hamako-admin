import { v4 as uuidv4 } from "uuid";
import {  Combination, Option  } from "./context/product.context";


export const getCombinations = (options: Option[]): Combination[] => {
  if (options.length === 0) {
    return [];
  }

  if (options.length === 1) {
    // @ts-ignore
    const values = options.shift().values;
    console.log({ values });
    if (values.length > 0) {
      // return values.map((v) => [v])
      return values.map((v) => ({
        id: uuidv4(),
        options: [v],
      }));
    }

    return [];
  }

  const combinations = [];
  // @ts-ignore
  const theseValues = options.shift().values;

  const lowerCombinations = getCombinations(options);
  for (const v of theseValues) {
    for (const second of lowerCombinations) {
      const clonedSecond = { id: uuidv4(), options: [...second.options, v] };
      combinations.push(clonedSecond);
    }
  }
  return combinations;
};