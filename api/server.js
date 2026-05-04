const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
// Serve local uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Configure Multer for local image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
const upload = multer({ storage: storage });

// Create Product Endpoint (Handles local image OR image link)
app.post('/products', upload.single('imageFile'), async (req, res) => {
  try {
    const { name, description, price, category_id, imageLink } = req.body;
    
    // Determine the final image URL
    // If a file was uploaded, use the local path. Otherwise, use the provided link.
    let finalImageUrl = null;
    if (req.file) {
      finalImageUrl = `/uploads/${req.file.filename}`; // Local path
    } else if (imageLink) {
      finalImageUrl = imageLink; // External link
    }

    const newProduct = await pool.query(
      'INSERT INTO products (name, description, price, category_id, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, category_id, finalImageUrl]
    );

    res.json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get Products Endpoint
app.get('/products', async (req, res) => {
  try {
    const allProducts = await pool.query('SELECT * FROM products');
    res.json(allProducts.rows);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});