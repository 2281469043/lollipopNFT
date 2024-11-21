import { Slideshow } from "./slideshow.js";

const slideItems = document.querySelectorAll(".slideshow-item");
// Create a new slideshow with the slide items, autoplay enabled, and a 2.5s interval
new Slideshow(Array.from(slideItems), true, 2500);
