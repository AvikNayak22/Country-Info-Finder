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
            className="relative inline-flex items-center px-3 py-3 rounded-md shadow-md bg-white text-sm font-medium  hover:bg-[#E5E7EB] dark:bg-gray-800"
          >
            <span><i class="bi bi-arrow-left"></i></span>
          </a>
          <div>
            <p className="text-sm text-[#2f2f36] px-4">
              Showing
              <span className="font-medium px-2">
                {currentPage * postsPerPage - 8}
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
            className="relative inline-flex items-center px-3 py-3 rounded-md shadow-md bg-white text-sm font-medium  hover:bg-[#E5E7EB] dark:bg-gray-800"
          >
            <span><i class="bi bi-arrow-right"></i></span>
          </a>
        </nav>
      </div>
    </div>
  );
}

