declare const google: any;
import { Loader } from "@googlemaps/js-api-loader";
import { ref } from "vue";

const googleApi: any = new Loader({
  apiKey: import.meta.env.VITE_API_GOOGLE,
  version: "weekly",
  libraries: ["places"],
});

export default function useGoogleApi() {

  const isActiveClick = ref<Boolean>(true);
  const location = ref<any>({
    lat: "",
    lng: "",
  });

  async function clickMap() {
    await googleApi.load();
    const { Map } = await google.maps.importLibrary("maps");

    navigator.geolocation.getCurrentPosition(async (position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      location.value = pos;
      const map = new Map(document.getElementById("map"), {
        center: pos,
        zoom: 15,
        allowFullScreen: true,
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM,
        },
      });
      await setMarker(pos, map);
      if (isActiveClick.value) {
        google.maps.event.addListener(map, "click", async (event: any) => {
          location.value = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          }
          await setMarker(event.latLng, map);
        });
      }
    });
  }

  async function setMarker(location: any, map: any) {
    const { Marker } = await google.maps.importLibrary("marker");
    if (googleApi.autoComplete) {
      googleApi.autoComplete.setMap(null);
    }
    googleApi.autoComplete = new Marker({
      position: location,
      map,
    });
  }

  function disabledClick() {
    isActiveClick.value = false;
  }

  function enableClick() {
    isActiveClick.value = true;
  }

  return {
    clickMap, googleApi, disabledClick, enableClick, location
  };

}