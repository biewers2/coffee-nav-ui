export type Place = {
  // Required fields //

  id: string,
  photoReferences: string[],

  // Displayable fields //

  name?: string,
  address?: string,
  mapsUrl?: string,
  phoneNumber?: string,
  websiteUrl?: string,

  open?: boolean,
  hoursText?: object,

  rating?: number,
  userRatingTotal?: number,
}