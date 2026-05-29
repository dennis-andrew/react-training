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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
        luctus nec ullamcorper mattis.
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
