import { Dialog, Icon, SearchBar, Text } from '@rneui/themed';
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import SearchResults from '../components/SearchResults';
import placesService, { SearchPlacesResults } from '../services/PlacesService';

export default function SearchPage() {
  let [results, setResults] = useState({ places: [] } as SearchPlacesResults)
  let [showError, setShowError] = useState(false)

  let findCoffee = async () => {
    let results = await placesService.searchCoffeePlaces()
    console.log(results?.location)
    setShowError(results === null)
    if (results) {
      setResults(results)
    }
  }

  // On initial load
  useEffect(() => { findCoffee() }, [])

  return (
    <View style={styles.view}>
      {/* <SearchActions/> */}
      <SearchResults results={results}/>

      <Dialog onBackdropPress={() => setShowError(false)} isVisible={showError}>
        <Icon name='error-outline'/>
        <Dialog.Title title='Failed to find coffee'/>
        <Text>There was an issue finding coffee places nearby</Text>
      </Dialog>
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
