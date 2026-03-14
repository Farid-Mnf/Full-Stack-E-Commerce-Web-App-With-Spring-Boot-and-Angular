-- Seed data for e-commerce application
-- Idempotent: uses ON CONFLICT DO NOTHING so it's safe to run multiple times

-- 1. Categories
INSERT INTO category (id, name) VALUES
    ('a1b2c3d4-0001-4000-8000-000000000001', 'Electronics'),
    ('a1b2c3d4-0001-4000-8000-000000000002', 'Clothes'),
    ('a1b2c3d4-0001-4000-8000-000000000003', 'Computers')
ON CONFLICT (id) DO NOTHING;

-- 2. Cart for seed seller
INSERT INTO cart (id) VALUES
    ('b2c3d4e5-0002-4000-8000-000000000001')
ON CONFLICT (id) DO NOTHING;

-- 3. Seed seller user (password: password123)
INSERT INTO users (id, name, email, password, phone, cart_id) VALUES
    ('c3d4e5f6-0003-4000-8000-000000000001',
     'Seed Seller',
     'seller@shop.com',
     '$2b$10$sFz3/LymekUiwnGeafiMBeaEmyEX/.EodshB7zj9tzPMbIPGPgcxu',
     '1234567890',
     'b2c3d4e5-0002-4000-8000-000000000001')
ON CONFLICT (id) DO NOTHING;

-- 4. Products

-- ========== Electronics (12 products) ==========
INSERT INTO product (id, name, description, price, image_url, available_quantity, category_id, seller_id) VALUES
    ('d4e5f6a7-0004-4000-8000-000000000001',
     'Wireless Headphones',
     'Premium noise-cancelling wireless headphones with 30-hour battery life. Trending',
     79.99, 'headphones.jpg', 50,
     'a1b2c3d4-0001-4000-8000-000000000001', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000002',
     'Smartphone',
     'Latest 6.5-inch AMOLED smartphone with 128GB storage and dual camera. Trending',
     699.99, 'smartphone.jpg', 35,
     'a1b2c3d4-0001-4000-8000-000000000001', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000003',
     'Bluetooth Speaker',
     'Portable waterproof Bluetooth speaker with deep bass and 12-hour playtime.',
     49.99, 'speaker.jpg', 80,
     'a1b2c3d4-0001-4000-8000-000000000001', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000004',
     'Smartwatch',
     'Fitness smartwatch with heart rate monitor, GPS, and 7-day battery. Trending',
     199.99, 'smartwatch.jpg', 25,
     'a1b2c3d4-0001-4000-8000-000000000001', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000013',
     'Studio Headphones Pro',
     'Professional studio-grade over-ear headphones with flat frequency response.',
     149.99, 'headphones.jpg', 18,
     'a1b2c3d4-0001-4000-8000-000000000001', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000014',
     'Smartphone Pro Max',
     'Flagship 6.7-inch smartphone with 256GB storage, triple camera, and 5G.',
     1099.99, 'smartphone.jpg', 12,
     'a1b2c3d4-0001-4000-8000-000000000001', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000015',
     'Mini Bluetooth Speaker',
     'Compact pocket-sized Bluetooth speaker with surprising sound quality.',
     29.99, 'speaker.jpg', 95,
     'a1b2c3d4-0001-4000-8000-000000000001', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000016',
     'Smartwatch Ultra',
     'Rugged outdoor smartwatch with titanium case, dual-band GPS, and dive computer. Trending',
     399.99, 'smartwatch.jpg', 10,
     'a1b2c3d4-0001-4000-8000-000000000001', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000017',
     'Wireless Earbuds',
     'True wireless earbuds with active noise cancellation and 8-hour battery.',
     59.99, 'headphones.jpg', 65,
     'a1b2c3d4-0001-4000-8000-000000000001', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000018',
     'Budget Smartphone',
     'Affordable 6.1-inch smartphone with 64GB storage, great for everyday use.',
     249.99, 'smartphone.jpg', 40,
     'a1b2c3d4-0001-4000-8000-000000000001', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000019',
     'Party Speaker',
     'High-power party speaker with LED lights and microphone input. Trending',
     179.99, 'speaker.jpg', 22,
     'a1b2c3d4-0001-4000-8000-000000000001', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000020',
     'Fitness Band',
     'Lightweight fitness tracker with sleep monitoring and 14-day battery life.',
     39.99, 'smartwatch.jpg', 110,
     'a1b2c3d4-0001-4000-8000-000000000001', 'c3d4e5f6-0003-4000-8000-000000000001'),

