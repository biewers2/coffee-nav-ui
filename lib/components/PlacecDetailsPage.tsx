import { Text } from "@rneui/themed"
import { Place } from "../models/Place"
import { Icon } from "@rneui/base"
import { A } from "@expo/html-elements"
import { StyleSheet, View } from "react-native"

export default function PlaceDetailsPage(props: {
  place: Place,
}) {
  return (
    <View style={styles.view}>
      <Text h1={true}>{props.place.name}</Text>
      <Icon name=''/>
      <A href={props.place.mapsUrl}>{props.place.address}</A>
      <Text>{props.place.phoneNumber}</Text>
      <Text>{props.place.websiteUrl}</Text>
    </View>
    /*
    photos slider
    open?                           rating (reviewCount)
    [nav icon] <link ref="<url in place model>">address</> <- use 'vicinity'
    phone number
    website
    hours (dropdown?)
    */
  )
}

const styles = StyleSheet.create({
  view: {
    margin: 10
  }
});