// src/EditDeck.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, updateDeck } from "./utils/api";

function EditDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const loadDeck = async () => {
      const fetchedDeck = await readDeck(deckId);
      setDeck(fetchedDeck);
    };

    loadDeck();
  }, [deckId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck(deck);
    navigate(`/decks/${deck.id}`);
  };

  return (
    <div>
      <h2>Edit Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={deck.name}
            onChange={(e) => setDeck({ ...deck, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={deck.description}
            onChange={(e) => setDeck({ ...deck, description: e.target.value })}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
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

export default EditDeck;
