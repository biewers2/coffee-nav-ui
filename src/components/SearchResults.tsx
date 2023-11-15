import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Image, Text } from "@rneui/themed";
import { Place } from "../models/place";
import placesService from "../services/places";
import { useEffect, useState } from "react";

export default function SearchResults(props: {
  results: Place[]
}) {
  return (
    <ScrollView style={styles.scrollView}>{
      props.results.map(result =>
        <SearchResult key={result.placeId} result={result}/>
      )
    }</ScrollView>
  );
}

function SearchResult(props: {
  result: Place
}) {
  let [coverPhotoUrl, setCoverPhotoUrl] = useState(null as string|null)

  useEffect(() => {
    (async () => {
      let refs = props.result.photoReferences
      setCoverPhotoUrl(
        refs?.length > 0
          ? await placesService.getCoverPhotoUrl(refs[0])
          : null
        )
      
    })()
  })

  return (
    <Card key={props.result.placeId}>
      <Card.Title>{props.result.name}</Card.Title>
      <View>
        {
          coverPhotoUrl
            ? <Image source={{ uri: coverPhotoUrl }} style={styles.image}/>
            : <></>
        }
        <Card.Divider/>
        <Text>{props.result.address}</Text>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    margin: "auto",
    maxWidth: 1200,
    width: "100%"
  },
  image: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  }
});