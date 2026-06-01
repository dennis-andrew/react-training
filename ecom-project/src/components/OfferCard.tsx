import { useNavigate } from "react-router-dom";
import "./OfferCard.css";

const OfferCard = () => {
  const navigate = useNavigate();
  return (
    <section className="offer_card">
      <p className="offer_card__eyebrow">New Arrival</p>
      <h2>
        Discover Our
        <br />
        New Collection
      </h2>
      <p className="offer_card__description">
        Bring home thoughtfully crafted furniture designed for comfort, style,
        and everyday living.
      </p>
      <button
        className="offer_card__button"
        type="button"
        onClick={() => navigate("/shop", { replace: true })}
      >
        Buy Now
      </button>
    </section>
  );
};

export default OfferCard;
