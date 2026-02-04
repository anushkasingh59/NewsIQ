export default function CategoryTabs({ active, setActive }) {
  const categories = ["Top", "India", "World", "Technology"];

  return (
    <div className="flex gap-3 mt-6 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            active === cat
              ? "bg-blue-600 text-white"
              : "bg-white border text-gray-700 hover:bg-gray-100"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
