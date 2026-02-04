export default function Navbar() {
  return (
    <div className="w-full bg-white border-b shadow-sm">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">
          News<span className="text-blue-600">IQ</span>
        </h1>

        <p className="text-sm text-gray-500">
          Verified News Intelligence Dashboard
        </p>
      </div>
    </div>
  );
}
