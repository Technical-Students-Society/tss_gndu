import { createClient } from "@/utils/supabase/server";
import GalleryClient from "./GalleryClient";

export const revalidate = 0; // Ensure we always get the latest images

async function getGalleryImages() {
  const supabase = await createClient();
  if (!supabase) return [];

  // List all files in the 'event-images' folder within 'tss-bucket'
  const { data, error } = await supabase.storage
    .from("tss-bucket")
    .list("event-images", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "desc" },
    });

  if (error) {
    console.error("Error fetching images:", error);
    return [];
  }

  // Generate public URLs for each image
  const images = data
    .filter((file) => file.name !== ".emptyKeep" && (file.name.endsWith('.jpg') || file.name.endsWith('.png') || file.name.endsWith('.webp') || file.name.endsWith('.jpeg')))
    .map((file) => {
      const { data: publicUrlData } = supabase.storage
        .from("tss-bucket")
        .getPublicUrl(`event-images/${file.name}`);

      return {
        id: file.id,
        src: publicUrlData.publicUrl,
        alt: file.name,
        name: file.name,
      };
    });

  return images;
}

export const metadata = {
  title: "Gallery | Technical Students' Society GNDU",
  description: "Explore moments from workshops, hackathons, and events organized by the Technical Students' Society (TSS) at Guru Nanak Dev University."
}

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return <GalleryClient images={images} />;
}

