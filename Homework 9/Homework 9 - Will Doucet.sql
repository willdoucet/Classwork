/* 1a. Display the first and last names of all actors from the table actor */
SELECT actor.first_name, actor.last_name FROM sakila.actor;

/* 1b. Display the first and last name of each actor in a single column in upper case letters.
Name the column Actor Name */
SELECT UPPER(CONCAT(actor.first_name, ' ', actor.last_name)) AS Actor_Name FROM sakila.actor;

/* 2a. You need to find the ID number, first name, and last name of an actor,
of whom you know only the first name, "Joe." What is one query would you use
to obtain this information? */
SELECT actor.actor_id, actor.first_name, actor.last_name 
FROM sakila.actor
WHERE actor.first_name = "Joe";

/* 2b. Find all actors whose last name contain the letters GEN */
SELECT actor.actor_id, actor.first_name, actor.last_name 
FROM sakila.actor
WHERE actor.last_name LIKE "%Gen%";

/* 2c. Find all actors whose last names contain the letters LI. This time
order the rows by last name and first name, in that order */
SELECT actor.actor_id, actor.first_name, actor.last_name 
FROM sakila.actor
WHERE actor.last_name LIKE "%li%"
ORDER BY actor.last_name ASC, actor.first_name ASC;

/* 2d. Using IN, display the country_id and country columns of the following countries: 
Afghanistan, Bangladesh, and China */
SELECT country.country_id, country.country
FROM sakila.country
WHERE country.country IN ("Afghanistan", "Bangladesh", "China");

/* 3a. You want to keep a description of each actor. You don't think you will be
performing queries on a description, so create a column in the table actor named
description and use the data type BLOB  */
ALTER TABLE sakila.actor
ADD COLUMN description BLOB;

/* 3b. Very quickly you realize that entering descriptions for each actor is too much effort.
Delete the description column. */
ALTER TABLE sakila.actor
DROP COLUMN description;

/* 4a. List the last names of actors, as well as how many actors have that last name. */
SELECT actor.last_name, COUNT(*) as name_count 
FROM sakila.actor
GROUP BY actor.last_name;

/* 4b. List last names of actors and the number of actors who have that last name,
but only for names that are shared by at least two actors */
SELECT actor.last_name, COUNT(*) as name_count 
FROM sakila.actor
GROUP BY actor.last_name
HAVING name_count > 1;

/* 4c. The actor HARPO WILLIAMS was accidentally entered in the actor table as
GROUCHO WILLIAMS. Write a query to fix the record. */
USE sakila;
UPDATE actor
SET actor.first_name = "HARPO"
WHERE actor.first_name = "GROUCHO"
AND actor.last_name = "WILLIAMS";

/* 4d. Perhaps we were too hasty in changing GROUCHO to HARPO. It turns out that
GROUCHO was the correct name after all! In a single query, if the first name of the
actor is currently HARPO, change it to GROUCHO. */
USE sakila;
UPDATE actor
SET first_name = "GROUCHO"
WHERE first_name = "HARPO"
AND actor.last_name = "WILLIAMS";

/* 5a. You cannot locate the schema of the address table. Which query would you
use to re-create it? */
SHOW CREATE TABLE sakila.address;
/* 'CREATE TABLE `address` (
  `address_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `address` varchar(50) NOT NULL,
  `address2` varchar(50) DEFAULT NULL,
  `district` varchar(20) NOT NULL,
  `city_id` smallint(5) unsigned NOT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `location` geometry NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`address_id`),
  KEY `idx_fk_city_id` (`city_id`),
  SPATIAL KEY `idx_location` (`location`),
  CONSTRAINT `fk_address_city` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=606 DEFAULT CHARSET=utf8' */


/* 6a. Use JOIN to display the first and last names, as well as the address, of each
staff member. Use the tables staff and address */
SELECT staff.first_name, staff.last_name, address.address
FROM sakila.staff
JOIN address ON
address.address_id = staff.address_id;

/* 6b. Use JOIN to display the total amount rung up by each staff member in
August of 2005. Use tables staff and payment. */
SELECT staff.first_name, staff.last_name, SUM(payment.amount)
FROM sakila.payment
JOIN sakila.staff
WHERE payment_date BETWEEN "2005-08-01" AND "2005-08-31"
GROUP BY staff.first_name, staff.last_name;

/* 6c. List each film and the number of actors who are listed for that film.
Use tables film_actor and film. Use inner join. */
SELECT film.title, COUNT(film_actor.actor_id) AS no_of_actors
FROM sakila.film
INNER JOIN sakila.film_actor ON
film.film_id = film_actor.film_id
GROUP BY film.title;

/* 6d. How many copies of the film Hunchback Impossible exist in the inventory system? */
SELECT film.title, COUNT(inventory.inventory_id) AS no_of_copies
FROM sakila.film
JOIN sakila.inventory ON
film.film_id = inventory.film_id
GROUP BY film.title
HAVING film.title = "hunchback impossible";

