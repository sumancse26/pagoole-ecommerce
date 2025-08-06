-- DropIndex
DROP INDEX "File_Server_base_url_key";

-- AlterTable
ALTER TABLE "File_Server" ALTER COLUMN "base_url" SET DEFAULT '',
ALTER COLUMN "base_url" SET DATA TYPE TEXT;
