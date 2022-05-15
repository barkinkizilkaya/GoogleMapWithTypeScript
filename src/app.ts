import axios from "axios";

const form = document.querySelector("form")!;
const adressInput = document.getElementById("address")! as HTMLInputElement;
const GOOGLE_API_KEY = "";

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = adressInput.value;

  //send google api With axios
  axios
    .get(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        encodeURI(enteredAddress) +
        "&key=" +
        GOOGLE_API_KEY
    )
    .then((response) => {
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: coordinates,
        zoom: 8,
      });

      new google.maps.Marker({
        position: coordinates,
        map: map,
      });

      console.log(coordinates);
    })
    .catch((err) => {
      console.log(err);
    });
}
form.addEventListener("submit", searchAddressHandler);
