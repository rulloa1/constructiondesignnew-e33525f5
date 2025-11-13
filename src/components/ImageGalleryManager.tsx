import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Trash2, GripVertical } from "lucide-react";
import { projects } from "@/data/projects";
import { Checkbox } from "@/components/ui/checkbox";

interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  title: string | null;
  description: string | null;
  display_order: number;
  is_before: boolean;
  is_after: boolean;
}

export const ImageGalleryManager = () => {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const fetchImages = useCallback(async () => {
    const { data, error } = await supabase
      .from('project_images')
      .select('*')
      .eq('project_id', selectedProject)
      .order('display_order', { ascending: true });

    if (error) {
      toast.error("Failed to fetch images");
    } else {
      setImages(data || []);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      fetchImages();
    }
  }, [selectedProject, fetchImages]);

  const [imageUrl, setImageUrl] = useState("");
  const [imageTitle, setImageTitle] = useState("");

  const handleAddImage = async () => {
    if (!imageUrl.trim() || !selectedProject) {
      toast.error("Please enter an image URL and select a project");
      return;
    }

    setUploading(true);

    const { error } = await supabase
      .from('project_images')
      .insert({
        project_id: selectedProject,
        image_url: imageUrl.trim(),
        title: imageTitle.trim() || `Image ${images.length + 1}`,
        display_order: images.length,
        is_before: false,
        is_after: false,
      });

    setUploading(false);

    if (error) {
      console.error('Database insert error:', error);
      toast.error(`Failed to add image: ${error.message}`);
    } else {
      toast.success("Image added successfully");
      setImageUrl("");
      setImageTitle("");
      fetchImages();
    }
  };

  const handleDelete = async (image: ProjectImage) => {
    const fileName = image.image_url.split('/').pop();
    if (!fileName) return;

    await supabase.storage
      .from('project-images')
      .remove([`${selectedProject}/${fileName}`]);

    const { error } = await supabase
      .from('project_images')
      .delete()
      .eq('id', image.id);

    if (error) {
      toast.error("Failed to delete image");
    } else {
      toast.success("Image deleted");
      fetchImages();
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);

    setImages(newImages);
    setDraggedIndex(index);
  };

  const handleDragEnd = async () => {
    if (draggedIndex === null) return;

    const updates = images.map((img, index) => ({
      id: img.id,
      display_order: index,
    }));

    for (const update of updates) {
      await supabase
        .from('project_images')
        .update({ display_order: update.display_order })
        .eq('id', update.id);
    }

    setDraggedIndex(null);
    toast.success("Order updated");
  };

  const toggleBeforeAfter = async (image: ProjectImage, field: 'is_before' | 'is_after') => {
    const { error } = await supabase
      .from('project_images')
      .update({ [field]: !image[field] })
      .eq('id', image.id);

    if (error) {
      toast.error("Failed to update image");
    } else {
      fetchImages();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal/10">
        <Label htmlFor="project">Select Project</Label>
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Choose a project" />
          </SelectTrigger>
          <SelectContent className="bg-white z-50">
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedProject && (
          <>
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="image-url">Image URL or Path</Label>
                <Input
                  id="image-url"
                  type="text"
                  placeholder="/assets/project-name/image.jpg or https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  disabled={uploading}
                  className="mt-1"
                />
                <p className="text-xs text-charcoal/60 mt-1">
                  Enter a path to an image in your assets folder or an external URL
                </p>
              </div>
              
              <div>
                <Label htmlFor="image-title">Image Title (optional)</Label>
                <Input
                  id="image-title"
                  type="text"
                  placeholder="e.g., Living Room View"
                  value={imageTitle}
                  onChange={(e) => setImageTitle(e.target.value)}
                  disabled={uploading}
                  className="mt-1"
                />
              </div>

              <Button 
                onClick={handleAddImage}
                disabled={uploading || !imageUrl.trim()}
                className="w-full"
              >
                {uploading ? "Adding..." : "Add Image"}
              </Button>
            </div>
          </>
        )}
      </div>

      {images.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal/10">
          <h2 className="text-xl font-playfair font-semibold mb-4">
            Project Images ({images.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className="relative group bg-cream/20 rounded-lg hover:bg-cream/30 transition-colors cursor-move overflow-hidden"
              >
                <div className="absolute top-2 left-2 z-10">
                  <GripVertical className="h-5 w-5 text-white drop-shadow-lg" />
                </div>
                <img
                  src={image.image_url}
                  alt={image.title || "Project image"}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Image {index + 1}</p>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(image)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Checkbox
                        checked={image.is_before}
                        onCheckedChange={() => toggleBeforeAfter(image, 'is_before')}
                      />
                      <Label className="text-xs cursor-pointer">Before</Label>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Checkbox
                        checked={image.is_after}
                        onCheckedChange={() => toggleBeforeAfter(image, 'is_after')}
                      />
                      <Label className="text-xs cursor-pointer">After</Label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
