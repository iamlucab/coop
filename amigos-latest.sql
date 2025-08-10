-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 27, 2025 at 03:16 PM
-- Server version: 10.6.22-MariaDB-cll-lve
-- PHP Version: 8.3.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `amigos`
--

-- --------------------------------------------------------

--
-- Table structure for table `benefits`
--

CREATE TABLE `benefits` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `event_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `benefit_member`
--

CREATE TABLE `benefit_member` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `benefit_id` bigint(20) UNSIGNED NOT NULL,
  `member_id` bigint(20) UNSIGNED NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Given',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cashback_logs`
--

CREATE TABLE `cashback_logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `member_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cashback_logs`
--

INSERT INTO `cashback_logs` (`id`, `member_id`, `order_id`, `amount`, `description`, `source`, `created_at`, `updated_at`) VALUES
(3, 16, 16, 10.00, 'Cashback from Order #16', NULL, '2025-07-19 23:11:36', '2025-07-19 23:11:36'),
(4, 15, 17, 20.00, 'Cashback from Order #17', NULL, '2025-07-22 09:31:37', '2025-07-22 09:31:37');

-- --------------------------------------------------------

--
-- Table structure for table `cash_in_requests`
--

CREATE TABLE `cash_in_requests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `member_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `proof_path` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cash_in_requests`
--

INSERT INTO `cash_in_requests` (`id`, `member_id`, `amount`, `payment_method`, `note`, `proof_path`, `status`, `created_at`, `updated_at`) VALUES
(1, 15, 10000.00, 'GCash', NULL, NULL, 'Approved', '2025-07-22 09:23:40', '2025-07-22 09:30:27'),
(2, 10034, 100.00, 'GCash', NULL, 'proofs/NnYNGX7kLhJ9ieWp3Ofcw4KqWl0XJDcSfJrQrQbG.jpg', 'Pending', '2025-07-23 18:34:31', '2025-07-23 18:34:31'),
(3, 10034, 100.00, 'GCash', NULL, 'proofs/4QJvF5Yz3KolhSqKEDuKEemZ7QgkGuyUHkkOumh5.jpg', 'Pending', '2025-07-23 18:34:36', '2025-07-23 18:34:36');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Food', NULL, NULL),
(2, 'Drinks', NULL, NULL),
(3, 'Household', NULL, NULL),
(4, 'Apparels', NULL, NULL),
(5, 'Health & Beauty', NULL, NULL),
(6, 'Electronics', NULL, NULL),
(7, 'Sports & Outdoors', NULL, NULL),
(8, 'Toys & Games', NULL, NULL),
(9, 'Books & Stationery', NULL, NULL),
(10, 'Automotive', NULL, NULL),
(11, 'Pets', NULL, NULL),
(12, 'Gardening', NULL, NULL),
(13, 'Office Supplies', NULL, NULL),
(14, 'Jewelry & Accessories', NULL, NULL),
(15, 'Music & Movies', NULL, NULL),
(16, 'Skills Directory', '2025-07-22 13:15:08', '2025-07-22 13:24:44');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `loans`
--

CREATE TABLE `loans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `member_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `purpose` varchar(255) DEFAULT NULL,
  `interest_rate` decimal(5,2) NOT NULL,
  `term_months` int(11) NOT NULL,
  `monthly_payment` decimal(10,2) DEFAULT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `loan_payments`
--

CREATE TABLE `loan_payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `loan_id` bigint(20) UNSIGNED NOT NULL,
  `due_date` date NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `is_paid` tinyint(1) NOT NULL DEFAULT 0,
  `paid_at` timestamp NULL DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `mobile_number` varchar(255) NOT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `role` enum('Admin','Staff','Member') NOT NULL DEFAULT 'Member',
  `sponsor_id` bigint(20) UNSIGNED DEFAULT NULL,
  `voter_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `loan_eligible` tinyint(1) NOT NULL DEFAULT 0,
  `status` varchar(255) NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `first_name`, `middle_name`, `last_name`, `birthday`, `mobile_number`, `occupation`, `address`, `photo`, `role`, `sponsor_id`, `voter_id`, `created_at`, `updated_at`, `loan_eligible`, `status`) VALUES
