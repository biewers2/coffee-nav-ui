import { Text } from "@rneui/themed"
import { Place } from "../models/Place"

export default function PlaceDetailsPage(props: {
  place: Place,
}) {
  return (
    <Text>{props.place.name}</Text>
  )
}