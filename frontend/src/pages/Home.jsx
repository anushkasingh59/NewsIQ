import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CategoryTabs from "../components/CategoryTabs";
import NewsCard from "../components/NewsCard";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [active, setActive] = useState("Top");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadEvents = () => {
    setLoading(true);

    let url = "http://localhost:5000/api/events/top";

    if (active === "India")
      url = "http://localhost:5000/api/events?region=India";

    if (active === "World")
      url = "http://localhost:5000/api/events?region=World";

    if (active === "Technology")
      url = "http://localhost:5000/api/events?category=Technology";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      });
  };

  loadEvents();

  const interval = setInterval(loadEvents, 60000);

  return () => clearInterval(interval);

}, [active]);   // ✅ dependency here

  return (
    <div>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900">
          Today’s Verified Briefing
        </h2>
        <p className="text-gray-600 mt-2">
          Signal over noise. Trust over clicks.
        </p>

        {/* Tabs */}
        <CategoryTabs active={active} setActive={setActive} />

        {/* News Cards */}
        <div className="mt-8 grid gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="p-6 bg-white rounded-2xl shadow animate-pulse"
                >
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ))
            : events.map((event) => <NewsCard key={event._id} event={event} />)}
        </div>
      </div>
    </div>
  );
}
