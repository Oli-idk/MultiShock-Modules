-- AlterTable
ALTER TABLE `Server` MODIFY `tags` VARCHAR(191) NULL,
    MODIFY `banner` VARCHAR(191) NULL,
    MODIFY `votifierIp` VARCHAR(191) NULL DEFAULT '';
