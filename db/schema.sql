DROP TABLE IF EXISTS employees;

CREATE TABLE employees(
    id SERIAL PRIMARY KEY,
  name text UNIQUE NOT NULL,
  birthday date NOT NULL,
  salary integer NOT NULL
)