(14, 'Luis', 'Naong', 'Cabandez', '1980-01-25', '09177260180', 'Administrator', 'HQ City', '6876fbc100950.jpg', 'Admin', NULL, NULL, '2025-07-15 14:28:18', '2025-07-20 00:19:34', 1, 'Approved'),
(15, 'Blissy', 'Miles', 'Cabandez', '2017-06-07', '09191111111', 'Lawyer', 'Evissa, Matina Pangi Davao City', '6876661069d6c.png', 'Member', 14, NULL, '2025-07-15 14:28:18', '2025-07-15 14:30:40', 1, 'Approved'),
(16, 'Ruthcil', 'Alcazar', 'Cabandez', '1982-06-13', '09192222222', 'Accountant', 'Door C Alpha 11 Building, Rizal Extension Street, Davao City', '687666bdb292d.png', 'Member', 15, NULL, '2025-07-15 14:32:02', '2025-07-15 14:33:33', 0, 'Approved'),
(17, 'System', 'A.', 'Admin', '1990-01-01', '09170000001', 'Administrator', 'HQ City', 'default-profile.png', 'Admin', NULL, NULL, '2025-07-17 08:21:10', '2025-07-17 08:21:10', 1, 'Approved'),
(10026, 'Bernie', 'Paraguya', 'Baldesco', '1980-04-04', '09465935416', 'Businessman', NULL, NULL, 'Member', 16, NULL, '2025-07-22 07:06:54', '2025-07-22 07:06:54', 0, 'Approved'),
(10027, 'Cindy', 'Polison', 'Bandao', '1998-02-23', '09914528619', 'Saleswoman', NULL, NULL, 'Member', 10026, NULL, '2025-07-22 07:08:08', '2025-07-22 07:08:08', 0, 'Approved'),
(10028, 'Nor', 'U', 'Umpar', '1982-04-04', '09099200018', 'Lawyer', NULL, NULL, 'Member', 16, NULL, '2025-07-22 07:09:47', '2025-07-22 07:09:47', 0, 'Approved'),
(10029, 'Ariel', 'Besmar', 'Capili', '1967-10-19', '09171852313', NULL, NULL, NULL, 'Member', 10028, NULL, '2025-07-22 07:10:44', '2025-07-22 07:10:44', 0, 'Approved'),
(10030, 'Mary Ann', 'Pagas', 'Olbez', '1982-10-25', '09264663844', NULL, NULL, NULL, 'Member', 16, NULL, '2025-07-22 07:11:45', '2025-07-22 07:11:45', 0, 'Approved'),
(10031, 'Renz', 'Lim', 'Licarte', '1988-05-11', '09763632594', 'Engineer', NULL, NULL, 'Member', 16, NULL, '2025-07-22 07:12:43', '2025-07-22 07:12:43', 0, 'Approved'),
(10032, 'Margie', 'Navea', 'Palacio', '1993-07-12', '09670891993', 'Business owner', NULL, NULL, 'Member', 16, NULL, '2025-07-22 07:13:36', '2025-07-22 07:13:36', 0, 'Approved'),
(10033, 'Leah', 'Maldepeña', 'Perez', '1989-01-21', '09198649321', 'Supervisor', NULL, NULL, 'Member', 10032, NULL, '2025-07-22 07:16:31', '2025-07-22 07:16:31', 0, 'Approved'),
(10034, 'MELANIE', 'MORAN', 'GUIDAY', '1988-12-01', '09165210706', 'Real Estate Salesperson', NULL, NULL, 'Member', 10028, NULL, '2025-07-23 12:19:27', '2025-07-23 12:19:27', 0, 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `membership_codes`
--

CREATE TABLE `membership_codes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(8) NOT NULL,
  `used` tinyint(1) NOT NULL DEFAULT 0,
  `used_by` bigint(20) UNSIGNED DEFAULT NULL,
  `used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `membership_codes`
--

INSERT INTO `membership_codes` (`id`, `code`, `used`, `used_by`, `used_at`, `created_at`, `updated_at`) VALUES
(1, 'NHJHONQE', 1, 10, '2025-07-15 14:32:02', '2025-07-15 13:37:04', '2025-07-15 14:32:02'),
(2, 'god', 1, NULL, '2025-07-18 01:37:35', '2025-07-15 13:37:04', '2025-07-18 01:37:35'),
(3, '4XCJS0OG', 1, NULL, '2025-07-19 00:22:18', '2025-07-15 13:37:04', '2025-07-19 00:22:18'),
(4, 'TWVW1WRR', 1, NULL, '2025-07-20 00:25:04', '2025-07-15 13:37:04', '2025-07-20 00:25:04'),
(5, 'OV6BLMX3', 1, 11053, '2025-07-23 12:19:27', '2025-07-15 13:37:04', '2025-07-23 12:19:27'),
(6, 'HLDE5ZS8', 1, 11051, '2025-07-22 07:13:36', '2025-07-15 13:37:04', '2025-07-22 07:13:36'),
(7, 'BD6ACFVC', 1, 11050, '2025-07-22 07:12:43', '2025-07-15 13:37:04', '2025-07-22 07:12:43'),
(8, 'BKZSWO4E', 1, 11049, '2025-07-22 07:11:45', '2025-07-15 13:37:04', '2025-07-22 07:11:45'),
(9, 'SODFKRAC', 1, 11048, '2025-07-22 07:10:44', '2025-07-15 13:37:04', '2025-07-22 07:10:44'),
(10, 'IUZGBNMW', 1, 11047, '2025-07-22 07:09:47', '2025-07-15 13:37:04', '2025-07-22 07:09:47'),
(11, '7FF4DRUC', 1, 11046, '2025-07-22 07:08:08', '2025-07-15 13:37:04', '2025-07-22 07:08:08'),
(12, 'KAXZSRUP', 1, 11045, '2025-07-22 07:06:55', '2025-07-15 13:37:04', '2025-07-22 07:06:55'),
(13, 'PVVCRKS5', 1, NULL, '2025-07-19 03:11:39', '2025-07-15 13:37:04', '2025-07-19 03:11:39'),
(14, '7PECCETO', 1, NULL, '2025-07-19 01:53:16', '2025-07-15 13:37:04', '2025-07-19 01:53:16'),
(15, 'IGTJIM21', 1, 11052, '2025-07-22 07:16:31', '2025-07-15 13:37:04', '2025-07-22 07:16:31'),
(16, 'SDOJBMR2', 0, NULL, NULL, '2025-07-25 05:22:15', '2025-07-25 05:22:15'),
(17, 'SB8F5P3C', 0, NULL, NULL, '2025-07-25 05:22:15', '2025-07-25 05:22:15'),
(18, '8CC482EU', 0, NULL, NULL, '2025-07-25 05:22:15', '2025-07-25 05:22:15'),
(19, 'C7DR57WO', 0, NULL, NULL, '2025-07-25 05:22:15', '2025-07-25 05:22:15'),
(20, 'APG94HAZ', 0, NULL, NULL, '2025-07-25 05:22:15', '2025-07-25 05:22:15'),
(21, 'RIBPXIY7', 0, NULL, NULL, '2025-07-25 05:22:15', '2025-07-25 05:22:15'),
(22, 'OOIX5ZRB', 0, NULL, NULL, '2025-07-25 05:22:15', '2025-07-25 05:22:15'),
(23, 'PDGHOSQ1', 0, NULL, NULL, '2025-07-25 05:22:15', '2025-07-25 05:22:15'),
(24, 'WUC4EKCG', 0, NULL, NULL, '2025-07-25 05:22:15', '2025-07-25 05:22:15'),
(25, 'ZNFUSCBC', 0, NULL, NULL, '2025-07-25 05:22:15', '2025-07-25 05:22:15');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_100000_create_password_resets_table', 1),
(2, '2019_08_19_000000_create_failed_jobs_table', 1),
(3, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(4, '2025_06_18_000000_create_members_table', 1),
(5, '2025_06_18_000001_create_users_table', 1),
(6, '2025_06_18_110030_create_voters_table', 1),
(7, '2025_06_18_110255_create_benefits_table', 1),
(8, '2025_06_18_110337_create_benefit_member_table', 1),
(9, '2025_06_18_110359_create_loans_table', 1),
(10, '2025_06_18_115815_create_wallets_table', 1),
(11, '2025_06_19_005439_add_wallet_id_to_wallets_table', 1),
(12, '2025_06_19_020350_create_cash_in_requests_table', 1),
(13, '2025_06_19_034014_alter_status_column_in_loans_table', 1),
(14, '2025_06_19_035728_add_term_months_to_loans_table', 1),
(15, '2025_06_19_040132_create_loan_payments_table', 1),
(16, '2025_06_19_090214_add_purpose_to_loans_table', 1),
(17, '2025_06_29_013134_add_user_id_to_wallets_table', 1),
(18, '2025_06_29_013643_add_user_id_to_wallets_table', 1),
(19, '2025_06_29_014103_make_member_id_nullable_on_wallets_table', 1),
(20, '2025_06_29_115442_create_membership_codes_table', 1),
(21, '2025_06_29_125724_add_address_to_members_table', 1),
(22, '2025_06_30_150111_create_reward_programs_table', 1),
(23, '2025_06_30_150225_create_reward_winners_table', 1),
(24, '2025_06_30_151341_add_winner_id_to_reward_programs_table', 1),
(25, '2025_06_30_154307_add_foreign_key_to_reward_winners_table', 1),
(26, '2025_06_30_161911_add_seen_to_reward_winners_table', 1),
(27, '2025_06_30_170336_add_status_to_reward_winners_table', 1),
(28, '2025_06_30_172643_create_tickets_table', 1),
(29, '2025_06_30_174814_create_ticket_replies_table', 1),
(30, '2025_06_30_183242_add_member_id_to_ticket_replies_table', 1),
(31, '2025_06_30_194012_add_user_id_to_ticket_replies_table', 1),
(32, '2025_06_30_200510_add_wallet_id_to_wallets_table', 1),
(33, '2025_07_01_013959_add_loan_eligible_to_members_table', 1),
(34, '2025_07_01_034004_add_note_to_loan_payments_table', 1),
(35, '2025_07_02_031340_add_status_to_members_and_users', 1),
(36, '2025_07_02_064335_create_mobile_password_resets_table', 1),
(37, '2025_07_05_003513_add_proof_path_to_cash_in_requests_table', 1),
(38, '2025_07_05_102128_add_payment_method_to_cash_in_requests_table', 1),
(39, '2025_07_10_170926_create_referral_bonus_logs_table', 1),
(40, '2025_07_11_192351_create_products_table', 1),
(41, '2025_07_11_192501_create_orders_table', 1),
(42, '2025_07_11_192505_create_order_items_table', 1),
(43, '2025_07_11_192507_create_cashback_logs_table', 1),
(44, '2025_07_11_220911_create_categories_table', 1),
(45, '2025_07_11_220916_create_units_table', 1),
(46, '2025_07_11_220959_add_fields_to_products_table', 1),
(47, '2025_07_11_222707_add_stock_quantity_to_products_table', 1),
(48, '2025_07_12_105759_create_wallet_transactions_table', 1),
(49, '2025_07_12_111511_add_wallet_id_to_wallet_transactions_table', 1),
(50, '2025_07_13_061230_add_checkout_fields_to_orders_table', 1),
(51, '2025_07_13_064546_alter_orders_add_default_to_total_cashback', 1),
(52, '2025_07_13_115111_create_settings_table', 1),
(53, '2025_07_13_150011_add_discounts_to_products_table', 1),
(54, '2025_07_14_053443_add_type_to_wallets_table', 1),
(55, '2025_07_14_092645_add_source_to_cashback_logs_table', 1),
(56, '2025_07_14_093642_alter_wallet_transactions_add_cashback_type', 1),
(57, '2025_07_14_093953_add_cashback_given_to_orders_table', 1),
(58, '2025_07_15_180036_add_source_to_wallet_transactions_table', 1),
(59, '2025_07_15_200002_add_member_id_to_wallet_transactions_table', 1),
(60, '2025_07_17_232934_add_cashback_amount_to_order_items_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `mobile_password_resets`
--

CREATE TABLE `mobile_password_resets` (
  `mobile_number` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `member_id` bigint(20) UNSIGNED NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `total_cashback` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `cashback_given` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `delivery_type` varchar(255) DEFAULT NULL,
  `delivery_address` text DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `reference_image` varchar(255) DEFAULT NULL,
  `gcash_note` varchar(255) DEFAULT NULL,
  `bank_note` varchar(255) DEFAULT NULL,
  `amount_sent` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `member_id`, `total_amount`, `total_cashback`, `status`, `cashback_given`, `created_at`, `updated_at`, `payment_method`, `delivery_type`, `delivery_address`, `contact_number`, `reference_image`, `gcash_note`, `bank_note`, `amount_sent`) VALUES
(16, 16, 0.00, 0.00, 'Delivered', 0, '2025-07-19 23:11:03', '2025-07-19 23:11:36', 'COD', 'pickup', NULL, '345678765432', NULL, NULL, NULL, NULL),
(17, 15, 0.00, 0.00, 'Delivered', 0, '2025-07-22 09:26:01', '2025-07-22 09:31:37', 'COD', 'delivery', 'Evissa, Matina Pangi Davao City', '2345678', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `cashback_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `cashback` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `cashback_amount`, `cashback`, `created_at`, `updated_at`) VALUES
(3, 16, 5, 1, 200.00, 0.00, 10.00, '2025-07-19 23:11:03', '2025-07-19 23:11:03'),
(4, 17, 3, 2, 80.00, 0.00, 10.00, '2025-07-22 09:26:01', '2025-07-22 09:26:01');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `cashback_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount_value` decimal(8,2) DEFAULT NULL,
  `discount_type` enum('flat','percent') DEFAULT NULL,
  `promo_code` varchar(255) DEFAULT NULL,
  `stock_quantity` int(11) NOT NULL DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `gallery` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`gallery`)),
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `unit_id` bigint(20) UNSIGNED DEFAULT NULL,
  `attributes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`attributes`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `cashback_amount`, `discount_value`, `discount_type`, `promo_code`, `stock_quantity`, `image`, `active`, `created_at`, `updated_at`, `thumbnail`, `gallery`, `category_id`, `unit_id`, `attributes`) VALUES
(1, 'UGREEN 19*12cm Pouch Bag for Power Bank TWS Bluetooth Earbuds Flannel Bag Mobile Phone Accessories Portable Waterproof Drawstring Protection Bag', 'UGREEN 19*12cm Pouch Bag for Power Bank TWS Bluetooth Earbuds Flannel Bag Mobile Phone Accessories Portable Waterproof Drawstring Protection Bag', 85.00, 1.00, 10.00, 'flat', 'PROMO10', 3, NULL, 1, '2025-07-16 13:16:35', '2025-07-19 03:12:41', 'products/thumbnails/E7FpFtypLVdUsY6oiNLYoPKSfj53ed9gX5PqRTjD.jpg', '[\"products\\/gallery\\/WmOGnOKHu8nbRX4DYnFKIMxqknqHYHImPMPKVlT5.jpg\",\"products\\/gallery\\/tlTL7MlI1QzxwmQeSrMl9CVGrfwEAsRDDblZxlTu.jpg\",\"products\\/gallery\\/4p8NfRU81TjawoP7HC3DvFB0dqF1fgFg0BEdIR1e.jpg\",\"products\\/gallery\\/W05Lp2jV84aPXTqoZF5eMJpKAIiwiIbaZYBdydyJ.jpg\",\"products\\/gallery\\/avIQwHFVPgoLWRA1oHclbUu2VD0eJTRVFPdBdLJX.jpg\"]', 8, 1, NULL),
(2, 'Turbo F08 USB Rechargeable Mini Handy Super 100 Wind Speed Function with LED Digital Display Fan', 'Turbo F08 USB Rechargeable Mini Handy Super 100 Wind Speed Function with LED Digital Display Fan', 100.00, 20.00, 10.00, 'flat', 'PROMO10', 0, NULL, 1, '2025-07-16 13:17:37', '2025-07-17 15:10:15', 'products/thumbnails/nKsl8gHOCEGAi3l1Z7ewcMacdTIEiNcSPr93v1Ve.jpg', '[\"products\\/gallery\\/P0RzduoshLgqJg0lh6xYzkUPJHvEYhKy3pQg45DB.jpg\",\"products\\/gallery\\/TGP5CWIQQCV0vxdr8bpmeBLjQyzLS7Sl7tBTejPN.jpg\",\"products\\/gallery\\/FKPfeOIVPAd17Td6tBuipUryqTKwBfyoGm7gNE9h.jpg\"]', 7, 10, NULL),
(3, 'Mini Fan USB Rechargeable Handheld Portable Fan 100 Speed Adjustment led Display battery level turbo Fan', 'Mini Fan USB Rechargeable Handheld Portable Fan 100 Speed Adjustment led Display battery level turbo Fan', 80.00, 10.00, 10.00, 'flat', 'PROMO10', 7, NULL, 1, '2025-07-17 10:12:40', '2025-07-22 09:26:01', 'products/thumbnails/TeM9teKlcqxjJvYXUqec3AiyVr2cZ81aqXbjpCgu.jpg', '[\"products\\/gallery\\/lIoqfFF9arNONAV3w8ehRbuhRyjBAdoAT9jpuOJZ.jpg\",\"products\\/gallery\\/my7ddCjSu9sPknD7ELallq0WfBNV6Odq8bXWFsws.jpg\",\"products\\/gallery\\/MtowV8d3uM44JXifZSbseFcuIm8kdHno0n0YJlN1.jpg\"]', 5, 1, NULL),
(4, 'Women Slim Strap Watch Square Dial Analog Quartz Wrist Watch Gift', 'Women Slim Strap Watch Square Dial Analog Quartz Wrist Watch Gift', 150.00, 10.00, 10.00, 'flat', 'PROMO10', 5, NULL, 1, '2025-07-17 10:14:42', '2025-07-18 04:44:57', 'products/thumbnails/tJq5irGJXFWgkXRIfk6tf4vWoIgGZQx9BUSjkuio.jpg', '[\"products\\/gallery\\/GG7HdbZ3BVaOs6CoNINqgEZf3GPqEXljiZiwkjin.jpg\",\"products\\/gallery\\/eVbFNhN7uIhB9kyw8NlFPfDCrSAEXoxuDi1AZFB9.jpg\",\"products\\/gallery\\/aqWQPCG1Bu2zpCSfIiIlWEbVesymF1HvBnNYuRx2.jpg\"]', 5, 1, NULL),
(5, 'Deep Cleansing Solid Green Tea Mask Stick Removal Oil Blackhead Moisturizing Facial Skin Care', 'Deep Cleansing Solid Green Tea Mask Stick Removal Oil Blackhead Moisturizing Facial Skin Care', 200.00, 10.00, 10.00, 'flat', 'PROMO10', 6, NULL, 1, '2025-07-17 10:16:44', '2025-07-19 23:11:03', 'products/thumbnails/ilYghDqfNdvMEFKnltFtthJ61ePwWJv3eCjmSd5x.jpg', '[\"products\\/gallery\\/gkY1LtZkhPjF9z68eMUACOY29OCuTqMxTPIrXI0N.jpg\",\"products\\/gallery\\/pkfwe75quiqIo7reLs4u2na4jRxfD1EPdZKFd91p.jpg\"]', 12, 2, NULL),
(6, 'Plain Summer Waffle Loose Casual Shorts For Men', 'Plain Summer Waffle Loose Casual Shorts For Men', 200.00, 20.00, 10.00, 'flat', 'NEW25', 5, NULL, 1, '2025-07-17 10:18:41', '2025-07-18 01:39:49', 'products/thumbnails/4lz3Naio9aK2GVHzwoOF8V5NFFph0fRYazmDXkYH.jpg', '[\"products\\/gallery\\/H28iTIqkJvwV5tcM0U4lCwXujbVJAoBwfTLjFFeN.jpg\",\"products\\/gallery\\/J00ueY14Ko0wLJ5oaUNLvOG4T5IxbPFAKt1lSK1P.jpg\",\"products\\/gallery\\/yHRu6o1wvIRoKG1I3aQ5jq0RHg3NfD00KjZKbHnE.jpg\"]', 4, 1, NULL),
(7, 'Original good quality Power Bank 10000mAh Mini Powerbank Built in Cables Portable fast charging', 'Original good quality Power Bank 10000mAh Mini Powerbank Built in Cables Portable fast charging', 150.00, 15.00, 10.00, 'flat', 'PROMO10', 8, NULL, 1, '2025-07-18 23:03:03', '2025-07-19 01:50:05', 'products/thumbnails/fxF2w4hWGijJ398CR51MrpydIc0AmaVT4NhFZKEt.jpg', '[\"products\\/gallery\\/mNFtHOQUf9qHQ39dYpx0dlXAq9JbF3JLJ9af31N9.jpg\",\"products\\/gallery\\/8XEHyEFgWzXhYVLXZiDqfxvANWv0BrzlStcqEzPY.jpg\",\"products\\/gallery\\/Ay04cGEeyz5eH0imcgRj9kEC1kfRqURRA27CdYl4.jpg\"]', 14, 1, NULL),
(8, 'Diamond Premium Long Grain Jasmine Rice (20kg/bag)', 'Jasmine Rice 20kg per sack\r\nDirect Import from Vietnam \r\n100% Organic', 850.00, 20.00, NULL, NULL, 'NEW25', 10, NULL, 1, '2025-07-22 13:38:33', '2025-07-22 13:38:33', 'products/thumbnails/1A2LN7WbWtJFlpfikLBWMx5Lrm3Z0cTZsX4b1dDs.jpg', '[\"products\\/gallery\\/4EJqe0XHRVGZY3QoK3xEKpDZLz4UjRXoNsZVwp3T.jpg\",\"products\\/gallery\\/HtybZsBENHqQ0Juk796CKgYI7f8ewPYRFKLQWc2f.jpg\",\"products\\/gallery\\/pJB2Z4uL1bZHN1MlxZIzYVJ4MvkzTFYafFTidyzl.jpg\"]', 3, 1, NULL),
(9, 'Canon Pixma MG2570S Printer (PG745/CL746)', 'Canon Pixma MG2570S Printer (PG745/CL746)\r\nCompact All-In-One for Low-Cost Printing\r\nAffordable All-In-One printer with basic printing, copying and scanning functions.\r\n\r\nPrint, Scan, Copy\r\nPrint Speed (A4): up to 8.0 / 4.0 ipm (mono/colour)\r\nUSB 2.0\r\nRecommended Monthly Print Volume: 10 - 80 pages\r\n\r\n\r\nNumber of Nozzles\r\n\r\nTotal 1,280 nozzles\r\n\r\nInk Cartridges (Type/Colours)\r\n\r\nPG-745S (Pigment Ink/Black), CL-746S (Dye-Based Ink/Colour)\r\n[Optional: PG-745, CL-746 / PG-745XL, CL-746XL]\r\n\r\nMaximum Print Resolution\r\n\r\n4,800 (horizontal)*1 x 600 (vertical) dpi\r\n\r\nPrint Speed*2 (Approx.)\r\n\r\nBased on ISO/IEC 24734\r\nClick here for summary report\r\nClick here for Document Print and Copy Speed Measurement Conditions\r\n\r\nDocument (ESAT/Simplex)\r\n\r\n8 / 4 ipm (mono/colour)\r\n\r\nPrint Width\r\n\r\nUp to 203.2 mm (8\")\r\n\r\nRecommended Printing Area\r\n\r\nTop margin: 31.6 mm\r\nBottom margin: 29.2 mm', 2998.00, 10.00, NULL, NULL, NULL, 10, NULL, 1, '2025-07-22 13:45:07', '2025-07-22 13:45:07', 'products/thumbnails/py7nxEfM22XqM5DdNYGgnzjUrLV73OHgc2WU0m70.jpg', '[\"products\\/gallery\\/qWOJLjVI5WHnHeHdgAN6aZy3sBw9knzD8u2E5KVV.jpg\",\"products\\/gallery\\/XhvGo7alJI4QmH4hvH18GX9UZDzcc6F51xpoZy6x.jpg\",\"products\\/gallery\\/tDrJQBDOGK7pfa63gI4OrWpKqnW0vgfIGBbC3fCt.jpg\",\"products\\/gallery\\/S5SILNahFy3zYYqTt9knluYKfAa8mLOsnqVAYSJj.jpg\"]', 13, 1, NULL),
(10, 'Brandnew 50\" NVISION Smart TV', 'Full HD Resolution: The Nvision N600-T43MA TV boasts a Full HD (1080p) resolution, providing crisp and detailed images with vibrant colors and sharp clarity. \r\nLED Backlighting: Equipped with LED backlighting technology, this TV delivers enhanced brightness and contrast levels while consuming less power compared to traditional LCD TVs. LED backlighting ensures energy efficiency and a more vibrant picture quality.\r\nMultiple Connectivity Options: The N600-T43MA TV features multiple connectivity options, including HDMI, USB, VGA, AV input, and RF input, allowing users to connect various devices such as gaming consoles, Blu-ray players, streaming devices, and more, expanding entertainment possibilities.\r\nBuilt-in Tuner: With its built-in tuner, this TV enables users to access over-the-air broadcast channels without the need for an external set-top box. Users can enjoy watching their favorite local channels with clear reception and minimal hassle.\r\nSlim Design: The Nvision N600-T43MA TV boasts a sleek and modern design that complements any living space.', 13000.00, 50.00, NULL, NULL, NULL, 10, NULL, 1, '2025-07-22 13:54:28', '2025-07-22 13:54:28', 'products/thumbnails/ZOYChy4AAJrZovOkmyxAtwfYmDS0R0paaVCqbmMg.jpg', '[\"products\\/gallery\\/wz4ZwOfEfZqpei1Y0Y4JLlADTFjWXIJbU6VnreqQ.jpg\",\"products\\/gallery\\/ar0HAxoDI7h0yhN44CO2QMCzLskLV3FEZWBsxW5n.jpg\",\"products\\/gallery\\/YGBVhK2ZKYMT8mBJJb8mlonfpxDnRKNBlgTIewWh.jpg\",\"products\\/gallery\\/UBWeruMWF6us9XzMFSreYFPNLQvTygUPFRQXipof.jpg\",\"products\\/gallery\\/COh9ctjbS2rgdfecJOpFy2MTDMk0U5ZUV6oGFS0s.jpg\"]', 3, 1, NULL),
(11, 'NVISION 55\" 4K UHD SMART ANDROID LED TV', 'Model: S800-55S1D\r\nDisplay Size: 55” LED\r\nResolution: 3840 x 2160\r\nWall-mount: 400mm x 300mm\r\nTV System: PAL, NTSC, SECAM\r\nSound System: I, D/K, B/G, M\r\nMusic Support: mp3, wma, m4a, aac\r\nPicture Support: jpg, jpeg, bmp, png, txt\r\nVideo Support: avi, mp4, ts/trp, mkv, mov, mpg, dat, vob, rm/rmvb\r\nInput Source: (1)RJ45, (1)VGA, (3)HDMI, (2)USB, AV in, RF in, Coaxial, MINI AV, MINI (YPbPr), Earphone in\r\nSmart System: Android 11.0, 1.5G + 8G\r\nPower Input: 100-240V ~ 50/60Hz\r\nConsumption: 70W\r\nGross Weight: 14.3Kg\r\nBox Size:1350mm x 150mm x 815mm', 21000.00, 100.00, NULL, NULL, NULL, 10, NULL, 1, '2025-07-22 13:59:04', '2025-07-22 13:59:04', 'products/thumbnails/G8QCyUvf7vqiUzTMxpZRq9ha58Cp9GfLdF6nBeze.jpg', '[\"products\\/gallery\\/4f1ktsamuSONtWSGH4LM8RrYDXqqcXpMxh8NyIQL.webp\",\"products\\/gallery\\/bylekX38ttNYPFtYaKeCYopXWMBCTm7mMOHPZDhy.jpg\",\"products\\/gallery\\/run4D7hp0gZrxRnLPRGlKtU0Bkf6qKVmfAr4LcCQ.jpg\"]', 3, 1, NULL),
(12, 'Pan/Tilt Home Security Wi-Fi Camera', 'High-Definition Video: The Tapo C200 features 1080p high-definition video, providing users with clear and detailed footage.\r\nPan and Tilt: The device offers 360° horizontal and 114° vertical range, enabling complete coverage of the area.\r\nNight Vision: With advanced night vision up to 30 feet, the Tapo C200 allows users to monitor their homes around the clock.\r\nMotion Detection and Alerts: The device uses smart motion detection technology to send instant notifications to your phone whenever movement is detected.\r\nTwo-Way Audio: The Tapo C200 comes equipped with a built-in microphone and speaker, allowing users to communicate with family, pets, or warn off intruders.\r\nLocal Storage: The device supports microSD cards up to 512GB for local storage, providing a secure and cost-effective way to store footage.\r\nPrivacy Mode: Users can enable Privacy Mode to stop recording and control when the camera is monitoring and when it\'s not.\r\nEasy Setup and Management: With the Tapo app, users can easily set up and manage their Tapo C200, and access live streaming and other controls.\r\nVoice Control: The Tapo C200 is compatible with Google Assistant and Amazon Alexa, offering hands-free control for users.\r\nSecure Encryption: The device uses advanced encryption and wireless protocols to ensure data privacy and secure communication between your phone and the device', 1450.00, 100.00, NULL, NULL, NULL, 10, NULL, 1, '2025-07-22 14:02:17', '2025-07-22 14:04:04', 'products/thumbnails/AKhZVCXR6JUS1QJ856ocud3JfYGIaS42x9Ny7IMX.jpg', '[\"products\\/gallery\\/fftkEyTaCcY3dXmKNGVEaegCPa4XPkZIvaSvgdtv.jpg\",\"products\\/gallery\\/fbbVr1byMQtgQy0844UJOVLtr25WO2zc7UCuFskD.jpg\",\"products\\/gallery\\/DiXquPu65SWNDbTF9kHX9Br1oWDNevGPE3MeLRJ5.jpg\",\"products\\/gallery\\/OdugxfRXRololc4Jc4aN1KPiqwhaz8MXp7kWEUgl.jpg\",\"products\\/gallery\\/LS1drhPmy0bCN4L7Iqkc97o4s7GrnAk3x9PQ3B7U.png\"]', 6, 1, NULL),
(13, 'Pan/Tilt AI Home Security Wi-Fi Camera', 'Seamless Privacy Control - Use the button on the product shell or Tapo app to easily open or close the privacy shield, giving you complete control over your private moments.\r\n\r\n2K QHD - When it comes to home security, details matter. With 2K QHD resolution, the Tapo C225 transcends beyond traditional FullHD 1080p quality to display finer details and incredibly clear videos.\r\n\r\nApple Homekit Supported - Along with Amazon Alexa and Google Assistant compatibility,Tapo C225 can also fully integrate into your Apple Home ecosystem for convenient hands-free operation.\r\n\r\nSmart Motion Tracking - With pan/tilt functionality and smart motion tracking technology with up to 120°/s rotating speed, precisely track and follow subjects, continuously keeping them within the camera’s field of view.\r\n\r\nColor Night Vision - The highly sensitive starlight sensor captures higher-quality images even in low-light conditions up to 30 ft.\r\n\r\nInvisible Infrared Mode - If the red IR LEDs prove to be a distraction while monitoring at night, switch to invisible IR mode to continue monitoring in low-light conditions without the disrupting red light, making it ideal for sleeping children and pets.\r\n\r\nLocal and Cloud Storage - Save recorded videos on a microSD Card (up to 512 GB, purchased separately) or use Tapo Care cloud storage services (subscribe separately).\r\n\r\nSharing Capabilities - Seamlessly forward videos you want to share to your social platforms.', 2950.00, 100.00, NULL, NULL, NULL, 10, NULL, 1, '2025-07-22 14:06:41', '2025-07-22 14:06:41', 'products/thumbnails/mRukDqYmAXzQ128TXbMOqQzCyN9DChT88lWcCjyj.jpg', '[\"products\\/gallery\\/aEHmPknyZtsa6BNRG33qjbdGOXDZZKSG5RHERJe0.jpg\",\"products\\/gallery\\/2TmFHqwCSIFP0y0Vg98g77i21NUbrgNsxYEAtunS.jpg\",\"products\\/gallery\\/6MZw8DfNOoHEl0s7MT6zLWAfgZilELpYc2nOOijC.jpg\"]', 6, 1, NULL),
(14, 'PrimeHub-Pro Ultra-Fast Multiport USB-C Hub with 100W Power Delivery', 'Turn a single USB-C port into 100W Power Delivery, 4K HDMI, 1080p VGA, Ethernet, AUX, SD/TF Card, 3xUSB ports. Mirror or extend your USB-C PC/laptop screen, stream 4K UHD, or full HD 1080P video using HDMI or VGA port. Charge your laptop at 100W blazing speeds. Don’t lose out on connectivity with PrimeHub-Pro.\r\nAdd to Ca', 3850.00, 50.00, NULL, NULL, NULL, 10, NULL, 1, '2025-07-23 05:51:56', '2025-07-23 05:59:41', 'products/thumbnails/o2gWPUceelfPP7ppe0oY03nehokRqdPu0qBe3dzv.jpg', '[\"products\\/gallery\\/PAcFCTAXkxRzakMYXqBgPxQI7PRMwrV6eXPpBtX7.jpg\",\"products\\/gallery\\/c0HvQj3f6HxVD3sVJoGYZaWJtiSWANgC8c6n65xu.jpg\",\"products\\/gallery\\/MPv4MuWqsMLHYNHWQGaNPM2het8WqQ95Kr9ag89o.jpg\",\"products\\/gallery\\/IpHwRJYIQOFO6uij8agFOCum7fOzvgm9Blbo91LS.jpg\",\"products\\/gallery\\/VZaW65Anp8Zkka1tAHDeDYyjRpoiuP9NPS7M2d6P.jpg\"]', 6, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `referral_bonus_logs`
--

CREATE TABLE `referral_bonus_logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `member_id` bigint(20) UNSIGNED NOT NULL,
  `referred_member_id` bigint(20) UNSIGNED NOT NULL,
  `level` tinyint(4) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `referral_bonus_logs`
--

INSERT INTO `referral_bonus_logs` (`id`, `member_id`, `referred_member_id`, `level`, `amount`, `description`, `created_at`, `updated_at`) VALUES
(1, 17, 15, NULL, 25.00, NULL, '2025-07-17 08:22:09', '2025-07-17 08:22:09');

-- --------------------------------------------------------

--
-- Table structure for table `reward_programs`
--

CREATE TABLE `reward_programs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `draw_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `winner_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reward_winners`
--

CREATE TABLE `reward_winners` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `reward_program_id` bigint(20) UNSIGNED NOT NULL,
  `member_id` bigint(20) UNSIGNED NOT NULL,
  `drawn_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `excluded_until` date NOT NULL,
  `seen` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` enum('unclaimed','redeemed','expired') NOT NULL DEFAULT 'unclaimed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `created_at`, `updated_at`) VALUES
(1, 'discount_values', '[\"10\",\"20\",\"50\"]', '2025-07-15 13:25:32', '2025-07-15 13:25:32'),
(2, 'promo_codes', '[\"PROMO10\",\"NEW25\"]', '2025-07-15 13:25:32', '2025-07-15 13:25:32'),
(3, 'available_sizes', '[\"S\",\"M\",\"L\",\"XL\"]', '2025-07-15 13:25:32', '2025-07-15 13:25:32'),
(4, 'available_colors', '[\"Red\",\"Blue\",\"Green\"]', '2025-07-15 13:25:32', '2025-07-15 13:25:32'),
(5, 'shipping_fee', '100', '2025-07-22 13:25:01', '2025-07-22 13:25:01'),
(6, 'promo_note', '10% OFF Month of July', '2025-07-22 13:25:01', '2025-07-22 13:25:01'),
(7, 'discount_rate', '2', '2025-07-22 13:25:01', '2025-07-22 13:25:01');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `member_id` bigint(20) UNSIGNED NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `status` enum('pending','in_process','closed') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ticket_replies`
--

CREATE TABLE `ticket_replies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ticket_id` bigint(20) UNSIGNED NOT NULL,
  `message` text NOT NULL,
  `replied_by` varchar(255) NOT NULL,
  `member_id` bigint(20) UNSIGNED DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Piece', NULL, NULL),
(2, 'Kilogram', NULL, NULL),
(3, 'Liter', NULL, NULL),
(4, 'Box', NULL, NULL),
(5, 'Pack', NULL, NULL),
(6, 'Dozen', NULL, NULL),
(7, 'Set', NULL, NULL),
(8, 'Meter', NULL, NULL),
(9, 'Gram', NULL, NULL),
(10, 'Milliliter', NULL, NULL),
(11, 'Yard', NULL, NULL),
(12, 'Foot', NULL, NULL),
(13, 'Inch', NULL, NULL),
(14, 'Pound', NULL, NULL),
(15, 'Ounce', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `mobile_number` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` enum('Admin','Staff','Member') NOT NULL DEFAULT 'Member',
  `member_id` bigint(20) UNSIGNED DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `mobile_number`, `email`, `role`, `member_id`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `status`) VALUES
(8, 'Luis Cabandez', '09177260180', 'admin@hugpong.com', 'Admin', 14, '2025-07-15 14:28:18', '$2y$10$jbPoBw.S6u.f8UcLgxWEFer8ifTxTrZVgIxMtHZweNfeDghCg/3XG', NULL, '2025-07-15 14:28:18', '2025-07-20 00:19:34', 'Approved'),
(9, 'Blissy Cabandez', '09191111111', 'blissy@gmail.com', 'Member', 15, '2025-07-15 14:28:18', '$2y$10$jbPoBw.S6u.f8UcLgxWEFer8ifTxTrZVgIxMtHZweNfeDghCg/3XG', NULL, '2025-07-15 14:28:18', '2025-07-17 14:35:35', 'Approved'),
(10, 'Ruthcil Cabandez', '09192222222', '09192222222@coop.local', 'Member', 16, NULL, '$2y$10$jbPoBw.S6u.f8UcLgxWEFer8ifTxTrZVgIxMtHZweNfeDghCg/3XG', NULL, '2025-07-15 14:32:02', '2025-07-15 14:33:33', 'Approved'),
(11, 'System Admin', '09170000001', 'admin@hugpong.com', 'Admin', 17, '2025-07-17 08:21:10', '$2y$10$yLB3aWbTPDtSdLvg6Ooayuni1i2Y9txInqHlrPvT1LcILAIkiQuKS', NULL, '2025-07-17 08:21:10', '2025-07-17 08:21:10', 'Approved'),
(11045, 'Bernie Baldesco', '09465935416', '09465935416@coop.local', 'Member', 10026, NULL, '$2y$10$WyJ0IbzJWWYVxS.6zy5nOuVk7i7fIrl6QK8XNA7a5YPRweUVnvjke', NULL, '2025-07-22 07:06:55', '2025-07-22 07:06:55', 'Approved'),
(11046, 'Cindy Bandao', '09914528619', '09914528619@coop.local', 'Member', 10027, NULL, '$2y$10$fXP1ThnTzLJa3lnlXNydzeR.hF7Sb0BW1c3fpVHd5Nfur4sUzVb7S', NULL, '2025-07-22 07:08:08', '2025-07-22 07:08:08', 'Approved'),
(11047, 'Nor Umpar', '09099200018', '09099200018@coop.local', 'Member', 10028, NULL, '$2y$10$AgvUlo.ds3iKjAs08rpZGO0yCAPodjrE3MwNpVtiLJd82xpI0WquW', NULL, '2025-07-22 07:09:47', '2025-07-22 07:09:47', 'Approved'),
(11048, 'Ariel Capili', '09171852313', '09171852313@coop.local', 'Member', 10029, NULL, '$2y$10$f9xoOgCAN5DuYp7H9HX4Y.EKIpYl8TVtfTuR64sbK8pfsoVq/KtvS', NULL, '2025-07-22 07:10:44', '2025-07-22 07:10:44', 'Approved'),
(11049, 'Mary Ann Olbez', '09264663844', '09264663844@coop.local', 'Member', 10030, NULL, '$2y$10$mcX4H3ZRzTmZ8SCEmvCTwOzPqaxEW34.792gNAkECL5lQxZnoJ.Fi', NULL, '2025-07-22 07:11:45', '2025-07-22 07:11:45', 'Approved'),
(11050, 'Renz Licarte', '09763632594', '09763632594@coop.local', 'Member', 10031, NULL, '$2y$10$g0rA.9Tl1hPENYgJ.FzJwu7NjQqJiq0yCA6r/a3D/JvxcrwXCEc3S', NULL, '2025-07-22 07:12:43', '2025-07-22 07:12:43', 'Approved'),
(11051, 'Margie Palacio', '09670891993', '09670891993@coop.local', 'Member', 10032, NULL, '$2y$10$tcJwlwWhuq70stq/pcsUnOQww3rnDosjdfAO1990/KcONbV4S91z2', NULL, '2025-07-22 07:13:36', '2025-07-22 07:13:36', 'Approved'),
(11052, 'Leah Perez', '09198649321', '09198649321@coop.local', 'Member', 10033, NULL, '$2y$10$KWD3aBo/uBqvzNvzzeog0elCaFWNbkyVb/YrB6GF7v4iN3dvsd346', NULL, '2025-07-22 07:16:31', '2025-07-22 07:16:31', 'Approved'),
(11053, 'Melanie Guiday', '09165210706', '09165210706@coop.local', 'Member', 10034, NULL, '$2y$10$UtbOnSFZMnt6cd4/yEhBmOZypNspijSbJXWiElkKXqR7029nVQIfa', NULL, '2025-07-23 12:19:27', '2025-07-23 12:19:27', 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `voters`
--

CREATE TABLE `voters` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `First_name` varchar(255) NOT NULL,
  `Last_name` varchar(255) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Precinct` varchar(255) DEFAULT NULL,
  `Class` varchar(255) DEFAULT NULL,
  `Region` varchar(255) DEFAULT NULL,
  `Province` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  `Barangay` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wallets`
--

CREATE TABLE `wallets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'main',
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `member_id` bigint(20) UNSIGNED DEFAULT NULL,
  `wallet_id` varchar(50) DEFAULT NULL,
  `balance` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wallets`
--

INSERT INTO `wallets` (`id`, `type`, `user_id`, `member_id`, `wallet_id`, `balance`, `created_at`, `updated_at`) VALUES
(3, 'main', 9, 15, 'WALLET-687898B80F2B2', 10112.50, '2025-07-17 06:31:20', '2025-07-22 09:30:27'),
(7, 'main', 8, 14, 'WALLET-GHLMWHWT1PQGR', 0.00, '2025-07-17 08:28:27', '2025-07-17 08:28:27'),
(8, 'main', 10, 16, 'WALLET-FSTPTYJ5DZIKX', 0.00, '2025-07-17 08:28:27', '2025-07-19 02:13:05'),
(19, 'cashback', NULL, 14, 'WALLET-687C24A452BF1', 65.00, '2025-07-19 23:05:08', '2025-07-22 07:13:36'),
(20, 'cashback', NULL, 15, 'WALLET-687C24A455371', 35.00, '2025-07-19 23:05:08', '2025-07-23 12:19:27'),
(21, 'cashback', NULL, 16, 'WALLET-687C24A455BB1', 195.00, '2025-07-19 23:05:08', '2025-07-23 12:19:27'),
(22, 'main', NULL, 17, 'WALLET-687C24A456082', 0.00, '2025-07-19 23:05:08', '2025-07-19 23:05:08'),
(23, 'cashback', NULL, 17, 'WALLET-687C24A456642', 0.00, '2025-07-19 23:05:08', '2025-07-19 23:05:08'),
(26, 'main', NULL, 10026, 'WALLET-687F388ED45A0', 0.00, '2025-07-22 07:06:54', '2025-07-22 07:06:54'),
(27, 'cashback', NULL, 10026, 'WALLET-687F388ED45A2', 25.00, '2025-07-22 07:06:54', '2025-07-22 07:08:08'),
(28, 'main', NULL, 10027, 'WALLET-687F38D835794', 0.00, '2025-07-22 07:08:08', '2025-07-22 07:08:08'),
(29, 'cashback', NULL, 10027, 'WALLET-687F38D835797', 0.00, '2025-07-22 07:08:08', '2025-07-22 07:08:08'),
(30, 'main', NULL, 10028, 'WALLET-687F393B42C13', 0.00, '2025-07-22 07:09:47', '2025-07-22 07:09:47'),
(31, 'cashback', NULL, 10028, 'WALLET-687F393B42C16', 50.00, '2025-07-22 07:09:47', '2025-07-23 12:19:27'),
(32, 'main', NULL, 10029, 'WALLET-687F3974D5BA1', 0.00, '2025-07-22 07:10:44', '2025-07-22 07:10:44'),
(33, 'cashback', NULL, 10029, 'WALLET-687F3974D5BA4', 0.00, '2025-07-22 07:10:44', '2025-07-22 07:10:44'),
(34, 'main', NULL, 10030, 'WALLET-687F39B119356', 0.00, '2025-07-22 07:11:45', '2025-07-22 07:11:45'),
(35, 'cashback', NULL, 10030, 'WALLET-687F39B119359', 0.00, '2025-07-22 07:11:45', '2025-07-22 07:11:45'),
(36, 'main', NULL, 10031, 'WALLET-687F39EB801AE', 0.00, '2025-07-22 07:12:43', '2025-07-22 07:12:43'),
(37, 'cashback', NULL, 10031, 'WALLET-687F39EB801B0', 0.00, '2025-07-22 07:12:43', '2025-07-22 07:12:43'),
(38, 'main', NULL, 10032, 'WALLET-687F3A208CD7A', 0.00, '2025-07-22 07:13:36', '2025-07-22 07:13:36'),
(39, 'cashback', NULL, 10032, 'WALLET-687F3A208CD7D', 25.00, '2025-07-22 07:13:36', '2025-07-22 07:16:31'),
(40, 'main', NULL, 10033, 'WALLET-687F3ACFC7BFA', 0.00, '2025-07-22 07:16:31', '2025-07-22 07:16:31'),
(41, 'cashback', NULL, 10033, 'WALLET-687F3ACFC7C01', 0.00, '2025-07-22 07:16:31', '2025-07-22 07:16:31'),
(42, 'main', NULL, 10034, 'WALLET-6880005F782C9', 0.00, '2025-07-23 12:19:27', '2025-07-23 12:19:27'),
(43, 'cashback', NULL, 10034, 'WALLET-6880005F782CC', 0.00, '2025-07-23 12:19:27', '2025-07-23 12:19:27');

-- --------------------------------------------------------

--
-- Table structure for table `wallet_transactions`
--

CREATE TABLE `wallet_transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `wallet_id` bigint(20) UNSIGNED DEFAULT NULL,
  `member_id` bigint(20) UNSIGNED DEFAULT NULL,
  `type` enum('credit','debit','transfer','payment','cashback') DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `source` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `related_member_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wallet_transactions`
--

INSERT INTO `wallet_transactions` (`id`, `wallet_id`, `member_id`, `type`, `amount`, `source`, `description`, `notes`, `related_member_id`, `created_at`, `updated_at`) VALUES
(11, 21, 16, 'cashback', 10.00, 'order_cashback', 'Cashback from Order #16', NULL, NULL, '2025-07-19 23:11:36', '2025-07-19 23:11:36'),
(12, 20, NULL, 'credit', 25.00, NULL, 'Direct referral bonus from Shella Go', NULL, NULL, '2025-07-20 00:25:04', '2025-07-20 00:25:04'),
(13, 19, NULL, 'credit', 15.00, NULL, '2nd level referral bonus from Shella Go', NULL, NULL, '2025-07-20 00:25:04', '2025-07-20 00:25:04'),
(14, 20, 15, NULL, -25.00, NULL, 'Transfer to main wallet (-₱2.50 fee)', NULL, NULL, '2025-07-20 01:54:24', '2025-07-20 01:54:24'),
(15, 3, 15, NULL, 22.50, NULL, 'Received from cashback wallet (₱25.00 - ₱2.50 fee)', NULL, NULL, '2025-07-20 01:54:24', '2025-07-20 01:54:24'),
(16, 21, NULL, 'credit', 25.00, NULL, 'Direct referral bonus from Bernie Baldesco', NULL, NULL, '2025-07-22 07:06:54', '2025-07-22 07:06:54'),
(17, 20, NULL, 'credit', 15.00, NULL, '2nd level referral bonus from Bernie Baldesco', NULL, NULL, '2025-07-22 07:06:54', '2025-07-22 07:06:54'),
(18, 19, NULL, 'credit', 10.00, NULL, '3rd level referral bonus from Bernie Baldesco', NULL, NULL, '2025-07-22 07:06:54', '2025-07-22 07:06:54'),
(19, 27, NULL, 'credit', 25.00, NULL, 'Direct referral bonus from Cindy Bandao', NULL, NULL, '2025-07-22 07:08:08', '2025-07-22 07:08:08'),
(20, 21, NULL, 'credit', 15.00, NULL, '2nd level referral bonus from Cindy Bandao', NULL, NULL, '2025-07-22 07:08:08', '2025-07-22 07:08:08'),
(21, 20, NULL, 'credit', 10.00, NULL, '3rd level referral bonus from Cindy Bandao', NULL, NULL, '2025-07-22 07:08:08', '2025-07-22 07:08:08'),
(22, 21, NULL, 'credit', 25.00, NULL, 'Direct referral bonus from Nor Umpar', NULL, NULL, '2025-07-22 07:09:47', '2025-07-22 07:09:47'),
(23, 20, NULL, 'credit', 15.00, NULL, '2nd level referral bonus from Nor Umpar', NULL, NULL, '2025-07-22 07:09:47', '2025-07-22 07:09:47'),
(24, 19, NULL, 'credit', 10.00, NULL, '3rd level referral bonus from Nor Umpar', NULL, NULL, '2025-07-22 07:09:47', '2025-07-22 07:09:47'),
(25, 31, NULL, 'credit', 25.00, NULL, 'Direct referral bonus from Ariel Capili', NULL, NULL, '2025-07-22 07:10:44', '2025-07-22 07:10:44'),
(26, 21, NULL, 'credit', 15.00, NULL, '2nd level referral bonus from Ariel Capili', NULL, NULL, '2025-07-22 07:10:44', '2025-07-22 07:10:44'),
(27, 20, NULL, 'credit', 10.00, NULL, '3rd level referral bonus from Ariel Capili', NULL, NULL, '2025-07-22 07:10:44', '2025-07-22 07:10:44'),
(28, 21, NULL, 'credit', 25.00, NULL, 'Direct referral bonus from Mary Ann Olbez', NULL, NULL, '2025-07-22 07:11:45', '2025-07-22 07:11:45'),
(29, 20, NULL, 'credit', 15.00, NULL, '2nd level referral bonus from Mary Ann Olbez', NULL, NULL, '2025-07-22 07:11:45', '2025-07-22 07:11:45'),
(30, 19, NULL, 'credit', 10.00, NULL, '3rd level referral bonus from Mary Ann Olbez', NULL, NULL, '2025-07-22 07:11:45', '2025-07-22 07:11:45'),
(31, 21, NULL, 'credit', 25.00, NULL, 'Direct referral bonus from Renz Licarte', NULL, NULL, '2025-07-22 07:12:43', '2025-07-22 07:12:43'),
(32, 20, NULL, 'credit', 15.00, NULL, '2nd level referral bonus from Renz Licarte', NULL, NULL, '2025-07-22 07:12:43', '2025-07-22 07:12:43'),
(33, 19, NULL, 'credit', 10.00, NULL, '3rd level referral bonus from Renz Licarte', NULL, NULL, '2025-07-22 07:12:43', '2025-07-22 07:12:43'),
(34, 21, NULL, 'credit', 25.00, NULL, 'Direct referral bonus from Margie Palacio', NULL, NULL, '2025-07-22 07:13:36', '2025-07-22 07:13:36'),
(35, 20, NULL, 'credit', 15.00, NULL, '2nd level referral bonus from Margie Palacio', NULL, NULL, '2025-07-22 07:13:36', '2025-07-22 07:13:36'),
(36, 19, NULL, 'credit', 10.00, NULL, '3rd level referral bonus from Margie Palacio', NULL, NULL, '2025-07-22 07:13:36', '2025-07-22 07:13:36'),
(37, 39, NULL, 'credit', 25.00, NULL, 'Direct referral bonus from Leah Perez', NULL, NULL, '2025-07-22 07:16:31', '2025-07-22 07:16:31'),
(38, 21, NULL, 'credit', 15.00, NULL, '2nd level referral bonus from Leah Perez', NULL, NULL, '2025-07-22 07:16:31', '2025-07-22 07:16:31'),
(39, 20, NULL, 'credit', 10.00, NULL, '3rd level referral bonus from Leah Perez', NULL, NULL, '2025-07-22 07:16:31', '2025-07-22 07:16:31'),
(40, 20, 15, NULL, -100.00, NULL, 'Transfer to main wallet (-₱10.00 fee)', NULL, NULL, '2025-07-22 09:22:33', '2025-07-22 09:22:33'),
(41, 3, 15, NULL, 90.00, NULL, 'Received from cashback wallet (₱100.00 - ₱10.00 fee)', NULL, NULL, '2025-07-22 09:22:33', '2025-07-22 09:22:33'),
(42, 3, NULL, 'credit', 10000.00, NULL, 'Cash In Approved', NULL, NULL, '2025-07-22 09:30:27', '2025-07-22 09:30:27'),
(43, 20, 15, 'cashback', 20.00, 'order_cashback', 'Cashback from Order #17', NULL, NULL, '2025-07-22 09:31:37', '2025-07-22 09:31:37'),
(44, 31, NULL, 'credit', 25.00, NULL, 'Direct referral bonus from MELANIE GUIDAY', NULL, NULL, '2025-07-23 12:19:27', '2025-07-23 12:19:27'),
(45, 21, NULL, 'credit', 15.00, NULL, '2nd level referral bonus from MELANIE GUIDAY', NULL, NULL, '2025-07-23 12:19:27', '2025-07-23 12:19:27'),
(46, 20, NULL, 'credit', 10.00, NULL, '3rd level referral bonus from MELANIE GUIDAY', NULL, NULL, '2025-07-23 12:19:27', '2025-07-23 12:19:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `benefits`
--
ALTER TABLE `benefits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `benefit_member`
--
ALTER TABLE `benefit_member`
  ADD PRIMARY KEY (`id`),
  ADD KEY `benefit_member_benefit_id_foreign` (`benefit_id`),
  ADD KEY `benefit_member_member_id_foreign` (`member_id`);

--
-- Indexes for table `cashback_logs`
--
ALTER TABLE `cashback_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cashback_logs_member_id_foreign` (`member_id`),
  ADD KEY `cashback_logs_order_id_foreign` (`order_id`);

--
-- Indexes for table `cash_in_requests`
--
ALTER TABLE `cash_in_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cash_in_requests_member_id_foreign` (`member_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_name_unique` (`name`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `loans`
--
ALTER TABLE `loans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `loans_member_id_foreign` (`member_id`);

--
-- Indexes for table `loan_payments`
--
ALTER TABLE `loan_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `loan_payments_loan_id_foreign` (`loan_id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `members_mobile_number_unique` (`mobile_number`),
  ADD KEY `members_sponsor_id_index` (`sponsor_id`),
  ADD KEY `members_voter_id_index` (`voter_id`);

--
-- Indexes for table `membership_codes`
--
ALTER TABLE `membership_codes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `membership_codes_code_unique` (`code`),
  ADD KEY `membership_codes_used_by_foreign` (`used_by`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mobile_password_resets`
--
ALTER TABLE `mobile_password_resets`
  ADD KEY `mobile_password_resets_mobile_number_index` (`mobile_number`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_member_id_foreign` (`member_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`),
  ADD KEY `products_unit_id_foreign` (`unit_id`);

--
-- Indexes for table `referral_bonus_logs`
--
ALTER TABLE `referral_bonus_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `referral_bonus_logs_member_id_foreign` (`member_id`),
  ADD KEY `referral_bonus_logs_referred_member_id_foreign` (`referred_member_id`);

--
-- Indexes for table `reward_programs`
--
ALTER TABLE `reward_programs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reward_programs_winner_id_foreign` (`winner_id`);

--
-- Indexes for table `reward_winners`
--
ALTER TABLE `reward_winners`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reward_winners_member_id_foreign` (`member_id`),
  ADD KEY `fk_rwinners_program` (`reward_program_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_unique` (`key`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tickets_member_id_foreign` (`member_id`);

--
-- Indexes for table `ticket_replies`
--
ALTER TABLE `ticket_replies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ticket_replies_ticket_id_foreign` (`ticket_id`),
  ADD KEY `ticket_replies_member_id_foreign` (`member_id`),
  ADD KEY `ticket_replies_user_id_foreign` (`user_id`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `units_name_unique` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_mobile_number_unique` (`mobile_number`),
  ADD KEY `users_member_id_index` (`member_id`);

--
-- Indexes for table `voters`
--
ALTER TABLE `voters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wallets`
--
ALTER TABLE `wallets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wallets_member_id_foreign` (`member_id`),
  ADD KEY `wallets_user_id_foreign` (`user_id`);

--
-- Indexes for table `wallet_transactions`
--
ALTER TABLE `wallet_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wallet_transactions_member_id_foreign` (`member_id`),
  ADD KEY `wallet_transactions_related_member_id_foreign` (`related_member_id`),
  ADD KEY `wallet_transactions_wallet_id_foreign` (`wallet_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `benefits`
--
ALTER TABLE `benefits`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `benefit_member`
--
ALTER TABLE `benefit_member`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cashback_logs`
--
ALTER TABLE `cashback_logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cash_in_requests`
--
ALTER TABLE `cash_in_requests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `loans`
--
ALTER TABLE `loans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `loan_payments`
--
ALTER TABLE `loan_payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10035;

--
-- AUTO_INCREMENT for table `membership_codes`
--
ALTER TABLE `membership_codes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `referral_bonus_logs`
--
ALTER TABLE `referral_bonus_logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `reward_programs`
--
ALTER TABLE `reward_programs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reward_winners`
--
ALTER TABLE `reward_winners`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ticket_replies`
--
ALTER TABLE `ticket_replies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11054;

--
-- AUTO_INCREMENT for table `voters`
--
ALTER TABLE `voters`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wallets`
--
ALTER TABLE `wallets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `wallet_transactions`
--
ALTER TABLE `wallet_transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `benefit_member`
--
ALTER TABLE `benefit_member`
  ADD CONSTRAINT `benefit_member_benefit_id_foreign` FOREIGN KEY (`benefit_id`) REFERENCES `benefits` (`id`),
  ADD CONSTRAINT `benefit_member_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`);

--
-- Constraints for table `cashback_logs`
--
ALTER TABLE `cashback_logs`
  ADD CONSTRAINT `cashback_logs_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cashback_logs_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `cash_in_requests`
--
ALTER TABLE `cash_in_requests`
  ADD CONSTRAINT `cash_in_requests_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`);

--
-- Constraints for table `loans`
--
ALTER TABLE `loans`
  ADD CONSTRAINT `loans_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `loan_payments`
--
ALTER TABLE `loan_payments`
  ADD CONSTRAINT `loan_payments_loan_id_foreign` FOREIGN KEY (`loan_id`) REFERENCES `loans` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `members`
--
ALTER TABLE `members`
  ADD CONSTRAINT `members_sponsor_id_foreign` FOREIGN KEY (`sponsor_id`) REFERENCES `members` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `membership_codes`
--
ALTER TABLE `membership_codes`
  ADD CONSTRAINT `membership_codes_used_by_foreign` FOREIGN KEY (`used_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `products_unit_id_foreign` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `referral_bonus_logs`
--
ALTER TABLE `referral_bonus_logs`
  ADD CONSTRAINT `referral_bonus_logs_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`),
  ADD CONSTRAINT `referral_bonus_logs_referred_member_id_foreign` FOREIGN KEY (`referred_member_id`) REFERENCES `members` (`id`);

--
-- Constraints for table `reward_programs`
--
ALTER TABLE `reward_programs`
  ADD CONSTRAINT `reward_programs_winner_id_foreign` FOREIGN KEY (`winner_id`) REFERENCES `reward_winners` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `reward_winners`
--
ALTER TABLE `reward_winners`
  ADD CONSTRAINT `fk_rwinners_program` FOREIGN KEY (`reward_program_id`) REFERENCES `reward_programs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reward_winners_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reward_winners_reward_program_id_foreign` FOREIGN KEY (`reward_program_id`) REFERENCES `reward_programs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ticket_replies`
--
ALTER TABLE `ticket_replies`
  ADD CONSTRAINT `ticket_replies_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ticket_replies_ticket_id_foreign` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ticket_replies_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wallets`
--
ALTER TABLE `wallets`
  ADD CONSTRAINT `wallets_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wallets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wallet_transactions`
--
ALTER TABLE `wallet_transactions`
  ADD CONSTRAINT `wallet_transactions_member_id_foreign` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wallet_transactions_related_member_id_foreign` FOREIGN KEY (`related_member_id`) REFERENCES `members` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `wallet_transactions_wallet_id_foreign` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
