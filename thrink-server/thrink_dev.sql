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

 Date: 09/08/2023 00:41:40
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
-- Records of chat
-- ----------------------------
BEGIN;
INSERT INTO `chat` VALUES (1, 1, 7, 1, 'chat message', 'message', '2022-09-12 12:00:00', 0);
INSERT INTO `chat` VALUES (2, 3, 7, 1, 'undefined', 'undefined', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (3, 3, 7, 1, 'undefined', 'undefined', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (4, 3, 7, 1, 'undefined', 'undefined', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (5, 3, 7, 1, 'undefined', 'undefined', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (6, 3, 7, 1, 'chat message', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (7, 3, 7, 1, 'chat message', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (8, 3, 7, 1, 'direct4b.com', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (9, 3, 7, 1, 'アルバイトに応募したいです。', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (10, 3, 7, 1, '<script>alert(0);</script>', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (11, 3, 7, 1, 'chat message だお', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (12, 3, 7, 1, 'chat message だお', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (13, 3, 7, 1, 'chat chat test chat', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (14, 3, 1, 7, 'こんにちはchatしますね', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (15, 3, 1, 7, 'chat やりすぎて出禁になりました', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (16, 3, 1, 7, 'chat chat', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (17, 3, 1, 7, 'chat chat message', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (18, 3, 7, 1, 'message message', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (19, 3, 7, 1, 'chat message', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (20, 3, 7, 1, 'chatchatchatwork', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (21, 3, 1, 7, 'chatしすぎて出禁になりました', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (22, 3, 1, 7, 'chatchatchat', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (23, 0, 0, 0, 'chat message', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (24, 3, 7, 1, 'メッセージ メッセージ', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (25, 3, 7, 1, 'a', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (26, 3, 7, 1, 'chatpage range', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (27, 3, 7, 1, 'アルバイトに応募したいンゴ', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (28, 6, 2, 7, 'chat message', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (29, 6, 7, 2, 'アルバイトの応募ありがとうございます。早速ですがよっていただきたい仕事がございます。ご検討お願いいたします。', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (30, 6, 2, 7, 'わかりました。完了次第ご連絡いたします。', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (31, 7, 2, 7, 'apply job id = 5', 'job-apply', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (32, 7, 2, 7, 'apply job id = 7', 'job-apply', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (33, 7, 2, 7, '5', 'job-apply', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (34, 7, 2, 7, '9', 'job-apply', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (35, 3, 7, 1, '課税証明書', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (36, 7, 2, 7, '求人先の詳細を取得する', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (37, 7, 7, 2, '求人の詳細をお送りします', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (38, 3, 7, 1, '課税証明書', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (39, 9, 7, 6, 'yashiro yashiro', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (40, 9, 7, 6, 'テストやしろ', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (41, 9, 7, 6, '個別指導学院', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (42, 7, 2, 7, '2', 'job-apply', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (43, 1, 2, 1, 'メッセージ', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (44, 7, 2, 7, 'テスト1', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (45, 7, 2, 7, 'テスト2', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (46, 7, 2, 7, 'テスト3', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (47, 7, 2, 7, 'テスト4', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (48, 7, 2, 7, 'テスト5', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (49, 1, 2, 1, 'メッセージ2', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (50, 1, 2, 1, 'メッセージ3', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (51, 3, 7, 1, '課税証明書を送ってください', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (52, 7, 7, 2, '求人ID2の詳細をお送りします。ご確認お願いいたします。', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (53, 3, 7, 1, '課税証明書をください', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (54, 7, 7, 2, 'ご確認お願いします。', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (55, 7, 2, 7, '承知いたしました。', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (56, 7, 7, 2, '収入証明書を提出してください', 'message', '2023-02-11 23:00:00', 0);
INSERT INTO `chat` VALUES (57, 3, 7, 1, '課税します', 'message', '2023-02-11 23:00:00', 0);
COMMIT;

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
-- Records of chatroom
-- ----------------------------
BEGIN;
INSERT INTO `chatroom` VALUES (1, 1, 2);
INSERT INTO `chatroom` VALUES (2, 1, 3);
INSERT INTO `chatroom` VALUES (3, 7, 1);
INSERT INTO `chatroom` VALUES (7, 2, 7);
INSERT INTO `chatroom` VALUES (8, 7, 8);
INSERT INTO `chatroom` VALUES (9, 7, 6);
INSERT INTO `chatroom` VALUES (10, 7, 13);
COMMIT;

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
-- Records of group_profile
-- ----------------------------
BEGIN;
INSERT INTO `group_profile` VALUES (2, '矢代　太郎', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0);
INSERT INTO `group_profile` VALUES (5, 'テストユーザー1', '徳島', '630775148787620667070054037803915\n202051573227834138951931048782286\n621733448436525204177309096663296\n783697463997441202515411313764524\n265177409826761525545322496772626', '毎週木曜日です', '10:00~12:00', 12, '指導陣は全国大会経験者です。', 0, 0, 0);
INSERT INTO `group_profile` VALUES (7, '徳島スポーツ少年団', '徳島県徳島市福島町', '少年少女サッカーチームです。\n全国大会を目指して日々活動しています。\n指導者は元市高サッカー部OBです。', '毎週金曜日、土曜日', '18:00~20:00', 10, '全国大会優勝', 5, 8, 2);
INSERT INTO `group_profile` VALUES (11, 'テスト団体2', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0);
INSERT INTO `group_profile` VALUES (12, 'テスト団体3', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0);
INSERT INTO `group_profile` VALUES (17, 'テスト団体7', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0);
INSERT INTO `group_profile` VALUES (18, 'テスト団体8', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0);
INSERT INTO `group_profile` VALUES (19, 'テスト団体9', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0);
INSERT INTO `group_profile` VALUES (20, 'テスト団体10', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0);
INSERT INTO `group_profile` VALUES (21, 'テスト団体11', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0);
INSERT INTO `group_profile` VALUES (22, 'テスト団体12', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0);
INSERT INTO `group_profile` VALUES (23, 'テスト団体13', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, 0);
COMMIT;

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
-- Records of job
-- ----------------------------
BEGIN;
INSERT INTO `job` VALUES (1, 1, '募集内容', '報酬', '募集条件', '勤務時間', '勤務地', '2022-09-11 00:00:00', '2022-09-12 00:00:00');
INSERT INTO `job` VALUES (2, 7, '募集内容募集内容募集内容募集', '報酬', '応募条件', '勤務時間', '勤務地', '2022-09-10 00:00:00', '2022-09-22 00:00:00');
INSERT INTO `job` VALUES (3, 1, '求人内容', NULL, NULL, NULL, NULL, '2022-09-12 12:00:00', '2022-09-13 12:00:00');
INSERT INTO `job` VALUES (5, 7, 'サッカー指導者を募集します。\nサッカー大好き人間募集中。', '1200円~1300円', 'サッカー経験3年以上', '毎週木曜 18:00~20:00\n毎週土曜 18:00~20:00', '徳島市福島小学校', '2022-09-22 12:00:00', '2022-09-30 12:00:00');
INSERT INTO `job` VALUES (7, 7, 'バレーボール指導者の募集\n授業時間帯におけるバスケの指導者を募集しています。', '1200円~1500円(経験による)', 'バレーボール経験5年以上(中高とされていた方など)', '毎週月、水、金 13:00~15:00', '徳島市神山高校', '2022-09-22 12:00:00', '2022-09-30 12:00:00');
COMMIT;

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
-- Records of student_parent_profile
-- ----------------------------
BEGIN;
COMMIT;

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
-- Records of student_profile
-- ----------------------------
BEGIN;
INSERT INTO `student_profile` VALUES (4, 'テスト太郎', 0, 'ベンチャー経営者', 0, '起業初めてです', 0, 'むりぁも', 0, 'リンクなり');
INSERT INTO `student_profile` VALUES (6, '矢代テスト1', 0, '経験/経験/経験/1/経験値/経験値/LV.100', 0, '受賞歴/受賞歴/受賞歴/2/受賞歴/受賞歴/大会優勝', 0, 'コメント/コメント/コメント/3', 0, 'リンク/リンク/リンク/4');
INSERT INTO `student_profile` VALUES (8, '矢代 太郎', 0, '小学校から現在まで約15年剣道をしています。\n紫雲小 -> 紫雲中 -> 浜松高校 -> 浜山大学', 0, '全中、インターハイ優勝2012, 2013, 2014, 2015, 2016, 2017', 0, '剣道あまり上手くありませんがよろしくお願いします。', 0, 'http://localhost:3000/home/index.html');
INSERT INTO `student_profile` VALUES (9, 'テスト生徒1', 0, NULL, 0, NULL, 0, NULL, 0, NULL);
INSERT INTO `student_profile` VALUES (10, 'テスト学生2', 0, NULL, 0, NULL, 0, NULL, 0, NULL);
INSERT INTO `student_profile` VALUES (13, 'テスト学生3', 0, NULL, 0, NULL, 0, NULL, 0, NULL);
INSERT INTO `student_profile` VALUES (24, 'テスト学生4', 0, NULL, 0, NULL, 0, NULL, 0, NULL);
INSERT INTO `student_profile` VALUES (25, 'テスト学生5', 0, NULL, 0, NULL, 0, NULL, 0, NULL);
INSERT INTO `student_profile` VALUES (26, 'テスト学生6', 0, NULL, 0, NULL, 0, NULL, 0, NULL);
INSERT INTO `student_profile` VALUES (27, 'テスト学生7', 0, NULL, 0, NULL, 0, NULL, 0, NULL);
INSERT INTO `student_profile` VALUES (28, 'テスト学生8', 0, NULL, 0, NULL, 0, NULL, 0, NULL);
COMMIT;

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

-- ----------------------------
-- Records of user_profile_meta
-- ----------------------------
BEGIN;
INSERT INTO `user_profile_meta` VALUES (1, 1, NULL, NULL, '山田　太郎', 'yamada@yamada.com', 'b4583e4d6c2446826f38bb7a63c6b39e83e5de26de03279ad3d3e0a707467405');
INSERT INTO `user_profile_meta` VALUES (2, 1, NULL, NULL, '矢代　太郎', 'yashiro@yashiro.com', '4e1d1f99693deaf80aefb90bc4bb65fbce2f299c6fc728cd55bfe6b84e78e24e');
INSERT INTO `user_profile_meta` VALUES (3, 0, NULL, NULL, 'テストユーザー', 'test-user@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (4, 0, NULL, NULL, 'テスト太郎', 'test-taro@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (5, 1, NULL, NULL, 'テストユーザー1', 'testuser1@email.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (6, 0, NULL, NULL, '矢代テスト1', 'yashirotest@yashiro.com', '4e1d1f99693deaf80aefb90bc4bb65fbce2f299c6fc728cd55bfe6b84e78e24e');
INSERT INTO `user_profile_meta` VALUES (7, 1, 'http://localhost:3000/user-content/7-user-icon.png', 'http://localhost:3000/user-content/7-header-img.png', '徳島スポーツ少年団', 'tokushima@tokushima.com', '3272e9a469cb756997d691adeb45276fe0446122b53298e79132e7a68d62aa69');
INSERT INTO `user_profile_meta` VALUES (8, 0, 'http://localhost:3000/user-content/8-user-icon.png', 'http://localhost:3000/user-content/8-header-img.png', '矢代 太郎', 'yashiro@yashiro.jp', '4e1d1f99693deaf80aefb90bc4bb65fbce2f299c6fc728cd55bfe6b84e78e24e');
INSERT INTO `user_profile_meta` VALUES (9, 0, NULL, NULL, 'テスト生徒1', 'student1@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (10, 0, NULL, NULL, 'テスト学生2', 'student2@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (11, 1, NULL, NULL, 'テスト団体2', 'group2@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (12, 1, NULL, NULL, 'テスト団体3', 'group3@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (13, 0, NULL, NULL, 'テスト学生3', 'student3@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (14, 1, NULL, NULL, 'テスト団体4', 'group4@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (15, 1, NULL, NULL, 'テスト団体4', 'group5@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (16, 1, NULL, NULL, 'テスト団体6', 'group6@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (17, 1, NULL, NULL, 'テスト団体7', 'group7@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (18, 1, NULL, NULL, 'テスト団体8', 'group8@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (19, 1, NULL, NULL, 'テスト団体9', 'group9@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (20, 1, NULL, NULL, 'テスト団体10', 'group10@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (21, 1, NULL, NULL, 'テスト団体11', 'group11@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (22, 1, NULL, NULL, 'テスト団体12', 'group12@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (23, 1, NULL, NULL, 'テスト団体13', 'group13@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (24, 0, NULL, NULL, 'テスト学生4', 'student4@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (25, 0, NULL, NULL, 'テスト学生5', 'student5@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (26, 0, NULL, NULL, 'テスト学生6', 'stduent6@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (27, 0, NULL, NULL, 'テスト学生7', 'student7@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
INSERT INTO `user_profile_meta` VALUES (28, 0, NULL, NULL, 'テスト学生8', 'student8@test.com', '37268335dd6931045bdcdf92623ff819a64244b53d0e746d438797349d4da578');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
