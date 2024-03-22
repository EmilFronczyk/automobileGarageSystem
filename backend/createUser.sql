-- Drop user first if he exists
DROP USER if exists 'admin'@'localhost';

-- Now create user with prop privileges
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';

GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost';