import * as Location from "expo-location";

class LocationService {
  async getLocation(): Promise<Location.LocationObject|undefined> {
    if (!await this.hasLocationPermissions() && !await this.requestLocationPermissions()) {
      return
    }
    return await Location.getCurrentPositionAsync()
      .catch(err => {
        console.error("failed get current location:", err)
        return undefined
      })
  }

  async hasLocationPermissions(): Promise<boolean> {
    let { status } = await Location.getForegroundPermissionsAsync()
      .catch(err => {
        console.error("failed to get permissions:", err)
        return { status: Location.PermissionStatus.UNDETERMINED }
      })

    return status === Location.PermissionStatus.GRANTED
  }

  async requestLocationPermissions(): Promise<boolean> {
    let { status } = await Location.requestForegroundPermissionsAsync()
      .catch(err => {
        console.error("failed to request permissions:", err)
        return { status: Location.PermissionStatus.UNDETERMINED }
      })

    return status === Location.PermissionStatus.GRANTED
  }
}

const locationService: LocationService = new LocationService()
export default locationService;