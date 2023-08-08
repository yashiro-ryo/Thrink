/*
 Navicat Premium Data Transfer

 Source Server         : myproject
 Source Server Type    : MySQL
 Source Server Version : 80033
 Source Host           : localhost:3306
 Source Schema         : thrink_dev

 Target Server Type    : MySQL
 Target Server Version : 80033
 File Encoding         : 65001

 Date: 09/08/2023 01:46:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for chat
-- ----------------------------
DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat` (
  `chat_message_id` int NOT NULL AUTO_INCREMENT,
  `chatroom_id` int NOT NULL,
  `sender_uid` int NOT NULL,
  `receiver_uid` int NOT NULL,
  `content_body` text,
  `content_type` varchar(150) NOT NULL,
  `sent_at` datetime NOT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`chat_message_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for chatroom
-- ----------------------------
DROP TABLE IF EXISTS `chatroom`;
CREATE TABLE `chatroom` (
  `chatroom_id` int NOT NULL AUTO_INCREMENT,
  `user1_uid` int NOT NULL,
  `user2_uid` int NOT NULL,
  PRIMARY KEY (`chatroom_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for group_profile
-- ----------------------------
DROP TABLE IF EXISTS `group_profile`;
CREATE TABLE `group_profile` (
  `uid` int NOT NULL,
  `display_name` varchar(30) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `activity_detail` text,
  `activity_day` varchar(255) DEFAULT NULL,
  `activity_time` varchar(255) DEFAULT NULL,
  `members_num` int DEFAULT NULL,
  `awards` text,
  `radar1` tinyint DEFAULT '0',
  `radar2` tinyint DEFAULT '0',
  `radar3` tinyint DEFAULT '0',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for job
-- ----------------------------
DROP TABLE IF EXISTS `job`;
CREATE TABLE `job` (
  `job_id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `detail` text,
  `reward` text,
  `application_requirements` text,
  `working_time` text,
  `place` text,
  `start_at` datetime NOT NULL,
  `end_at` datetime NOT NULL,
  PRIMARY KEY (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for student_parent_profile
-- ----------------------------
DROP TABLE IF EXISTS `student_parent_profile`;
CREATE TABLE `student_parent_profile` (
  `uid` int NOT NULL,
  `display_name` varchar(30) NOT NULL,
  `experience_visible_level` tinyint NOT NULL,
  `experience` text,
  `awards_visible_level` tinyint NOT NULL,
  `awards` text,
  `comment_visible_level` tinyint NOT NULL,
  `comment` text,
  `links_visible_level` tinyint NOT NULL,
  `links` text,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for student_profile
-- ----------------------------
DROP TABLE IF EXISTS `student_profile`;
CREATE TABLE `student_profile` (
  `uid` int NOT NULL,
  `display_name` varchar(30) NOT NULL,
  `experience_visible_level` tinyint NOT NULL,
  `experience` text,
  `awards_visible_level` tinyint NOT NULL,
  `awards` text,
  `comment_visible_level` tinyint NOT NULL,
  `comment` text,
  `links_visible_level` tinyint NOT NULL,
  `links` text,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for user_profile_meta
-- ----------------------------
DROP TABLE IF EXISTS `user_profile_meta`;
CREATE TABLE `user_profile_meta` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `user_type` tinyint NOT NULL,
  `icon_img_url` varchar(255) DEFAULT NULL,
  `header_img_url` varchar(255) DEFAULT NULL,
  `display_name` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(150) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;
