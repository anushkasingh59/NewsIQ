import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CategoryTabs from "../components/CategoryTabs";
import NewsCard from "../components/NewsCard";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [active, setActive] = useState("Top");

  useEffect(() => {
    fetch("http://localhost:5000/api/events/top")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

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
          {events.map((event) => (
            <NewsCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
