const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory seat data
// Example: 10 seats labeled A1-A5 and B1-B5
let seats = {};
['A1','A2','A3','A4','A5','B1','B2','B3','B4','B5'].forEach(id => {
  seats[id] = { status: 'available', lockId: null, lockExpiry: null };
});

// Helper to clean expired locks
function cleanExpiredLocks() {
  const now = Date.now();
  for (const id in seats) {
    if (seats[id].status === 'locked' && seats[id].lockExpiry <= now) {
      seats[id].status = 'available';
      seats[id].lockId = null;
      seats[id].lockExpiry = null;
    }
  }
}

// GET available seats
app.get('/seats', (req, res) => {
  cleanExpiredLocks();
  const seatStates = {};
  for (const id in seats) {
    seatStates[id] = seats[id].status;
  }
  res.json({ success: true, seats: seatStates });
});

// POST lock a seat
app.post('/seats/lock', (req, res) => {
  cleanExpiredLocks();
  const { seatId } = req.body;
  if (!seats[seatId]) {
    return res.status(404).json({ success: false, message: 'Seat does not exist.' });
  }
  const seat = seats[seatId];
  if (seat.status === 'booked') {
    return res.status(400).json({ success: false, message: 'Seat is already booked.' });
  }
  if (seat.status === 'locked') {
    return res.status(400).json({ success: false, message: 'Seat is already locked.' });
  }

  const lockId = uuidv4();
  seat.status = 'locked';
  seat.lockId = lockId;
  seat.lockExpiry = Date.now() + 60 * 1000; // 1 minute lock

  res.json({ success: true, message: 'Seat locked successfully.', lockId });
});

// POST confirm booking
app.post('/seats/confirm', (req, res) => {
  cleanExpiredLocks();
  const { seatId, lockId } = req.body;
  if (!seats[seatId]) {
    return res.status(404).json({ success: false, message: 'Seat does not exist.' });
  }
  const seat = seats[seatId];
  if (seat.status !== 'locked' || seat.lockId !== lockId) {
    return res.status(400).json({ success: false, message: 'Seat is not locked or lockId is invalid.' });
  }

  seat.status = 'booked';
  seat.lockId = null;
  seat.lockExpiry = null;

  res.json({ success: true, message: 'Seat booked successfully.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🎟️ Ticket booking server running at http://localhost:${PORT}`);
});
