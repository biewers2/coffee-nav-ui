export type Place = {
  placeId: string,
  photoReferences: string[],
  name?: string,
  address?: string,
  rating?: number,
  open?: boolean,
  userRatingTotal?: number,
}