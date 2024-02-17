/*
  Warnings:

  - You are about to drop the `steps` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `steps`;

-- CreateTable
CREATE TABLE `Step` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descriptionFr` LONGTEXT NOT NULL,
    `descriptionAr` LONGTEXT NOT NULL,
    `textAr` VARCHAR(191) NOT NULL,
    `textFr` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
