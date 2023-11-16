import { Card, Image, Text } from "@rneui/themed";
import { Link, router } from 'expo-router';
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { Place } from "../models/Place";
import placesService from "../services/PlacesService";

export default function SearchResults(props: {
  results: Place[]
}) {
  if (props.results.length == 0) {
    return <Text style={styles.emptyText}>No results</Text>
  }

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

  let placeLink = {
    pathname: 'place',
    params: {
      id: props.result.placeId
    }
  }
  let coverPhoto = coverPhotoUrl
      ? <Image source={{ uri: coverPhotoUrl }} style={styles.image}/>
      : <></>

  return (
    <Link href={placeLink} asChild>
      <TouchableNativeFeedback>
        <Card key={props.result.placeId}>
          <Card.Title>{props.result.name}</Card.Title>
          <View>
            {coverPhoto}
            <Card.Divider/>
            <Text>{props.result.address}</Text>
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