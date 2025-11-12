import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

// Import all Syracuse images
import syracuseCover from "@/assets/projects/syracuse-cover.png";
import syracuse1 from "@/assets/projects/syracuse-1.png";
import syracuse2 from "@/assets/projects/syracuse-2.png";
import syracuse3 from "@/assets/projects/syracuse-3.png";
import syracuse4 from "@/assets/projects/syracuse-4.png";
import syracuse5 from "@/assets/projects/syracuse-5.png";
import syracuse6 from "@/assets/projects/syracuse-6.png";
import syracuse7 from "@/assets/projects/syracuse-7.png";
import syracuse8 from "@/assets/projects/syracuse-8.png";
import syracuse9 from "@/assets/projects/syracuse-9.png";
import syracuse10 from "@/assets/projects/syracuse-10.png";
import syracuse11 from "@/assets/projects/syracuse-11.png";
import syracuse12 from "@/assets/projects/syracuse-12.png";
import syracuse13 from "@/assets/projects/syracuse-13.png";
import syracuse14 from "@/assets/projects/syracuse-14.png";
import syracuse15 from "@/assets/projects/syracuse-15.png";
import syracuse16 from "@/assets/projects/syracuse-16.png";
import syracuse17 from "@/assets/projects/syracuse-17.png";
import syracuse18 from "@/assets/projects/syracuse-18.png";
import syracuse19 from "@/assets/projects/syracuse-19.png";
import syracuse20 from "@/assets/projects/syracuse-20.png";
import syracuse21 from "@/assets/projects/syracuse-21.png";
import syracuse22 from "@/assets/projects/syracuse-22.png";
import syracuse23 from "@/assets/projects/syracuse-23.png";
import syracuse24 from "@/assets/projects/syracuse-24.png";
import syracuse25 from "@/assets/projects/syracuse-25.png";
import syracuse26 from "@/assets/projects/syracuse-26.png";
import syracuse27 from "@/assets/projects/syracuse-27.jpg";
import syracuse28 from "@/assets/projects/syracuse-28.jpg";
import syracuse29 from "@/assets/projects/syracuse-29.jpg";
import syracuse30 from "@/assets/projects/syracuse-30.jpg";
import syracuse31 from "@/assets/projects/syracuse-31.jpg";
import syracuse32 from "@/assets/projects/syracuse-32.jpg";
import syracuse33 from "@/assets/projects/syracuse-33.jpg";
import syracuse34 from "@/assets/projects/syracuse-34.jpg";
import syracuse35 from "@/assets/projects/syracuse-35.jpg";
import syracuse36 from "@/assets/projects/syracuse-36.jpg";
import syracuse37 from "@/assets/projects/syracuse-37.jpg";
import syracuse38 from "@/assets/projects/syracuse-38.jpg";
import syracuse39 from "@/assets/projects/syracuse-39.jpg";
import syracuse40 from "@/assets/projects/syracuse-40.jpg";
import syracuse41 from "@/assets/projects/syracuse-41.jpg";
import syracuse42 from "@/assets/projects/syracuse-42.jpg";
import syracuse43 from "@/assets/projects/syracuse-43.jpg";
import syracuse44 from "@/assets/projects/syracuse-44.jpg";
import syracuse45 from "@/assets/projects/syracuse-45.jpg";
import syracuse46 from "@/assets/projects/syracuse-46.jpg";
import syracuse47 from "@/assets/projects/syracuse-47.jpg";
import syracuse48 from "@/assets/projects/syracuse-48.jpg";
import syracuse49 from "@/assets/projects/syracuse-49.jpg";
import syracuse50 from "@/assets/projects/syracuse-50.jpg";
import syracuse51 from "@/assets/projects/syracuse-51.jpg";
import syracuse52 from "@/assets/projects/syracuse-52.jpg";
import syracuse53 from "@/assets/projects/syracuse-53.jpg";
import syracuse54 from "@/assets/projects/syracuse-54.jpg";
import syracuse55 from "@/assets/projects/syracuse-55.jpg";
import syracuse56 from "@/assets/projects/syracuse-56.jpg";
import syracuse57 from "@/assets/projects/syracuse-57.jpg";
import syracuse58 from "@/assets/projects/syracuse-58.jpg";
import syracuse59 from "@/assets/projects/syracuse-59.jpg";
import syracuse60 from "@/assets/projects/syracuse-60.jpg";
import syracuse62 from "@/assets/projects/syracuse-62.jpg";

