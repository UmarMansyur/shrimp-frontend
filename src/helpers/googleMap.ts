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

  public async initMap(e: string): Promise<void> {
    await GoogleApi.getGoogleApi().then(async () => {
      const { Map } = await google.maps.importLibrary("maps");
      for (let a = 1; a <= 2; a++) {
        let map = new Map(document.querySelector(`.${e}-` + a), {
          zoom: 8,
        });

        const { Marker } = await google.maps.importLibrary("marker");
        new Marker({
          position: { lat: -34.397, lng: 150.644 },
          map,
        });
      }
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
}

export default GoogleApi;