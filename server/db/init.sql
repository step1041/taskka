-- Create dev and test databases
CREATE DATABASE taskka_dev;
CREATE DATABASE taskka_test;

-- Create the user that will access the databases. Be sure to change the password!
CREATE USER taskka WITH PASSWORD 'taskka_login';

-- Grant taskka access to the databases
GRANT ALL ON DATABASE taskka_dev TO taskka;
GRANT ALL ON DATABASE taskka_test TO taskka;

ALTER USER taskka CREATEDB;
ALTER DATABASE taskka_test OWNER to taskka;