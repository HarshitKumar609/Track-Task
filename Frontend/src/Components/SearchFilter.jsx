const SearchFilter = ({
  search,
  setSearch,
  filter,
  setFilter,
  sort,
  setSort,
}) => {
  return (
    <div className="border rounded-2xl shadow-lg p-5 mb-8">
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Search */}

        <div>
          <label className="block font-semibold mb-2">Search Task</label>

          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter */}

        <div>
          <label className="block font-semibold mb-2">Filter</label>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Tasks</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Sort */}

        <div>
          <label className="block font-semibold mb-2">Sort</label>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
            <option value="A-Z">Title A-Z</option>
            <option value="Z-A">Title Z-A</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
