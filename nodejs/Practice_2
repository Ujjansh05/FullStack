const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory card collection
let cards = [];

// GET all cards
app.get('/cards', (req, res) => {
  res.json({ success: true, data: cards });
});

// POST a new card
app.post('/cards', (req, res) => {
  const { suit, value } = req.body;

  if (!suit || !value) {
    return res.status(400).json({ success: false, message: 'Suit and value are required.' });
  }

  const newCard = {
    id: uuidv4(),
    suit,
    value,
  };

  cards.push(newCard);
  res.status(201).json({ success: true, data: newCard });
});

// GET a card by ID
app.get('/cards/:id', (req, res) => {
  const { id } = req.params;
  const card = cards.find(c => c.id === id);

  if (!card) {
    return res.status(404).json({ success: false, message: 'Card not found.' });
  }

  res.json({ success: true, data: card });
});

// DELETE a card by ID
app.delete('/cards/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = cards.length;

  cards = cards.filter(c => c.id !== id);

  if (cards.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Card not found.' });
  }

  res.json({ success: true, message: `Card with ID ${id} deleted.` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🎴 Card API server running on http://localhost:${PORT}`);
});
