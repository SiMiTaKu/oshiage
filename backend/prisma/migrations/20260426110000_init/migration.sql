-- CreateTable
CREATE TABLE `UserAccount` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `cognitoSub` VARCHAR(64) NOT NULL,
    `email` VARCHAR(254) NOT NULL,
    `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    `status` ENUM('active', 'frozen', 'banned', 'unsubscribed') NOT NULL DEFAULT 'active',
    `lastLoginAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserAccount_cognitoSub_key`(`cognitoSub`),
    UNIQUE INDEX `UserAccount_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserProfile` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `userAccountId` BIGINT UNSIGNED NOT NULL,
    `displayName` VARCHAR(100) NOT NULL,
    `avatarUrl` VARCHAR(2048) NULL,
    `bio` TEXT NULL,
    `area` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserProfile_userAccountId_key`(`userAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `eventType` VARCHAR(32) NOT NULL,
    `startAt` DATETIME(3) NOT NULL,
    `endAt` DATETIME(3) NULL,
    `place` VARCHAR(255) NOT NULL,
    `fee` DECIMAL(10, 2) NULL,
    `description` TEXT NULL,
    `refsJson` JSON NULL,
    `deletedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` BIGINT UNSIGNED NULL,
    `updatedBy` BIGINT UNSIGNED NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Entity` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `entityCategory` ENUM('individual', 'group') NOT NULL,
    `currentRevisionNo` INTEGER UNSIGNED NOT NULL DEFAULT 1,
    `activeStatus` ENUM('active', 'retired', 'inactive') NOT NULL DEFAULT 'active',
    `claimedUserAccountId` BIGINT UNSIGNED NULL,
    `deletedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` BIGINT UNSIGNED NULL,
    `updatedBy` BIGINT UNSIGNED NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EntityRevision` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `entityId` BIGINT UNSIGNED NOT NULL,
    `revisionNo` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `sport` VARCHAR(100) NULL,
    `area` VARCHAR(100) NULL,
    `profile` TEXT NULL,
    `snapshotJson` JSON NULL,
    `reason` VARCHAR(1000) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` BIGINT UNSIGNED NULL,

    UNIQUE INDEX `EntityRevision_entityId_revisionNo_key`(`entityId`, `revisionNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EntityLinkRequest` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `entityId` BIGINT UNSIGNED NOT NULL,
    `requesterUserId` BIGINT UNSIGNED NOT NULL,
    `status` ENUM('pending', 'inReview', 'approved', 'rejected', 'sentBack') NOT NULL DEFAULT 'pending',
    `message` TEXT NULL,
    `reviewedBy` BIGINT UNSIGNED NULL,
    `reviewedAt` DATETIME(3) NULL,
    `reviewComment` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EntityLinkRequestEvidence` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `linkRequestId` BIGINT UNSIGNED NOT NULL,
    `evidenceUrl` VARCHAR(2048) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventDeleteRequest` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `eventId` BIGINT UNSIGNED NOT NULL,
    `requesterUserId` BIGINT UNSIGNED NOT NULL,
    `status` ENUM('pending', 'inReview', 'approved', 'rejected', 'sentBack') NOT NULL DEFAULT 'pending',
    `reason` TEXT NOT NULL,
    `reviewedBy` BIGINT UNSIGNED NULL,
    `reviewedAt` DATETIME(3) NULL,
    `reviewComment` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EntityDeleteRequest` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `entityId` BIGINT UNSIGNED NOT NULL,
    `requesterUserId` BIGINT UNSIGNED NOT NULL,
    `status` ENUM('pending', 'inReview', 'approved', 'rejected', 'sentBack') NOT NULL DEFAULT 'pending',
    `reason` TEXT NOT NULL,
    `reviewedBy` BIGINT UNSIGNED NULL,
    `reviewedAt` DATETIME(3) NULL,
    `reviewComment` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdminRequestActionLog` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `requestType` VARCHAR(32) NOT NULL,
    `requestId` BIGINT UNSIGNED NOT NULL,
    `action` ENUM('approve', 'reject', 'sendBack') NOT NULL,
    `comment` TEXT NULL,
    `actedBy` BIGINT UNSIGNED NOT NULL,
    `actedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountReport` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `reporterUserId` BIGINT UNSIGNED NOT NULL,
    `targetUserId` BIGINT UNSIGNED NOT NULL,
    `reasonCategory` ENUM('spam', 'impersonation', 'harassment', 'falseInformation', 'other') NOT NULL,
    `reasonDetail` TEXT NOT NULL,
    `status` VARCHAR(32) NOT NULL DEFAULT 'open',
    `handledBy` BIGINT UNSIGNED NULL,
    `handledAt` DATETIME(3) NULL,
    `result` VARCHAR(32) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSanction` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `userAccountId` BIGINT UNSIGNED NOT NULL,
    `sanctionType` ENUM('warn', 'freeze', 'ban') NOT NULL,
    `reason` TEXT NOT NULL,
    `startsAt` DATETIME(3) NOT NULL,
    `endsAt` DATETIME(3) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notice` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `body` TEXT NOT NULL,
    `noticeType` ENUM('specChange', 'maintenance', 'incident') NOT NULL,
    `priority` ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
    `publishAt` DATETIME(3) NOT NULL,
    `unpublishAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` BIGINT UNSIGNED NULL,
    `updatedBy` BIGINT UNSIGNED NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactInquiry` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `userAccountId` BIGINT UNSIGNED NULL,
    `email` VARCHAR(254) NULL,
    `category` ENUM('bugReport', 'account', 'billing', 'abuseReport', 'other') NOT NULL,
    `subject` VARCHAR(200) NOT NULL,
    `body` TEXT NOT NULL,
    `status` VARCHAR(32) NOT NULL DEFAULT 'open',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContributionLog` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `userAccountId` BIGINT UNSIGNED NOT NULL,
    `contributionType` VARCHAR(32) NOT NULL,
    `targetType` VARCHAR(32) NULL,
    `targetId` BIGINT UNSIGNED NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserProfile` ADD CONSTRAINT `UserProfile_userAccountId_fkey` FOREIGN KEY (`userAccountId`) REFERENCES `UserAccount`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EntityRevision` ADD CONSTRAINT `EntityRevision_entityId_fkey` FOREIGN KEY (`entityId`) REFERENCES `Entity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EntityLinkRequest` ADD CONSTRAINT `EntityLinkRequest_entityId_fkey` FOREIGN KEY (`entityId`) REFERENCES `Entity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EntityLinkRequestEvidence` ADD CONSTRAINT `EntityLinkRequestEvidence_linkRequestId_fkey` FOREIGN KEY (`linkRequestId`) REFERENCES `EntityLinkRequest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventDeleteRequest` ADD CONSTRAINT `EventDeleteRequest_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EntityDeleteRequest` ADD CONSTRAINT `EntityDeleteRequest_entityId_fkey` FOREIGN KEY (`entityId`) REFERENCES `Entity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccountReport` ADD CONSTRAINT `AccountReport_reporterUserId_fkey` FOREIGN KEY (`reporterUserId`) REFERENCES `UserAccount`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccountReport` ADD CONSTRAINT `AccountReport_targetUserId_fkey` FOREIGN KEY (`targetUserId`) REFERENCES `UserAccount`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSanction` ADD CONSTRAINT `UserSanction_userAccountId_fkey` FOREIGN KEY (`userAccountId`) REFERENCES `UserAccount`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContributionLog` ADD CONSTRAINT `ContributionLog_userAccountId_fkey` FOREIGN KEY (`userAccountId`) REFERENCES `UserAccount`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

