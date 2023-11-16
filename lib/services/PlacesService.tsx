import config from "../config";
import { Place } from "../models/Place";

export class PlacesService {
  constructor() {
    console.debug(`Using API ${config.API_HOST}:${config.API_PORT}`)
  }

  url(endpoint: string): string {
    return `http://${config.API_HOST}:${config.API_PORT}/api${endpoint}`
  }

  async searchCoffeePlaces(): Promise<Place[]|null> {
    return await fetch(this.url('/search'), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
    .then(async res => await res.json())
    .catch(err => {
      console.error(err.message)
      return null;
    })
  }

  async getCoverPhotoUrl(photoReference: string): Promise<string> {
    return this.url(`/place/photo/${photoReference}`)
  }

  async getPlace(id: string): Promise<Place> {
    return await fetch(this.url(`/place/${id}`), {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
    .then(async res => await res.json())
    .catch(err => console.error(err))
  }
}

const placesService: PlacesService = new PlacesService()
export default placesService;