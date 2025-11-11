import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface VideoUploadProps {
  projectId: string;
  onUploadComplete: () => void;
}

export const VideoUpload = ({ projectId, onUploadComplete }: VideoUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid video file (MP4, WebM, MOV, or AVI)");
      return;
    }

    if (file.size > 500 * 1024 * 1024) {
      toast.error("Video file must be less than 500MB");
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${projectId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('project-videos')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Storage upload error details:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('project-videos')
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase
        .from('project_videos')
        .insert({
          project_id: projectId,
          video_url: publicUrl,
          title: title || file.name,
          description: description || null,
        });

      if (dbError) {
        console.error('Database error details:', dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }

      toast.success("Video uploaded successfully!");
      setTitle("");
      setDescription("");
      onUploadComplete();
      
      if (event.target) event.target.value = '';
    } catch (error: any) {
      console.error('Full error:', error);
      const errorMessage = error.message || "Failed to upload video";
      toast.error(errorMessage, { duration: 5000 });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border border-border rounded-lg bg-card">
      <h3 className="text-lg font-semibold text-foreground">Upload Video</h3>
      
      <div className="space-y-3">
        <div>
          <label htmlFor="video-title" className="text-sm font-medium text-foreground">
            Title (optional)
          </label>
          <Input
            id="video-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Video title"
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="video-description" className="text-sm font-medium text-foreground">
            Description (optional)
          </label>
          <Input
            id="video-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Video description"
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="video-file" className="cursor-pointer">
            <Button
              type="button"
              variant="outline"
              disabled={uploading}
              className="w-full"
              asChild
            >
              <span>
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? "Uploading..." : "Choose Video File"}
              </span>
            </Button>
          </label>
          <input
            id="video-file"
            type="file"
            accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Supported formats: MP4, WebM, MOV, AVI (max 500MB)
          </p>
        </div>
      </div>
    </div>
  );
};
