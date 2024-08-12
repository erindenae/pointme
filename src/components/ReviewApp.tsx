import { useState } from "react";
import StarRating from "@/components/StarRating";

const ReviewApp = () => {
  // Tip: You can grab data with fetch or an HTTP client of your choice:
  //      await fetch("http://localhost:3000/api/reviews")
  //      await axios.get("http://localhost:3000/api/reviews")


  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const reviewData = {
      author: name,
      review: review,
      rating: rating,
    };
    try {
      // Send the POST request to the API
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData), // Convert the data to JSON
      });

      if (response.ok) {
        console.log("Review submitted successfully!");
        setName("");
        setReview("");
        setRating(0);
      } else {
        console.error("Failed to submit review:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <section className="review-input container w-full py-12">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <StarRating rating={rating} setRating={setRating} />
        </div>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            className="block w-full border p-4 mb-4"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            value={review}
            placeholder="Review"
            className="block w-full rounded-md border p-4 mb-4"
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>
        <button className="block w-full mt-10 h-10 px-6 font-semibold rounded-md bg-violet-500 text-white" type="submit">Submit Review</button>
      </form>
    </section>



  );
};

ReviewApp.displayName = "ReviewApp";
export default ReviewApp;
