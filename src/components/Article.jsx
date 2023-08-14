import { NavLink } from "react-router-dom";

export default function Article({
  flags,
  name,
  population,
  region,
  subregion,
}) {
  return (
    <>
      <NavLink to={`/${name.common}`}>
        <article className="bg-[#FFFFFF] border-[1px] border-black hover:border-[#9191E9] dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 rounded-lg shadow-md overflow-hidden active:border-b-4 active:border-indigo-500">
          <img src={flags.svg} alt="" className="md:h-72 w-full object-cover" />
          <div className="p-4">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              {name.common}
            </h2>
            <ul className="flex flex-col items-start justify-start gap-2 dark:text-gray-400">
              <li>Population: {population.toLocaleString()}</li>
              <li>Region: {region}</li>
              <li>Subregion: {subregion}</li>
            </ul>
          </div>
        </article>
      </NavLink>
    </>
  );
}
