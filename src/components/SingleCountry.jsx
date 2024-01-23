// Importing necessary dependencies from React and Leaflet
import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Functional component for displaying details of a single country
export default function SingleCountry() {
  // State variables for storing country details, current map reference, and extracting route parameters
  const [country, setCountry] = useState([]);
  const { name } = useParams();
  const mapRef = useRef(null);

  // Fetch country data when the component mounts or when the 'name' parameter changes
  useEffect(() => {
    const getSingleCountry = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await res.json();
        setCountry(data);
      } catch (error) {
        console.error(error);
      }
    };

    getSingleCountry();
  }, [name]);

  // Update document title based on the selected country's name
  useEffect(() => {
    document.title = `Countries | ${name}`;
  }, [name]);

  // Initialize the Leaflet map when the component mounts
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([0, 0], 2);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        mapRef.current
      );
    }
  }, []);

  // Update the map view and add a marker when the country data changes
  useEffect(() => {
    if (mapRef.current && country.length > 0) {
      const { latlng } = country[0];
      if (latlng && latlng.length === 2) {
        mapRef.current.setView(latlng, 6);
        L.marker(latlng).addTo(mapRef.current);
      }
    }
  }, [country]);

  // JSX rendering of the component
  return (
    <>
      <section className="p-8 md:py-0 max-w-7xl mx-auto">
        {/* Mapping over the country array to display country details */}
        {country.map((item) => (
          <div
            key={item.population}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center md:h-screen"
          >
            <article>
              <img src={item.flags.svg} alt={item.name.common} />
            </article>

            <article>
              <h1 className="mb-8 font-bold text-gray-900 dark:text-white text-4xl lg:text-6xl">
                {item.name.official}
              </h1>

              {/* Displaying various country details */}
              <ul className="my-4 flex flex-col items-start justify-start gap-2 text-slate-700 dark:text-gray-400">
                <li>Capital: {item.capital[0]}</li>
                <li>Population: {item.population.toLocaleString()}</li>
                <li>Region: {item.region}</li>
                <li>Subregion: {item.subregion}</li>
              }

              {/* Displaying borders if available */}
              {item.borders && (
                <>
                  <h3 className="text-gray-900 font-bold text-lg mb-2 ">
                    Borders :
                  </h3>
                  <ul className="flex flex-wrap items-start justify-start gap-2">
                    {item.borders.map((border) => (
                      <li
                        key={border.number}
                        className="bg-white p-2 rounded text-xs tracking-wide shadow-md text-gray-700"
                      >
                        {border}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </article>
          </div>
        ))}
      </section>
      {/* Map container */}
      <section className="map-container">
        <h2 className="text-gray-900 font-bold text-2xl mb-2 ml-8 md:ml-16 ">
          Country Map :
        </h2>
        {/* Div element to contain the Leaflet map */}
        <div
          id="map"
          className="h-48 md:h-96 w-auto flex justify-center my-7 mx-8 md:mx-16 border border-gray-700"
        ></div>
      </section>
      {/* Link to navigate back to the home page */}
      <Link
        to="/"
        className="inline-block mt-2 mb-11  ml-8 md:ml-16  bg-white py-2 px-6 rounded  shadow-md text-gray-700 hover:bg-gray-200 transition-all duration-200 "
      >
        &larr; Back
      </Link>
    </>
  );
}

