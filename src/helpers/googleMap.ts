declare const google: any;
import { Loader } from "@googlemaps/js-api-loader";
import { ref } from "vue";

const googleApi: any = new Loader({
  apiKey: import.meta.env.VITE_API_GOOGLE,
  version: "weekly",
  libraries: ["places"],
});

export default function useGoogleApi(defaultLocation?: any) {

  const isActiveClick = ref<Boolean>(true);
  const location = ref<any>({
    lat: "",
    lng: "",
  });

  async function clickMap(el: any, latitude?: any, longitude?: any) {
    await googleApi.load();
    if (defaultLocation && defaultLocation.lat) location.value = defaultLocation;
    if (latitude && longitude) {
      const map = await setCenterMap(el, {
        lat: latitude,
        lng: longitude,
      });
      await updateMarker(map, {
        lat: latitude,
        lng: longitude,
      });
      return;
    }
    if (location.value.lat !== "" && location.value.lng !== "") {
      const map = await setCenterMap(el, location.value);
      await setMarker(location.value, map);
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      location.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      const map = await setCenterMap(el, location.value);
      await setMarker(location.value, map);
      if (isActiveClick.value) {
        google.maps.event.addListener(map, "click", async (event: any) => {
          location.value = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
          await setMarker(event.latLng, map);
        });
      }
    });
  }


  let markerInstance: any = null;

  async function updateMarker(map: any, location: any) {
    if (markerInstance) {
      markerInstance.setMap(null);
    }

    markerInstance = new google.maps.Marker({
      position: location,
      map: map,
    });
  }

  async function setMarker(location: any, map: any) {
    const { Marker } = await google.maps.importLibrary("marker");
    if (markerInstance) markerInstance.setMap(null);
    const marker = new Marker({
      position: location,
      map: map,
    });
    markerInstance = marker;
  }

  async function setCenterMap(el: any, position: any) {
    const { Map } = await google.maps.importLibrary("maps");
    return new Map(el, {
      center: position,
      zoom: 15,
      allowFullScreen: true,
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
      },
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