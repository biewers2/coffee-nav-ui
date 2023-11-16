import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import PlaceDetailsPage from '../lib/components/PlacecDetailsPage';
import { Place } from '../lib/models/Place';
import placesService from '../lib/services/PlacesService';

export default function Page() {
  const { id } = useLocalSearchParams();

  let [place, setPlace] = useState(null as Place|null)
  useEffect(() => {
    (async () => {
      if (id && typeof id === "string") {
        setPlace(await placesService.getPlace(id))
      }
    })()
  })

  return place ? <PlaceDetailsPage place={place}></PlaceDetailsPage> : <></>
}
