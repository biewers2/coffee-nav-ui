import config from "../config";
import { Place } from "../models/Place";
import * as Location from "expo-location";
import locationService from "./LocationService";

export type SearchPlacesResults = {
  places: Place[],
  location?: Location.LocationObject,
}

export class PlacesService {
  constructor() {
    console.debug(`Using API ${config.API_HOST}:${config.API_PORT}`)
  }

  url(endpoint: string): string {
    return `http://${config.API_HOST}:${config.API_PORT}/api${endpoint}`
  }

  async searchCoffeePlaces(): Promise<SearchPlacesResults|undefined> {
    const location = await locationService.getLocation()
    if (!location) {
      console.error("failed to get location")
      return
    }

    const places = await fetch(this.url('/search'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({
        location: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        }
      })
    })
    .then(async res => {
      return res.ok
        ? await res.json()
        : console.error("failed to get places:", res.status, await res.text())
    })
    .catch(err =>
      console.error("failed to get places:", err.message)
    )

    if (places) {
      return { places, location }
    }
  }

  async getCoverPhotoUrl(photoReference: string): Promise<string> {
    return this.url(`/place/photo?reference=${photoReference}`)
  }

  async getPlace(id: string): Promise<Place> {
    return await fetch(this.url(`/place?id=${id}`), {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
    .then(async res => await res.json())
    .catch(err => console.error(err))
  }

  // private async getLocation(): Promise<Location|null> {
  //   return await GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 60000,
  //   })
  //   .catch(err => {
  //     console.error(err.message)
  //     return null;
  //   })
  // }
}

const placesService: PlacesService = new PlacesService()
export default placesService;