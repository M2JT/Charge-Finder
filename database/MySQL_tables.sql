CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    join_date DATE NOT NULL DEFAULT CURRENT_DATE,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE charging_station_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    station_name VARCHAR(255) NOT NULL,
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    available_power_banks INT NOT NULL,
    price INT NOT NULL
);

CREATE TABLE rental_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    transaction_id INT NOT NULL,
    rented_on_date DATE NOT NULL DEFAULT CURRENT_DATE,
    duration INT NOT NULL,
    charges INT NOT NULL,
    rental_status VARCHAR(255) NOT NULL,
    UNIQUE (user_id, transaction_id)
);