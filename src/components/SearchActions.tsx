import { FlatList, Pressable, Text, TextInput } from "react-native";
import { FILTERS, SORTERS, SearchFilter, SearchSorter } from "../constants/search";

export default function SearchActions() {
  return (
    <>
      <SortActions sorters={SORTERS} />
      <FilterActions filters={FILTERS} />
    </>
  )
}

function SortActions(props: {
  sorters: SearchSorter[],
}) {
  return (
    <FlatList
      data={props.sorters}
      keyExtractor={item => item.id}
      numColumns={props.sorters.length}
      renderItem={({ item }) =>
        <Pressable onPress={() => console.log('clicked')}>
          <Text>{item.name}</Text>
        </Pressable>
      }
    />
  );
}

function FilterActions(props: {
  filters: SearchFilter[],
}) {
  return (
    <FlatList
      data={props.filters}
      keyExtractor={item => item.id}
      numColumns={props.filters.length}
      renderItem={({ item }) =>
        <Pressable onPress={() => console.log('clicked!')}>
          <Text>{item.name}</Text>
        </Pressable>
      }
    />
  )
}
