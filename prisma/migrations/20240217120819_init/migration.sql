-- AlterTable
ALTER TABLE `message` ADD COLUMN `step` INTEGER NULL,
    MODIFY `latitude` DOUBLE NULL,
    MODIFY `longitude` DOUBLE NULL;
