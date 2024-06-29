import { CarCard, CustomFilter, Hero, SearchBar } from "@/components";
import { fetchCars, fetchImages } from "@/utils";
import Image from "next/image";

export default async function Home() {
  const allCars = await fetchCars();
  let allImages = await fetchImages();

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Cars you may like</p>
        </div>
        <div className="home__filter">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title={"fuel"} />
            <CustomFilter title={"year"} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper" >
              {allCars.map((car,i) => (
                <CarCard key={i} car={car} image={allImages[i].image} />
              ))}
            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-white text-xl font-bold">Oops, no results</h2>
          </div>
        )}
      </div>
    </main>
  );
}
