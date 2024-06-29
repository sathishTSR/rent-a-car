import { ResponseOptions } from "@/types";

const options : ResponseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process?.env["NEXT_PUBLIC_RAPID_API_KEY"],
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  },
};



export async function fetchCars() {
  const url = "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla";
  if(process?.env["NEXT_PUBLIC_RAPID_API_KEY"]){
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  }
}
export async function fetchImages() {
  const url =
    "https://api.sketchfab.com/v3/search?q=corolla&downloadable=true&max_vertex_count=50000&sort_by=createdAt";
  const response = await fetch(url);
  const result = await response.json();
  let images = await result.results.models.map((val: any, index: Number) => {
    // console.log('val: ', val);
    let image = {
      uid: val.uid,
      image: val.thumbnails.images[0].url,
    };

    return image;
  });

  return images;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};
// view model
// <iframe
//   id="view360Iframe"
//   width="100%"
//   scrolling="0"
//   src="https://sketchfab.com/models/3594fc0137aa4727b3aa6ddc6575c84c/embed?ui_infos=0&amp;ui_watermark=0&amp;ui_help=0&amp;ui_settings=0&amp;ui_inspector=0&amp;ui_annotations=0&amp;ui_stop=0&amp;ui_vr=0&amp;preload=1&amp;autostart=1&amp;ui_hint=2&amp;autospin=0.2"
// ></iframe>;
