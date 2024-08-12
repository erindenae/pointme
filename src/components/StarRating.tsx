import { useState } from "react";
import Star from "@/components/Star";


const StarRating = ({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) => {
  //track marked stars
  const [markedStars, setMarkedStars] = useState<boolean[]>([false, false, false, false, false]);

  //track currently hovered star
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  //Clicked star
  const handleStarClick = (starid: number) => {
    const newMarkedStars = markedStars.map((_, index) => index < starid);
    setMarkedStars(newMarkedStars);
  };

  // hover star
  const handleStarHover = (starid: number) => {
    setHoveredStar(starid);
  };

  // leave hover
  const handleStarLeave = () => {
    setHoveredStar(null);
  };

  return (
    <section className="flex flex-col items-center">

      <div>
        {[1, 2, 3, 4, 5].map((starid) => (
          <div
            key={starid}
            data-starid={starid}
            data-marked={starid <= rating}
            onClick={() => { handleStarClick(starid); setRating(starid) }}
            onMouseEnter={() => handleStarHover(starid)}
            onMouseLeave={handleStarLeave}
            style={{ display: "inline-block", cursor: "pointer" }}
          >
            <Star
              starid={starid}
              marked={hoveredStar ? starid <= hoveredStar : markedStars[starid - 1]}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

StarRating.displayName = "StarRating";
export default StarRating;
