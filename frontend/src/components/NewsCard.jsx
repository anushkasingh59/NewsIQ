export default function NewsCard({ event }) {
  const trustColor =
  event.trustScore >= 80
    ? "bg-green-100 text-green-700"
    : event.trustScore >= 60
    ? "bg-yellow-100 text-yellow-700"
    : "bg-red-100 text-red-700";
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border space-y-3">
      {/* Headline */}
      <h2 className="text-lg font-semibold text-gray-900">
        {event.headline}
      </h2>

      {/* Summary */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {event.summary || "Summary coming soon..."}
      </p>

      {/* Why it matters */}
      <p className="text-sm text-blue-700 font-medium">
        {event.whyItMatters || "Why it matters coming soon..."}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center text-xs text-gray-500 pt-2">
        <span className={`px-3 py-1 rounded-full ${trustColor}`}>
          Trust: {event.trustScore}/100
        </span>

        <span>
          Sources: {event.sources?.slice(0, 2).join(", ")}
        </span>
      </div>
    </div>
  );
}
