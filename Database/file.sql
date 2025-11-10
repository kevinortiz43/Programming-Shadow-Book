-- CREATE
CREATE table products(
    id INT NOT NULL,
    order_number INT,
    customer_id INT,
    PRIMARY KEY (id), -- primary key
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
)
-- GOAL 
-- JOIN product table with order table to display
-- order.order_number, product.name, product.price, customer.address

-- products table 
-- id (primary key), name, price, customer_id (foreign/ 2ndary Key), product_id (foreign/ 2ndary key),  

-- orders table
-- order_number

-- customer table
-- firstname, lastname, adress

SELECT orders.order_number,  products.name, products.price, products.stock
FROM orders
INNER JOIN products on orders.product_id = products.id





-- INSERT
INSERT into products








-- DELETE
DELETE FROM products
WHERE id = 2


-- JOINS