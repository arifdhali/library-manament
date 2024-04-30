-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 30, 2024 at 01:02 PM
-- Server version: 8.0.27
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library_managment`
--

-- --------------------------------------------------------

--
-- Table structure for table `books_list`
--

DROP TABLE IF EXISTS `books_list`;
CREATE TABLE IF NOT EXISTS `books_list` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` text NOT NULL,
  `authors` text NOT NULL,
  `genre` text NOT NULL,
  `publication` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `plot` text NOT NULL,
  `themes` text NOT NULL,
  `impact` text NOT NULL,
  `legacy` text NOT NULL,
  `thumbnail` text NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `books_list`
--

INSERT INTO `books_list` (`book_id`, `user_id`, `title`, `authors`, `genre`, `publication`, `plot`, `themes`, `impact`, `legacy`, `thumbnail`, `price`) VALUES
(1, 0, 'Watchmen', 'Alan Moore (writer) and Dave Gibbons (artist)', 'Superhero, Science Fiction, Drama', ' March 6, 2009 ', 'Set in an alternate history where superheroes emerged in the 1940s and 1960s, the story follows a group of retired vigilantes investigating the murder of one of their own. Their investigation uncovers a plot that could change the course of history.', 'Watchmen is known for its deep exploration of complex themes such as morality, politics, power, and the nature of heroism.', 'Watchmen is often cited as one of the greatest graphic novels of all time. It revolutionized the comic book industry with its mature themes and deconstruction of the superhero genre.', 'The series has been adapted into a film in 2009 and an upcoming TV series on HBO titled \"Watchmen,\" which serves as a sequel to the original story.', 'https://kitabay.com/cdn/shop/files/7d8d55c477f4be6f318d891296e9984d.jpg?v=1714467993&width=325', 90),
(2, 0, 'To Kill a Mockingbird', 'Harper Lee', 'Fiction, Southern Gothic, Bildungsroman', 'July 11, 1960', 'Set in the American South during the 1930s, the novel follows the Finch family and their experiences with racism and injustice, particularly as lawyer Atticus Finch defends a black man falsely accused of raping a white woman.', 'Racism, morality, empathy, coming-of-age', 'Considered a classic of modern American literature, the novel has been praised for its poignant portrayal of racial injustice and has had a significant impact on readers and society.', '\"To Kill a Mockingbird\" is often cited as one of the greatest novels of the 20th century and continues to be studied in schools for its powerful themes and messages.', 'https://m.media-amazon.com/images/I/81gepf1eMqL._AC_UF1000,1000_QL80_.jpg', 11),
(3, 0, '1984', 'George Orwell', 'Dystopian fiction, Social science fiction, Political fiction', 'June 8, 1949', 'Set in a dystopian future where the government, led by the Party and its leader Big Brother, controls every aspect of life, the novel follows Winston Smith as he rebels against the oppressive regime.', 'Totalitarianism, surveillance, propaganda, freedom', ' \"1984\" has had a profound impact on popular culture and political thought, popularizing concepts such as Big Brother, thoughtcrime, and Newspeak.', 'The novel\'s themes and warnings about the dangers of totalitarianism remain relevant today, ensuring its place as a classic of dystopian literature.', 'https://m.media-amazon.com/images/I/81StSOpmkjL._AC_UF1000,1000_QL80_.jpg', 10),
(4, 0, 'The Great Gatsby', 'F. Scott Fitzgerald', 'Novel, Tragedy, Modernism', 'April 10, 1925', 'Set in the Jazz Age of the 1920s, the novel follows the enigmatic millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan.', 'The American Dream, wealth, class, love, disillusionment', ' \"The Great Gatsby\" is considered a masterpiece of American literature and is widely regarded as one of the greatest novels ever written.', ' \"The Great Gatsby\" is considered a masterpiece of American literature and is widely regarded as one of the greatest novels ever written.', 'https://m.media-amazon.com/images/I/81QuEGw8VPL._AC_UF1000,1000_QL80_.jpg', 13);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
