import config from "../config";
import { Place } from "../models/place";

export class PlacesService {
  constructor() {
    console.debug(`Using API ${config.API_HOST}:${config.API_PORT}`)
  }

  url(endpoint: string): string {
    return `http://${config.API_HOST}:${config.API_PORT}/api${endpoint}`
  }

  async searchCoffeePlaces(): Promise<Place[]> {
    return await fetch(this.url('/search'), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
    .then(async res => res.json())
    .catch(err => console.error(err))
  }

  async getCoverPhotoUrl(photoReference: string): Promise<string> {
    return this.url(`/photos/${photoReference}`)
  }
}

const placesService: PlacesService = new PlacesService()
export default placesService;