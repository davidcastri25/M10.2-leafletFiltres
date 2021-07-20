-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-07-2021 a las 12:58:22
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `my_app`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurants`
--

CREATE TABLE `restaurants` (
  `id_restaurant` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(250) NOT NULL,
  `lat` decimal(23,20) NOT NULL,
  `lng` decimal(23,20) NOT NULL,
  `kind_foot` set('Chino','Japonés','Árabe','Pizza / Italiano','Mexicano','Mediterráneo','Hamburguesa / Americano','Vegetariano / Vegano') NOT NULL,
  `photo` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `restaurants`
--

INSERT INTO `restaurants` (`id_restaurant`, `name`, `address`, `lat`, `lng`, `kind_foot`, `photo`) VALUES
(1, 'Tequila Cantina Mexicana', 'Carrer de Bilbao, 13, 08005 Barcelona', '41.40101401112480000000', '2.20610335393163200000', 'Mexicano', 'https://cdn.atrapalo.com/common/photo/res/51177/159772/ticr_0_0.jpg'),
(2, 'Bar Obon', 'Plaça de Maragall, 13, 08027 Barcelona', '41.42079132959550000000', '2.18109485530183370000', 'Mexicano,Mediterráneo,Vegetariano / Vegano', 'https://media-cdn.tripadvisor.com/media/photo-s/17/29/60/a5/genial.jpg'),
(3, 'Restaurant L\'Ona', 'Carretera Km. 638.5, N-II, 08330 Premià de Mar, Barcelona', '41.49188648937127500000', '2.36912753996068400000', 'Mediterráneo,Vegetariano / Vegano', 'https://www.restaurant-ona.com/images/slideshow/la-foto-2---copia.JPG'),
(4, 'Restaurante Río Dragón', 'Carrer de l\'Oblit, 3, 08041 Barcelona', '41.42064192998426000000', '2.17937199763015330000', 'Chino', 'https://fastly.4sqi.net/img/general/200x200/21148956_TZj5d2ncXz_zQYqw3d43HdG1AVfWa0FqXPRRLfK7r3g.jpg'),
(5, 'La Trocadero', 'Carrer de la Marina, 269, 08025 Barcelona', '41.40510652877892000000', '2.17360651297302000000', 'Vegetariano / Vegano', 'https://media.timeout.com/images/104099893/630/472/image.jpg'),
(6, 'Restaurante Clover Japonés', 'Carrer de l\'Escorial, 124, 128, 08024 Barcelona', '41.40924205963939000000', '2.15982318413731230000', 'Japonés', 'https://media-cdn.tripadvisor.com/media/photo-s/13/8d/a0/60/clover-restaurant-japones.jpg'),
(7, 'Ugarit plaza joanic', 'Carrer de Bruniquer, 69, 08024 Barcelona', '41.40601191513644600000', '2.16239456694300400000', 'Árabe', 'https://www.restaurantesirio.es/sites/default/files/joanic3.jpg'),
(8, 'Pizzeria Ninones', 'Ronda del Guinardó, 114, 08041 Barcelona', '41.41664985240614000000', '2.17442698228667800000', 'Pizza / Italiano,Hamburguesa / Americano', 'https://10619-2.s.cdn12.com/rests/original/342_325954925.jpg'),
(9, 'ROMAN PIZZA BADALONA', 'Carrer d\'En Prim, 173, 08911 Badalona, Barcelona', '41.45151471078300000000', '2.25279428228779070000', 'Pizza / Italiano', 'https://jobtoday-prod.s3.eu-central-1.amazonaws.com/img/046deba6-abf9-4fce-acc2-fad46e77d61f/640x640.jpg'),
(10, 'Takumi Ramen Barcelona', 'Carrer de Balmes, 59, 08007 Barcelona', '41.38975936478019000000', '2.16187272461417960000', 'Japonés', 'https://i0.wp.com/yummybarcelona.com/wp-content/uploads/2018/03/ramen-takumi-1.jpg?resize=800%2C535&ssl=1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id_restaurant`),
  ADD UNIQUE KEY `address` (`address`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id_restaurant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
