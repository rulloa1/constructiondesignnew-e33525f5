import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link } from "lucide-react";

interface VideoUploadProps {
  projectId: string;
  onUploadComplete: () => void;
}

export const VideoUpload = ({ projectId, onUploadComplete }: VideoUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlSubmit = async () => {
    if (!videoUrl.trim()) {
      toast.error("Please enter a video URL");
      return;
    }

    if (!validateUrl(videoUrl)) {
      toast.error("Please enter a valid URL");
      return;
    }

    setUploading(true);
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Not authenticated. Please log in again.');
      }

      // Check admin role
      const { data: roleCheck, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin');

      if (roleError) {
        throw new Error(`Role check failed: ${roleError.message}`);
      }

      if (!roleCheck || roleCheck.length === 0) {
        throw new Error('Admin privileges required to add videos');
      }

      // Save to database
      const { data: dbData, error: dbError } = await supabase
        .from('project_videos')
        .insert({
          project_id: projectId,
          video_url: videoUrl.trim(),
          title: title.trim() || null,
          description: description.trim() || null,
        })
        .select();

      if (dbError) {
        throw new Error(`Database insert failed: ${dbError.message}`);
      }

      toast.success("Video added successfully!");
      setVideoUrl("");
      setTitle("");
      setDescription("");
      onUploadComplete();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to add video";
      toast.error(errorMessage, { duration: 5000 });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border border-border rounded-lg bg-card">
      <h3 className="text-lg font-semibold text-foreground">Add Video</h3>
      
      <div className="space-y-3">
        <div>
          <label htmlFor="video-url" className="text-sm font-medium text-foreground">
            Video URL *
          </label>
          <Input
            id="video-url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=... or direct video URL"
            className="mt-1"
            disabled={uploading}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Supports YouTube, Vimeo, or direct video links (MP4, WebM)
          </p>
        </div>

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
            disabled={uploading}
          />
        </div>

        <div>
          <label htmlFor="video-description" className="text-sm font-medium text-foreground">
            Description (optional)
          </label>
          <Textarea
            id="video-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Video description"
            className="mt-1"
            rows={3}
            disabled={uploading}
          />
        </div>

        <Button
          onClick={handleUrlSubmit}
          disabled={uploading || !videoUrl.trim()}
          className="w-full"
        >
          <Link className="mr-2 h-4 w-4" />
          {uploading ? "Adding..." : "Add Video"}
        </Button>
      </div>
    </div>
  );
};
