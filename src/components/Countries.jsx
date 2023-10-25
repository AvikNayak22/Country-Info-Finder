import { useState, useEffect } from "react";
import Article from "./Article";
import Pagination from "./Pagination";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;
  const regions = [
    {
      name: "Europe",
    },
    {
      name: "Asia",
    },
    {
      name: "Africa",
    },
    {
      name: "Oceania",
    },
    {
      name: "Americas",
    },
    {
      name: "Antarctic",
    },
  ];

  useEffect(() => {
    document.title = `Showing All Countries`;
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    };

    getCountries();
  }, []);

  async function searchCountry() {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${searchText}`
      );
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function filterByRegion(region) {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/region/${region}`
      );
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSearchCountry(e) {
    e.preventDefault();
    searchCountry();
  }

  function handleFilterByRegion(e) {
    e.preventDefault();
    filterByRegion();
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = countries.slice(firstPostIndex, lastPostIndex);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <>
      {!countries ? (
        <h1 className="text-gray-900 font-bold uppercase tracking-wide flex items-center justify-center text-center h-screen text-4xl dark:text-white">
          Loading...
        </h1>
      ) : (
        <section className="container mx-auto p-6 mt-16">
          {/* form */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <form
              onSubmit={handleSearchCountry}
              autoComplete="off"
              className="max-w-4xl md:flex-1"
            >
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search for a country by its name"
                required
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="py-3 px-4 text-gray-600 placeholder-gray-600 w-full shadow-md rounded outline-none focus:shadow-sm dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700 transition-all duration-200"
              />
            </form>

            <form onSubmit={handleFilterByRegion}>
              <select
                name="filter-by-region"
                id="filter-by-region"
                className="w-52 py-3 px-4 outline-none shadow-md rounded text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700"
                value={regions.name}
                onChange={(e) => filterByRegion(e.target.value)}
              >
                {regions.map((region) => (
                  <option key={region.number} value={region.name}>
                    {region.name}
                  </option>
                ))}
              </select>
            </form>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {currentPosts.map((country) => (
              <Article key={country.name.common} {...country} />
            ))}
          </div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={countries.length}
            paginateBack={paginateBack}
            paginateFront={paginateFront}
            currentPage={currentPage}
          />
        </section>
      )}
    </>
  );
}
