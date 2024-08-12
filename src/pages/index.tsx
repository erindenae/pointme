import { useEffect, useState } from 'react';
import { Inter } from "next/font/google";
import ReviewApp from "@/components/ReviewApp";
import Star from "@/components/Star";
import Review from "@/data/Review";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  const [data, setData] = useState<Review[]>([]);

  useEffect(() => {
    fetch('/api/reviews')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  return (
    <main
      className={`flex min-h-screen flex-col items-center ${inter.className}`}
    >
      <h1 className='text-2xl font-bold py-8'>Review App</h1>

      <ReviewApp />
      <section className='container'>
        <h2 className="previous-reviews py-8  text-xl font-bold">Previous Reviews</h2>
        {data.length > 0 ? (
          <section>
            {data.map((item) => (
              <article key={item.id} className="border p-4 mb-4 rounded shadow">
                <h3 className="text-l font-bold">{item.author}</h3>

                <div className='star-rating'>
                  {[1, 2, 3, 4, 5].map((starid) => (
                    <div
                      key={starid}
                      style={{ display: "inline-block" }}
                    >
                      <Star
                        starid={starid}
                        marked={starid <= item.rating}
                      />
                    </div>
                  ))}
                </div>

                <p>{item.review}</p>

              </article>
            ))}
          </section>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </main>
  );
}