const PROJECT_ID = "syracuse-house";

// Map of image imports with their filenames
const syracuseImages = [
  { image: syracuseCover, filename: "syracuse-cover.png" },
  { image: syracuse1, filename: "syracuse-1.png" },
  { image: syracuse2, filename: "syracuse-2.png" },
  { image: syracuse3, filename: "syracuse-3.png" },
  { image: syracuse4, filename: "syracuse-4.png" },
  { image: syracuse5, filename: "syracuse-5.png" },
  { image: syracuse6, filename: "syracuse-6.png" },
  { image: syracuse7, filename: "syracuse-7.png" },
  { image: syracuse8, filename: "syracuse-8.png" },
  { image: syracuse9, filename: "syracuse-9.png" },
  { image: syracuse10, filename: "syracuse-10.png" },
  { image: syracuse11, filename: "syracuse-11.png" },
  { image: syracuse12, filename: "syracuse-12.png" },
  { image: syracuse13, filename: "syracuse-13.png" },
  { image: syracuse14, filename: "syracuse-14.png" },
  { image: syracuse15, filename: "syracuse-15.png" },
  { image: syracuse16, filename: "syracuse-16.png" },
  { image: syracuse17, filename: "syracuse-17.png" },
  { image: syracuse18, filename: "syracuse-18.png" },
  { image: syracuse19, filename: "syracuse-19.png" },
  { image: syracuse20, filename: "syracuse-20.png" },
  { image: syracuse21, filename: "syracuse-21.png" },
  { image: syracuse22, filename: "syracuse-22.png" },
  { image: syracuse23, filename: "syracuse-23.png" },
  { image: syracuse24, filename: "syracuse-24.png" },
  { image: syracuse25, filename: "syracuse-25.png" },
  { image: syracuse26, filename: "syracuse-26.png" },
  { image: syracuse27, filename: "syracuse-27.jpg" },
  { image: syracuse28, filename: "syracuse-28.jpg" },
  { image: syracuse29, filename: "syracuse-29.jpg" },
  { image: syracuse30, filename: "syracuse-30.jpg" },
  { image: syracuse31, filename: "syracuse-31.jpg" },
  { image: syracuse32, filename: "syracuse-32.jpg" },
  { image: syracuse33, filename: "syracuse-33.jpg" },
  { image: syracuse34, filename: "syracuse-34.jpg" },
  { image: syracuse35, filename: "syracuse-35.jpg" },
  { image: syracuse36, filename: "syracuse-36.jpg" },
  { image: syracuse37, filename: "syracuse-37.jpg" },
  { image: syracuse38, filename: "syracuse-38.jpg" },
  { image: syracuse39, filename: "syracuse-39.jpg" },
  { image: syracuse40, filename: "syracuse-40.jpg" },
  { image: syracuse41, filename: "syracuse-41.jpg" },
  { image: syracuse42, filename: "syracuse-42.jpg" },
  { image: syracuse43, filename: "syracuse-43.jpg" },
  { image: syracuse44, filename: "syracuse-44.jpg" },
  { image: syracuse45, filename: "syracuse-45.jpg" },
  { image: syracuse46, filename: "syracuse-46.jpg" },
  { image: syracuse47, filename: "syracuse-47.jpg" },
  { image: syracuse48, filename: "syracuse-48.jpg" },
  { image: syracuse49, filename: "syracuse-49.jpg" },
  { image: syracuse50, filename: "syracuse-50.jpg" },
  { image: syracuse51, filename: "syracuse-51.jpg" },
  { image: syracuse52, filename: "syracuse-52.jpg" },
  { image: syracuse53, filename: "syracuse-53.jpg" },
  { image: syracuse54, filename: "syracuse-54.jpg" },
  { image: syracuse55, filename: "syracuse-55.jpg" },
  { image: syracuse56, filename: "syracuse-56.jpg" },
  { image: syracuse57, filename: "syracuse-57.jpg" },
  { image: syracuse58, filename: "syracuse-58.jpg" },
  { image: syracuse59, filename: "syracuse-59.jpg" },
  { image: syracuse60, filename: "syracuse-60.jpg" },
  { image: syracuse62, filename: "syracuse-62.jpg" },
];