/* 6e. Using the tables payment and customer and the JOIN command, list the total paid
by each customer. List the customers alphabetically by last name */
SELECT customer.last_name, customer.first_name, SUM(payment.amount)
FROM sakila.customer
JOIN sakila.payment ON
customer.customer_id = payment.customer_id
GROUP BY customer.last_name, customer.first_name
ORDER BY customer.last_name ASC;

/* Use subqueries to display the titles of movies starting with the letters
K and Q whose language is English */
SELECT film.title 
FROM sakila.film
WHERE film.title LIKE "K%"
OR film.title LIKE "Q%"
AND film.language_id
IN (
	SELECT `language`.language_id
    FROM sakila.`language`
    WHERE `language`.name = "english"
    );
    
/* 7b. Use subqueries to display all actors who appear in the film Alone Trip */
SELECT actor.first_name, actor.last_name
FROM sakila.actor
WHERE actor.actor_id
IN (
	SELECT film_actor.actor_id
    FROM sakila.film_actor
    WHERE film_actor.film_id
    IN (
		SELECT film.film_id
        FROM sakila.film
        WHERE film.title = "Alone Trip"
        )
    );
    
/* 7c. You want to run an email marketing campaign in Canada, for which
you will need the names and email addresses of all Canadian customers.
Use joins to retrieve this information */

SELECT customer.first_name, customer.last_name, customer.email,
address.address, city.city, country.country
FROM sakila.customer
	INNER JOIN sakila.address
		ON customer.address_id = address.address_id
	INNER JOIN sakila.city
		ON address.city_id = city.city_id
	INNER JOIN sakila.country
		ON city.country_id = country.country_id
        WHERE country.country IN ("Canada");

/* 7d. Sales have been lagging among young families, and you wish to target all
family movies for a promotion. Identify all movies categorized as family films. */
SELECT film.title
FROM sakila.film
WHERE film.film_id
IN (
	SELECT film_category.film_id
    FROM sakila.film_category
    WHERE film_category.category_id
    IN (
		SELECT category.category_id
        FROM sakila.category
        WHERE category.`name` = "Family"
		)
	);
    
/* 7e. Display the most frequently rented movies in descending order. */
SELECT film.title, COUNT(rental.inventory_id) AS rental_count
FROM sakila.film
	JOIN sakila.inventory
		ON film.film_id = inventory.film_id
    JOIN sakila.rental
		ON inventory.inventory_id = rental.inventory_id
GROUP BY film.title
ORDER BY rental_count DESC;

/* 7f. Write a query to display how much business, in dollars, each store brought in */
SELECT store.store_id, SUM(payment.amount)
FROM sakila.store
	JOIN sakila.inventory
		ON store.store_id = inventory.store_id
	JOIN sakila.rental
		ON inventory.inventory_id = rental.inventory_id
	JOIN sakila.payment
		ON rental.rental_id = payment.rental_id
GROUP BY store.store_id;

/* 7g. Write a query to display for each store its store ID, city, and country. */
SELECT store.store_id, city.city, country.country
FROM sakila.store
	JOIN sakila.address
		ON store.address_id = address.address_id
	JOIN sakila.city
		ON address.city_id = city.city_id
	JOIN sakila.country
		ON city.country_id = country.country_id;

/* List the top five genres in gross revenue in descending order.
(Hint: you may need to use the following tables: category, film_category, inventory,
payment, and rental. */
SELECT category.`name`, SUM(payment.amount) AS amount
FROM sakila.category
	JOIN sakila.film_category
		ON category.category_id = film_category.category_id
	JOIN sakila.inventory
		ON film_category.film_id = inventory.film_id
	JOIN sakila.rental
		ON inventory.inventory_id = rental.inventory_id
	JOIN sakila.payment
		ON rental.rental_id = payment.rental_id
GROUP BY category.`name`
ORDER BY amount DESC
LIMIT 0, 5;

/* 8a. In your new role as an executive, you would like to have an easy way
of viewing the Top five genres by gross revenue. Use the solution from the
problem above to create a view */
CREATE VIEW top_grossing_movies
AS SELECT category.`name`, SUM(payment.amount) AS amount
FROM sakila.category
	JOIN sakila.film_category
		ON category.category_id = film_category.category_id
	JOIN sakila.inventory
		ON film_category.film_id = inventory.film_id
	JOIN sakila.rental
		ON inventory.inventory_id = rental.inventory_id
	JOIN sakila.payment
		ON rental.rental_id = payment.rental_id
GROUP BY category.`name`
ORDER BY amount DESC
LIMIT 0, 5;

/* 8b. How would you display the view that you created in 8a? */
SELECT * FROM sakila.top_grossing_movies;

/* 8c. You find that you no longer need the view top_five_genres. Write a query to delete it */
DROP VIEW sakila.top_grossing_movies;