/*
  # Seed Demo Categories and Products

  - Inserts 6 top-level categories (Electronics, Clothing, Home & Garden, Sports, Books, Beauty)
  - Inserts 12 sample products across categories with realistic pricing and stock levels
  - All products reference Pexels stock images
*/

INSERT INTO categories (id, name, slug, description, image_url, sort_order) VALUES
  ('11111111-0000-0000-0000-000000000001', 'Electronics', 'electronics', 'Gadgets, devices, and tech accessories', 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=800', 1),
  ('11111111-0000-0000-0000-000000000002', 'Clothing', 'clothing', 'Fashion for every style and season', 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800', 2),
  ('11111111-0000-0000-0000-000000000003', 'Home & Garden', 'home-garden', 'Everything for your living space', 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800', 3),
  ('11111111-0000-0000-0000-000000000004', 'Sports', 'sports', 'Equipment and gear for active lifestyles', 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800', 4),
  ('11111111-0000-0000-0000-000000000005', 'Books', 'books', 'Knowledge, stories, and inspiration', 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800', 5),
  ('11111111-0000-0000-0000-000000000006', 'Beauty', 'beauty', 'Skincare, makeup, and personal care', 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=800', 6)
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, name, slug, description, short_description, price, compare_at_price, sku, stock_quantity, category_id, tags, is_featured) VALUES
  ('22222222-0000-0000-0000-000000000001', 'Pro Wireless Headphones', 'pro-wireless-headphones', 'Premium over-ear wireless headphones with active noise cancellation, 40-hour battery life, and premium sound quality. Perfect for audiophiles and professionals.', 'Premium noise-cancelling wireless headphones', 299.99, 399.99, 'ELEC-001', 45, '11111111-0000-0000-0000-000000000001', ARRAY['headphones','wireless','noise-cancelling'], true),
  ('22222222-0000-0000-0000-000000000002', 'Smart Watch Series X', 'smart-watch-series-x', 'Advanced smartwatch with health monitoring, GPS, cellular connectivity, and a brilliant always-on display. Tracks your fitness and keeps you connected.', 'Feature-packed smartwatch with GPS', 449.99, 499.99, 'ELEC-002', 30, '11111111-0000-0000-0000-000000000001', ARRAY['smartwatch','fitness','gps'], true),
  ('22222222-0000-0000-0000-000000000003', 'Mechanical Keyboard RGB', 'mechanical-keyboard-rgb', 'Full-size mechanical keyboard with Cherry MX switches, per-key RGB lighting, and a durable aluminum frame. Ideal for gaming and productivity.', 'Mechanical gaming keyboard with RGB', 159.99, 199.99, 'ELEC-003', 60, '11111111-0000-0000-0000-000000000001', ARRAY['keyboard','mechanical','rgb','gaming'], false),
  ('22222222-0000-0000-0000-000000000004', 'Classic Slim Fit Jacket', 'classic-slim-fit-jacket', 'A timeless slim-fit jacket crafted from premium wool blend. Features a modern cut, interior pockets, and a versatile design suitable for formal and casual occasions.', 'Versatile premium wool-blend jacket', 189.99, 249.99, 'CLTH-001', 25, '11111111-0000-0000-0000-000000000002', ARRAY['jacket','wool','formal','slim-fit'], true),
  ('22222222-0000-0000-0000-000000000005', 'Athletic Running Shoes', 'athletic-running-shoes', 'Lightweight performance running shoes engineered for speed and comfort. Features responsive foam midsole, breathable mesh upper, and durable rubber outsole.', 'High-performance running shoes', 129.99, 160.00, 'CLTH-002', 80, '11111111-0000-0000-0000-000000000002', ARRAY['shoes','running','athletic'], false),
  ('22222222-0000-0000-0000-000000000006', 'Minimalist Desk Lamp', 'minimalist-desk-lamp', 'Sleek LED desk lamp with adjustable color temperature (2700K-6500K) and brightness. USB charging port built into the base. Eye-care technology reduces strain.', 'Smart LED desk lamp with USB charging', 89.99, 120.00, 'HOME-001', 40, '11111111-0000-0000-0000-000000000003', ARRAY['lamp','led','desk','minimalist'], false),
  ('22222222-0000-0000-0000-000000000007', 'Ceramic Pour-Over Coffee Set', 'ceramic-pour-over-coffee-set', 'Hand-crafted ceramic pour-over coffee maker complete with a matching server, filters, and a wooden stand. Produces a clean, flavorful brew every time.', 'Artisan ceramic pour-over coffee maker', 74.99, 95.00, 'HOME-002', 35, '11111111-0000-0000-0000-000000000003', ARRAY['coffee','ceramic','pour-over','kitchen'], true),
  ('22222222-0000-0000-0000-000000000008', 'Yoga Mat Premium', 'yoga-mat-premium', 'Extra-thick 6mm yoga mat made from eco-friendly TPE material. Non-slip texture on both sides, alignment lines, and carrying strap included. Perfect for all yoga styles.', 'Eco-friendly non-slip yoga mat', 59.99, 79.99, 'SPRT-001', 55, '11111111-0000-0000-0000-000000000004', ARRAY['yoga','mat','fitness','eco-friendly'], false),
  ('22222222-0000-0000-0000-000000000009', 'Adjustable Dumbbell Set', 'adjustable-dumbbell-set', 'Space-saving adjustable dumbbells that replace 15 sets of weights. Quick-adjust dial from 5 to 52.5 lbs per dumbbell. Includes storage tray.', 'Adjustable dumbbells 5-52.5 lbs', 399.99, 549.99, 'SPRT-002', 20, '11111111-0000-0000-0000-000000000004', ARRAY['dumbbells','weights','strength','gym'], true),
  ('22222222-0000-0000-0000-000000000010', 'The Art of Clean Code', 'the-art-of-clean-code', 'A practical guide to writing maintainable, efficient software. Covers best practices, design patterns, refactoring techniques, and professional coding standards.', 'Professional software development guide', 34.99, 44.99, 'BOOK-001', 100, '11111111-0000-0000-0000-000000000005', ARRAY['programming','coding','software','development'], false),
  ('22222222-0000-0000-0000-000000000011', 'Vitamin C Brightening Serum', 'vitamin-c-brightening-serum', 'Advanced 20% vitamin C serum with hyaluronic acid and vitamin E. Brightens skin tone, reduces dark spots, and provides powerful antioxidant protection. Dermatologist tested.', '20% Vitamin C serum for radiant skin', 64.99, 85.00, 'BEAU-001', 70, '11111111-0000-0000-0000-000000000006', ARRAY['serum','vitamin-c','skincare','brightening'], true),
  ('22222222-0000-0000-0000-000000000012', 'Wireless Charging Pad', 'wireless-charging-pad', '15W fast wireless charging pad compatible with all Qi-enabled devices. Ultra-slim design with LED indicator and foreign object detection for safe charging.', '15W fast wireless charging pad', 39.99, 59.99, 'ELEC-004', 90, '11111111-0000-0000-0000-000000000001', ARRAY['charging','wireless','qi','accessory'], false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO product_images (product_id, url, alt_text, is_primary, sort_order) VALUES
  ('22222222-0000-0000-0000-000000000001', 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800', 'Pro Wireless Headphones', true, 0),
  ('22222222-0000-0000-0000-000000000002', 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800', 'Smart Watch Series X', true, 0),
  ('22222222-0000-0000-0000-000000000003', 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=800', 'Mechanical Keyboard RGB', true, 0),
  ('22222222-0000-0000-0000-000000000004', 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=800', 'Classic Slim Fit Jacket', true, 0),
  ('22222222-0000-0000-0000-000000000005', 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800', 'Athletic Running Shoes', true, 0),
  ('22222222-0000-0000-0000-000000000006', 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800', 'Minimalist Desk Lamp', true, 0),
  ('22222222-0000-0000-0000-000000000007', 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800', 'Ceramic Pour-Over Coffee Set', true, 0),
  ('22222222-0000-0000-0000-000000000008', 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=800', 'Yoga Mat Premium', true, 0),
  ('22222222-0000-0000-0000-000000000009', 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=800', 'Adjustable Dumbbell Set', true, 0),
  ('22222222-0000-0000-0000-000000000010', 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=800', 'The Art of Clean Code', true, 0),
  ('22222222-0000-0000-0000-000000000011', 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800', 'Vitamin C Brightening Serum', true, 0),
  ('22222222-0000-0000-0000-000000000012', 'https://images.pexels.com/photos/4526474/pexels-photo-4526474.jpeg?auto=compress&cs=tinysrgb&w=800', 'Wireless Charging Pad', true, 0)
ON CONFLICT DO NOTHING;