export const UploadSyracuseImages = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState("");

  const convertImageToFile = async (imageUrl: string, filename: string): Promise<File | null> => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new File([blob], filename, { type: blob.type });
    } catch (error) {
      console.error(`Failed to convert ${filename}:`, error);
      return null;
    }
  };

  const handleUpload = async () => {
    const confirm = window.confirm(
      `This will upload ${syracuseImages.length} Syracuse images to Supabase storage. This may take a few minutes. Continue?`
    );
    if (!confirm) return;

    setUploading(true);
    let successCount = 0;
    let failCount = 0;

    // Check existing images
    const { data: existing } = await supabase
      .from('project_images')
      .select('image_url')
      .eq('project_id', PROJECT_ID);

    const existingUrls = new Set(existing?.map(img => img.image_url) || []);

    for (let i = 0; i < syracuseImages.length; i++) {
      const { image, filename } = syracuseImages[i];
      setCurrentFile(filename);
      setProgress(((i + 1) / syracuseImages.length) * 100);

      try {
        // Convert image URL to File
        const file = await convertImageToFile(image, filename);
        if (!file) {
          failCount++;
          continue;
        }

        // Check if this image already exists
        const imageUrl = image as string;
        if (existingUrls.has(imageUrl)) {
          console.log(`Skipping ${filename} - already exists`);
          continue;
        }

        // Upload to Supabase storage
        const fileExt = filename.split('.').pop();
        const storageFileName = `${PROJECT_ID}/${Date.now()}-${i}-${filename}`;

        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('project-images')
          .upload(storageFileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error(`Failed to upload ${filename}:`, uploadError);
          failCount++;
          continue;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('project-images')
          .getPublicUrl(storageFileName);

        // Insert into database
        const { error: dbError } = await supabase
          .from('project_images')
          .insert({
            project_id: PROJECT_ID,
            image_url: publicUrl,
            title: `Syracuse ${i + 1}`,
            description: null,
            display_order: i,
            is_before: false,
            is_after: false,
          });

        if (dbError) {
          console.error(`Failed to save ${filename} to database:`, dbError);
          failCount++;
        } else {
          successCount++;
        }
      } catch (error) {
        console.error(`Error uploading ${filename}:`, error);
        failCount++;
      }
    }

    setUploading(false);
    setProgress(0);
    setCurrentFile("");

    if (successCount > 0) {
      toast.success(`Successfully uploaded ${successCount} images!`);
      setTimeout(() => window.location.reload(), 1500);
    }
    if (failCount > 0) {
      toast.error(`Failed to upload ${failCount} images. Check console for details.`);
    }
  };

  return (
    <Alert className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="font-medium mb-1">Upload Syracuse Images</p>
            <p className="text-sm text-muted-foreground mb-2">
              Upload all {syracuseImages.length} Syracuse House images to Supabase storage for better management.
            </p>
            {uploading && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Uploading: {currentFile}</p>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
          <Button
            onClick={handleUpload}
            disabled={uploading}
            variant="default"
            size="sm"
            className="shrink-0"
          >
            <Upload className="mr-2 h-4 w-4" />
            {uploading ? "Uploading..." : "Upload All Images"}
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

