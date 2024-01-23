// Importing necessary dependencies and components
import { useState, useEffect } from "react";
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';
import Article from "./Article";

// Main functional component for displaying countries
export default function Countries() {
  // State variables
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Number of countries to display per page
  const postsPerPage = 9;

  // Regions for filtering countries
  const regions = [
    { name: "Europe" },
    { name: "Asia" },
    { name: "Africa" },
    { name: "Oceania" },
    { name: "Americas" },
    { name: "Antarctic" },
  ];

  // Effect hook to set document title on component mount
  useEffect(() => {
    document.title = `Showing All Countries`;
  }, []);

  // Effect hook to fetch all countries data on component mount
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

  // Function to search for a country by name
  async function searchCountry() {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${searchText}`);
      if (!res.ok) {
        // Display a warning if the country is not found
        swal({
          title: "Country does not exist.",
          icon: "warning",
        });
        throw new Error("Country not found or request failed");
      }

      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Function to filter countries by region
  async function filterByRegion(region) {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Event handler for searching a country
  function handleSearchCountry(e) {
    e.preventDefault();
    searchCountry();
  }

  // Event handler for filtering countries by region
  function handleFilterByRegion(e) {
    e.preventDefault();
    filterByRegion();
  }

  // Pagination calculations
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = countries.slice(firstPostIndex, lastPostIndex);

  // JSX rendering
  return (
    <>
      {!countries ? (
        // Loading message when countries data is not available
        <h1 className="text-gray-900 font-bold uppercase tracking-wide flex items-center justify-center text-center h-screen text-4xl dark:text-white">
          Loading...
        </h1>
      ) : (
        // Main content when countries data is available
        <section className="container mx-auto p-6 mt-16">
          {/* Search and filter form */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <form
              onSubmit={handleSearchCountry}
              autoComplete="off"
              className="max-w-4xl md:flex-1"
            >
              {/* Input for searching a country by name */}
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
              {/* Dropdown for filtering countries by region */}
              <select
                name="filter-by-region"
                id="filter-by-region"
                className="w-52 py-3 px-4 outline-none shadow-md rounded text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700"
                value={regions.name}
                onChange={(e) => filterByRegion(e.target.value)}
              >
                {regions.map((region) => (
                  <option key={region.name} value={region.name}>
                    {region.name}
                  </option>
                ))}
              </select>
            </form>
          </div>

          {/* Displaying countries in a grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {currentPosts.map((country) => (
              <Article key={country.name.common} {...country} />
            ))}
          </div>

          {/* Pagination component */}
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={Math.ceil(countries.length / postsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(selected) => setCurrentPage(selected.selected + 1)}
            containerClassName={'flex justify-center items-center mt-8 p-4'}
            pageClassName={"mx-1 px-4 py-2 bg-white border border-gray-300  rounded-full"}
            previousLinkClassName={'px-4 py-2 bg-white border border-gray-300 rounded-full mr-2'}
            nextLinkClassName={'px-4 py-2 bg-white border border-gray-300 rounded-full ml-2'}
            disabledClassName={'text-gray-500 cursor-not-allowed'}
            activeClassName={'bg-blue-500 text-white'}
          />
        </section>
      )}
    </>
  );
}

