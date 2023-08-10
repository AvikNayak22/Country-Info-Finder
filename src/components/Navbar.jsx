const Navbar = () => {
  return (
    <nav className="bg-[#F1F1F1] shadow-md dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div href="#" className="flex items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/009/314/440/original/earth-globe-clip-art-vector-illustration-isolated-free-png.png"
            className="h-8 mr-3"
            alt=""
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Country Info Finder
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
