/*
  Warnings:

  - You are about to drop the column `description` on the `steps` table. All the data in the column will be lost.
  - Added the required column `descriptionAr` to the `Steps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionFr` to the `Steps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `steps` DROP COLUMN `description`,
    ADD COLUMN `descriptionAr` VARCHAR(191) NOT NULL,
    ADD COLUMN `descriptionFr` VARCHAR(191) NOT NULL;
