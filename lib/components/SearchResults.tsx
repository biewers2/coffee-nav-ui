import { Card, Image, Text } from "@rneui/themed";
import { Link } from 'expo-router';
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { Place } from "../models/Place";
import placesService, { SearchPlacesResults } from "../services/PlacesService";

export default function SearchResults(props: {
  results: SearchPlacesResults
}) {
  if (props.results.places.length == 0) {
    return <Text style={styles.emptyText}>No results</Text>
  }

  // const loc = props.results.location
  // const locationText = loc
    // ? <Text>Based on {loc.latitude}, {loc.longitude}</Text>
    // : <></>

  return (
    <>
      {/* {locationText} */}
      <ScrollView style={styles.scrollView}>{
        props.results.places.map(result =>
          <SearchResult key={result.id} place={result}/>
        )
      }</ScrollView>
    </>
  );
}

function SearchResult(props: {
  place: Place
}) {
  let [coverPhotoUrl, setCoverPhotoUrl] = useState(null as string|null)

  useEffect(() => {
    (async () => {
      let refs = props.place.photoReferences
      setCoverPhotoUrl(
        refs?.length > 0
          ? await placesService.getCoverPhotoUrl(refs[0])
          : null
        )
      
    })()
  })

  let placeLink = {
    pathname: 'place',
    params: {
      id: props.place.id
    }
  }
  let coverPhoto = coverPhotoUrl
      ? <Image source={{ uri: coverPhotoUrl }} style={styles.image}/>
      : <></>

  return (
    <Link href={placeLink} asChild>
      <TouchableNativeFeedback >
        <Card key={props.place.id}>
          <Card.Title>{props.place.name}</Card.Title>
          <View>
            {coverPhoto}
            <Card.Divider/>
            <Text>{props.place.address}</Text>
          </View>
        </Card>
      </TouchableNativeFeedback>
    </Link>
  )
}

const styles = StyleSheet.create({
  emptyText: {
    margin: 10,
    textAlign: "center",
    fontWeight: "bold"
  },
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