-- ========== Clothes (12 products) ==========
    ('d4e5f6a7-0004-4000-8000-000000000005',
     'Leather Jacket',
     'Genuine leather biker jacket with quilted lining. Classic style for any season.',
     149.99, 'jacket.jpg', 20,
     'a1b2c3d4-0001-4000-8000-000000000002', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000006',
     'Running Shoes',
     'Lightweight running shoes with responsive cushioning and breathable mesh. Trending',
     89.99, 'shoes.jpg', 60,
     'a1b2c3d4-0001-4000-8000-000000000002', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000007',
     'Denim Jeans',
     'Classic slim-fit denim jeans made from premium stretch cotton.',
     59.99, 'jeans.jpg', 45,
     'a1b2c3d4-0001-4000-8000-000000000002', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000008',
     'Cotton T-Shirt',
     'Soft 100% organic cotton crew-neck t-shirt. Available in multiple colors.',
     24.99, 'tshirt.jpg', 100,
     'a1b2c3d4-0001-4000-8000-000000000002', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000021',
     'Bomber Jacket',
     'Modern bomber jacket with ribbed cuffs and water-resistant finish. Trending',
     119.99, 'jacket.jpg', 28,
     'a1b2c3d4-0001-4000-8000-000000000002', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000022',
     'Trail Hiking Shoes',
     'Durable trail shoes with waterproof membrane and aggressive tread pattern.',
     129.99, 'shoes.jpg', 33,
     'a1b2c3d4-0001-4000-8000-000000000002', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000023',
     'Relaxed Fit Jeans',
     'Comfortable relaxed-fit jeans with classic wash. Perfect for casual days.',
     49.99, 'jeans.jpg', 55,
     'a1b2c3d4-0001-4000-8000-000000000002', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000024',
     'V-Neck T-Shirt',
     'Slim-fit v-neck t-shirt made from soft jersey cotton blend.',
     19.99, 'tshirt.jpg', 120,
     'a1b2c3d4-0001-4000-8000-000000000002', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000025',
     'Winter Parka',
     'Insulated winter parka with faux fur hood and wind-proof shell. Trending',
     199.99, 'jacket.jpg', 15,
     'a1b2c3d4-0001-4000-8000-000000000002', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000026',
     'Canvas Sneakers',
     'Classic canvas sneakers with vulcanized rubber sole. Timeless street style.',
     44.99, 'shoes.jpg', 75,
     'a1b2c3d4-0001-4000-8000-000000000002', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000027',
     'Skinny Jeans',
     'Super skinny stretch jeans in dark indigo wash with zip fly.',
     64.99, 'jeans.jpg', 38,
     'a1b2c3d4-0001-4000-8000-000000000002', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000028',
     'Graphic T-Shirt',
     'Premium heavyweight cotton t-shirt with unique printed graphic design.',
     34.99, 'tshirt.jpg', 85,
     'a1b2c3d4-0001-4000-8000-000000000002', 'c3d4e5f6-0003-4000-8000-000000000001'),

-- ========== Computers (12 products) ==========
    ('d4e5f6a7-0004-4000-8000-000000000009',
     'Gaming Laptop',
     'High-performance gaming laptop with RTX graphics, 16GB RAM, 512GB SSD. Trending',
     1299.99, 'laptop.jpg', 15,
     'a1b2c3d4-0001-4000-8000-000000000003', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000010',
     'Mechanical Keyboard',
     'RGB mechanical gaming keyboard with Cherry MX switches and aluminum frame.',
     129.99, 'keyboard.jpg', 40,
     'a1b2c3d4-0001-4000-8000-000000000003', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000011',
     '4K Monitor',
     'Ultra-sharp 27-inch 4K IPS monitor with HDR support and USB-C connectivity. Trending',
     449.99, 'monitor.jpg', 30,
     'a1b2c3d4-0001-4000-8000-000000000003', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000012',
     'Wireless Mouse',
     'Ergonomic wireless mouse with precision tracking and silent clicks.',
     39.99, 'mouse.jpg', 70,
     'a1b2c3d4-0001-4000-8000-000000000003', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000029',
     'Ultrabook Laptop',
     'Ultra-thin 14-inch laptop with all-day battery, perfect for professionals.',
     999.99, 'laptop.jpg', 20,
     'a1b2c3d4-0001-4000-8000-000000000003', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000030',
     'Compact Keyboard',
     '65% compact mechanical keyboard with wireless Bluetooth and hot-swap switches. Trending',
     89.99, 'keyboard.jpg', 48,
     'a1b2c3d4-0001-4000-8000-000000000003', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000031',
     'Ultrawide Monitor',
     '34-inch curved ultrawide QHD monitor, perfect for productivity and gaming.',
     599.99, 'monitor.jpg', 14,
     'a1b2c3d4-0001-4000-8000-000000000003', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000032',
     'Gaming Mouse',
     'High-DPI gaming mouse with programmable buttons and RGB lighting. Trending',
     69.99, 'mouse.jpg', 55,
     'a1b2c3d4-0001-4000-8000-000000000003', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000033',
     'Budget Laptop',
     'Affordable 15.6-inch laptop with 8GB RAM, ideal for students and light work.',
     499.99, 'laptop.jpg', 30,
     'a1b2c3d4-0001-4000-8000-000000000003', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000034',
     'Ergonomic Keyboard',
     'Split ergonomic keyboard with palm rest and quiet membrane keys.',
     74.99, 'keyboard.jpg', 35,
     'a1b2c3d4-0001-4000-8000-000000000003', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000035',
     'Portable Monitor',
     '15.6-inch portable USB-C monitor for on-the-go dual screen setups.',
     249.99, 'monitor.jpg', 42,
     'a1b2c3d4-0001-4000-8000-000000000003', 'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000036',
     'Vertical Mouse',
     'Ergonomic vertical mouse designed to reduce wrist strain during long sessions.',
     49.99, 'mouse.jpg', 60,
     'a1b2c3d4-0001-4000-8000-000000000003', 'c3d4e5f6-0003-4000-8000-000000000001')
ON CONFLICT (id) DO NOTHING;
