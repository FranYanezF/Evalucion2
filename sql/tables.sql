CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(90) NOT NULL,
	last_name VARCHAR(90) NOT NULL,
	email VARCHAR(255) NOT NULL
);

CREATE TABLE gatos (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	color VARCHAR(255),
	raza VARCHAR(255),
	edad INT,
	pais VARCHAR(255),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	user_id INT,
	KEY user_id_idx(user_id)
);

INSERT INTO gatos (nombre, color, email) VALUES (
	"Pepe", "Frog", "contacto@pepeblog.com"
);