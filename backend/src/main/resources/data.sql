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

-- Electronics (category: a1b2c3d4-0001-4000-8000-000000000001)
INSERT INTO product (id, name, description, price, image_url, available_quantity, category_id, seller_id) VALUES
    ('d4e5f6a7-0004-4000-8000-000000000001',
     'Wireless Headphones',
     'Premium noise-cancelling wireless headphones with 30-hour battery life. Trending',
     79.99, 'headphones.jpg', 50,
     'a1b2c3d4-0001-4000-8000-000000000001',
     'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000002',
     'Smartphone',
     'Latest 6.5-inch AMOLED smartphone with 128GB storage and dual camera. Trending',
     699.99, 'smartphone.jpg', 35,
     'a1b2c3d4-0001-4000-8000-000000000001',
     'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000003',
     'Bluetooth Speaker',
     'Portable waterproof Bluetooth speaker with deep bass and 12-hour playtime.',
     49.99, 'speaker.jpg', 80,
     'a1b2c3d4-0001-4000-8000-000000000001',
     'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000004',
     'Smartwatch',
     'Fitness smartwatch with heart rate monitor, GPS, and 7-day battery. Trending',
     199.99, 'smartwatch.jpg', 25,
     'a1b2c3d4-0001-4000-8000-000000000001',
     'c3d4e5f6-0003-4000-8000-000000000001'),

-- Clothes (category: a1b2c3d4-0001-4000-8000-000000000002)
    ('d4e5f6a7-0004-4000-8000-000000000005',
     'Leather Jacket',
     'Genuine leather biker jacket with quilted lining. Classic style for any season.',
     149.99, 'jacket.jpg', 20,
     'a1b2c3d4-0001-4000-8000-000000000002',
     'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000006',
     'Running Shoes',
     'Lightweight running shoes with responsive cushioning and breathable mesh. Trending',
     89.99, 'shoes.jpg', 60,
     'a1b2c3d4-0001-4000-8000-000000000002',
     'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000007',
     'Denim Jeans',
     'Classic slim-fit denim jeans made from premium stretch cotton.',
     59.99, 'jeans.jpg', 45,
     'a1b2c3d4-0001-4000-8000-000000000002',
     'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000008',
     'Cotton T-Shirt',
     'Soft 100% organic cotton crew-neck t-shirt. Available in multiple colors.',
     24.99, 'tshirt.jpg', 100,
     'a1b2c3d4-0001-4000-8000-000000000002',
     'c3d4e5f6-0003-4000-8000-000000000001'),

-- Computers (category: a1b2c3d4-0001-4000-8000-000000000003)
    ('d4e5f6a7-0004-4000-8000-000000000009',
     'Gaming Laptop',
     'High-performance gaming laptop with RTX graphics, 16GB RAM, 512GB SSD. Trending',
     1299.99, 'laptop.jpg', 15,
     'a1b2c3d4-0001-4000-8000-000000000003',
     'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000010',
     'Mechanical Keyboard',
     'RGB mechanical gaming keyboard with Cherry MX switches and aluminum frame.',
     129.99, 'keyboard.jpg', 40,
     'a1b2c3d4-0001-4000-8000-000000000003',
     'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000011',
     '4K Monitor',
     'Ultra-sharp 27-inch 4K IPS monitor with HDR support and USB-C connectivity. Trending',
     449.99, 'monitor.jpg', 30,
     'a1b2c3d4-0001-4000-8000-000000000003',
     'c3d4e5f6-0003-4000-8000-000000000001'),

    ('d4e5f6a7-0004-4000-8000-000000000012',
     'Wireless Mouse',
     'Ergonomic wireless mouse with precision tracking and silent clicks.',
     39.99, 'mouse.jpg', 70,
     'a1b2c3d4-0001-4000-8000-000000000003',
     'c3d4e5f6-0003-4000-8000-000000000001')
ON CONFLICT (id) DO NOTHING;
