export default function Pagination({
  postsPerPage,
  totalPosts,
  paginateFront,
  paginateBack,
  currentPage,
}) {
  return (
    <div className="py-2 flex flex-row items-center justify-center mt-8">
      <nav className="block"></nav>
      <div>
        <nav
          className="relative z-0 inline-flex rounded-md  items-center px-4"
          aria-label="Pagination"
        >
          <a
            onClick={() => {
              paginateBack();
            }}
            href="#"
            className="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-[#E5E7EB] dark:bg-gray-800"
          >
            <span>Previous</span>
          </a>
          <div>
            <p className="text-sm text-gray-700 px-4">
              Showing
              <span className="font-medium px-2">
                {currentPage * postsPerPage - 9}
              </span>
              to
              <span className="font-medium px-2">
                {currentPage * postsPerPage}
              </span>
              of
              <span className="font-medium"> {totalPosts} </span>
              results
            </p>
          </div>
          <a
            onClick={() => {
              paginateFront();
            }}
            href="#"
            className="relative inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-[#E5E7EB] dark:bg-gray-800"
          >
            <span>Next</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
