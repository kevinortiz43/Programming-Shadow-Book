import { useState, useEffect } from "react";
import Places from "./Places.jsx";

// const places = localStorage.getItem('place'); // array of places

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isLoading,loadingText] = useState(true)
  // have to start with empty array and update when we have the data from that fetch req

  // will send GET req to backend
  useEffect(() => {
    async function fetchPlaces() {
      // const response = await fetch("http://localhost:3000/places");
      // const resData = await response.json();

      // const resData = await fetch("http://localhost:3000/places").then(response => response.json());
    
    
      const resData = await (await fetch("http://localhost:3000/places")).json();
    
    
      setAvailablePlaces(resData.places);
    }

    fetchPlaces()

    // fetch("http://localhost:3000/places")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((resData) => {
    //     setAvailablePlaces(resData.places);
    //   });
  }, []); // useEffect will activate only once since dependency is empty (since there's nothing inside the array to trigger a change)

  return (
    <Places
      title="Available Places"
      places={availablePlaces}


      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
