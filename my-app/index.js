const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
;

// Middleware
app.use(cors()); // allow all for now
app.use(express.json());

// Fake in-memory database
let cars = [];
let nextId = 1;

// Welcome message
app.get('/', (req, res) => {
  res.send('Welcome to Carzz – Your Used Car Resale Partner!');
});

// Get all car listings
app.get('/cars', (req, res) => {
  res.json(cars);
});

// Add a new car
app.post('/cars', (req, res) => {
  const { make, model, year, price } = req.body;
  if (!make || !model || !year || !price) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const newCar = { id: nextId++, make, model, year, price, verified: false };
  cars.push(newCar);
  res.status(201).json(newCar);
});

// Verify a car (mechanic action)
app.patch('/cars/:id/verify', (req, res) => {
  const car = cars.find(c => c.id == req.params.id);
  if (!car) return res.status(404).json({ error: 'Car not found' });
  car.verified = true;
  res.json(car);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});





