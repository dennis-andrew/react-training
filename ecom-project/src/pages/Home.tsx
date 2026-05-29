import { useState } from "react";
import OfferCard from "../components/OfferCard";
import Select from "../components/Select";
import localStorageService from "../services/localStorageService";
import type { CustomerReview } from "../services/localStorageService";
import "./Home.css";

const ratingOptions = [
  { label: "★★★★★", value: "5" },
  { label: "★★★★", value: "4" },
  { label: "★★★", value: "3" },
  { label: "★★", value: "2" },
  { label: "★", value: "1" },
];

const Home = () => {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [reviews, setReviews] = useState<CustomerReview[]>(
    localStorageService.getCustomerReviews,
  );
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const canPublish = name.trim().length > 0 && message.trim().length > 0;

  const publishReview = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !message.trim()) {
      return;
    }

    const updatedReviews = [
      {
        id: Date.now(),
        name: name.trim(),
        rating,
        message: message.trim(),
        imageUrl,
      },
      ...reviews,
    ];

    setReviews(updatedReviews);
    localStorageService.saveCustomerReviews(updatedReviews);
    setName("");
    setRating(5);
    setMessage("");
    setImageUrl("");
    setIsReviewFormOpen(false);
  };

  return (
    <main>
      <section
        className="landing-image"
        aria-label="Featured furniture collection"
      >
        <OfferCard />
      </section>

      <section className="review-section" aria-labelledby="review-title">
        <div className="review-section__header">
          <div>
            <p>Customer Stories</p>
            <h2 id="review-title">Share your review</h2>
          </div>
          <button
            className="review-section__toggle"
            type="button"
            onClick={() => setIsReviewFormOpen((isOpen) => !isOpen)}
          >
            Add a review
          </button>
        </div>

        {isReviewFormOpen && (
          <form className="review-form" onSubmit={publishReview}>
            <label>
              <span>Name</span>
              <input
                type="text"
                required
                value={name}
                placeholder="Your name"
                onChange={(event) => setName(event.target.value)}
              />
            </label>

            <Select
              label="Rating"
              value={String(rating)}
              options={ratingOptions}
              onChange={(value) => setRating(Number(value))}
            />

            <label className="review-form__message">
              <span>Review</span>
              <textarea
                required
                value={message}
                placeholder="What did you like?"
                rows={4}
                onChange={(event) => setMessage(event.target.value)}
              />
            </label>

            <label>
              <span>Add image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (!file) {
                    setImageUrl("");
                    return;
                  }

                  const reader = new FileReader();
                  reader.onload = () => setImageUrl(String(reader.result));
                  reader.readAsDataURL(file);
                }}
              />
            </label>

            <button
              className="review-form__publish"
              type="submit"
              disabled={!canPublish}
            >
              Publish
            </button>
          </form>
        )}

        {reviews.length > 0 && (
          <div className="review-list">
            {reviews.map((review) => (
              <article className="review-card" key={review.id}>
                {review.imageUrl && (
                  <img src={review.imageUrl} alt={`${review.name}'s review`} />
                )}
                <div>
                  <div className="review-card__topline">
                    <h3>{review.name}</h3>
                    <span>{"★".repeat(review.rating)}</span>
                  </div>
                  <p>{review.message}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
