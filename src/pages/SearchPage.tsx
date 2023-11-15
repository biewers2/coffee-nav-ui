import { SearchBar } from '@rneui/themed';
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import SearchResults from '../components/SearchResults';
import { Place } from '../models/place';
import placesService from '../services/places';

export default function SearchPage() {
  let [query, setQuery] = useState('')
  let [results, setResults] = useState([] as Place[])

  let findCoffee = async () => {
    setResults(await placesService.searchCoffeePlaces())
  }

  // On initial load
  useEffect(() => { findCoffee() }, [])

  return (
    <View style={styles.view}>
      <SearchBar
        placeholder="Location Search"
        inputContainerStyle={styles.inputContainerStyle}
        onChangeText={text => setQuery(text)}
        onSubmitEditing={findCoffee}
        value={query}
      />
      {/* <SearchActions/> */}
      <SearchResults results={results}/>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    margin: 0,
    width: "100%",
  },
  inputContainerStyle: {
    margin: "auto",
    maxWidth: 1200,
  }
})
