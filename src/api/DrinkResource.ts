import { handleSingleDrinkResponse } from "./helpers/handleSingleDrinkResponse";
import { throwErrorIfFails } from "./helpers/throwErrorIfFails";
import { DrinkMapper } from "../mappers/DrinkMapper";
import type { DrinkDto } from "../dtos/DrinkDto";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT as string;

export class DrinksResource {
  apiEndpoint: string;

  static _instance: DrinksResource;

  private constructor() {
    this.apiEndpoint = API_ENDPOINT;
  }

  public async getRandomDrink() {
    const url = `${this.apiEndpoint}/random.php`;
    const response = await this.fetch(url);
    await throwErrorIfFails(response);
    const drinkDto = (await handleSingleDrinkResponse(response)) as DrinkDto;
    return this.mapDrink(drinkDto);
  }

  public async getThreeRandomDrinks() {
    return Promise.all([
      this.getRandomDrink(),
      this.getRandomDrink(),
      this.getRandomDrink(),
    ]);
  }

  // Isolated to help with testing
  public async fetch(url: string) {
    return fetch(url);
  }

  // Isolated to help with testing
  public async mapDrink(drinkDto: DrinkDto) {
    return DrinkMapper.toDrink(drinkDto);
  }

  public static get Instance(): DrinksResource {
    return this._instance || (this._instance = new this());
  }
}
