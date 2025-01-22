import axios from "axios";

const myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "aa8b28f1bb21890f9cec6ebdc6f8c4ec"); // Replace with your actual key
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

export async function getFootballLeagues() {
  const response = await axios.get(
    "https://v3.football.api-sports.io/",
    requestOptions
  );
  return response.data;
}
