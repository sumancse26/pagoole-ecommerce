-- AlterTable
ALTER TABLE "Geo_Locations" ALTER COLUMN "is_active" SET DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Geo_Locations" ADD CONSTRAINT "Geo_Locations_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Geo_Locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
