// src/EditCard.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { readDeck, readCard, updateCard } from "./utils/api";

function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState({ front: "", back: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const loadDeckAndCard = async () => {
      const fetchedDeck = await readDeck(deckId);
      const fetchedCard = await readCard(cardId);
      setDeck(fetchedDeck);
      setCard(fetchedCard);
    };

    loadDeckAndCard();
  }, [deckId, cardId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(card);
    navigate(`/decks/${deck.id}`);
  };

  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

  if (!deck || !card.id) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {card.id}
          </li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            value={card.front}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            value={card.back}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button
          type="button"
          onClick={() => navigate(`/decks/${deck.id}`)}
          className="btn btn-secondary ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditCard;
