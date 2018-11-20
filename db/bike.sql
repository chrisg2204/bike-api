-- Tabla storage-bike

CREATE TABLE `bike`.`storage`(
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	model VARCHAR (50) NOT NULL,
	color VARCHAR(20) NOT NULL,
	ring VARCHAR(10) NOT NULL,
	price FLOAT(10) NOT NULL,
	create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);