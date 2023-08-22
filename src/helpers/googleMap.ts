import { Loader } from "@googlemaps/js-api-loader";
declare const google: any;
class GoogleApi {
  protected static googleapi: any;
  static autoComplete: any;

  public constructor() {
    if (!GoogleApi.googleapi) {
      GoogleApi.googleapi = new Loader({
        apiKey: import.meta.env.VITE_API_GOOGLE,
        version: "weekly",
        libraries: ['places'],
      });
      return;
    }
    return GoogleApi.googleapi;
  }

  public static async getGoogleApi(): Promise<any> {
    if (!GoogleApi.googleapi) {
      new GoogleApi();
      await GoogleApi.googleapi.load();
    }
    return GoogleApi.googleapi;
  }

  public static async initMap(e: string): Promise<void> {
    await GoogleApi.getGoogleApi().then(async () => {
      const { Map } = await google.maps.importLibrary("maps");
      const map = new Map(document.getElementById(e), {
      });
      // get current location
      const pos = await GoogleApi.getCurrentLocation();
      // set marker
      GoogleApi.addMarker(pos, map);
      // set center map
      map.setCenter(pos);
    });
  }

  public static async getCurrentLocation(): Promise<any> {
    await GoogleApi.getGoogleApi().then(async () => {
      // get current location
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        return pos;
      });
    });
  }



  public static async initAutocomplete(): Promise<void> {
    await GoogleApi.getGoogleApi().then(async () => {
      const input = document.getElementById("autocomplete");
      const options = {
        componentRestrictions: { country: "id" },
        fields: ["address_components", "geometry", "icon", "name"],
        strictBounds: false,
      };
      new google.maps.places.Autocomplete(input, options);
    });
  }

  public static async clickMap(): Promise<void> {
    await GoogleApi.getGoogleApi().then(async () => {
      const { Map } = await google.maps.importLibrary("maps");
      const pos = await GoogleApi.getCurrentLocation();
      const map = new Map(document.getElementById("map"), {
        center: pos,
        zoom: 13,
        allowFullScreen: true,
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM,
        },

      });

      google.maps.event.addListener(map, "click", function (event: any) {
        GoogleApi.addMarker(event.latLng, map);
      });
    });
  }

  public static async addMarker(location: any, map: any): Promise<void> {
    const { Marker } = await google.maps.importLibrary("marker");
    // jika ada marker sebelumnya maka hapus
    if (GoogleApi.autoComplete) {
      GoogleApi.autoComplete.setMap(null);
    }
    // set marker baru
    GoogleApi.autoComplete = new Marker({
      position: location,
      map,
    });
  }

}

export default GoogleApi;