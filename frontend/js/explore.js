import { Slideshow } from "./slideshow.js";
import { Select, Option } from "./select.js";

const slideItems = document.querySelectorAll(".slideshow-item");

new Slideshow(Array.from(slideItems), true, 2500);

const select = document.getElementById("explore-select");
const options = select.querySelectorAll("option");
// function clickPostTimeSort() {
//   console.log("sort by post time");
// }

// function clickMostPopularSort() {
//   console.log("sort by most popular");
// }

// function clickPriceSort() {
//   console.log("sort by price");
// }
const postTimeSortOption = new Option(options[0], clickPostTimeSort);
const mostPopularSortOption = new Option(options[1], clickMostPopularSort);
const priceSortOption = new Option(options[2], clickPriceSort);

new Select(select, [
  postTimeSortOption,
  mostPopularSortOption,
  priceSortOption,
]);