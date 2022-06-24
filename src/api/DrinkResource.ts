import { handleSingleDrinkResponse } from "./helpers/handleSingleDrinkResponse";
import { throwErrorIfFails } from "./helpers/throwErrorIfFails";

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
    return handleSingleDrinkResponse(response);
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

  public static get Instance(): DrinksResource {
    return this._instance || (this._instance = new this());
  }
}
