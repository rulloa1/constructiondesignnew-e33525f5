import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, Trash2, GripVertical } from "lucide-react";
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

  useEffect(() => {
    if (selectedProject) {
      fetchImages();
    }
  }, [selectedProject]);

  const fetchImages = async () => {
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
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !selectedProject) {
      toast.error("Please select a project first");
      return;
    }

    setUploading(true);

    for (const file of Array.from(e.target.files)) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${selectedProject}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('project-images')
        .upload(fileName, file);

      if (uploadError) {
        toast.error(`Failed to upload ${file.name}`);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase
        .from('project_images')
        .insert({
          project_id: selectedProject,
          image_url: publicUrl,
          display_order: images.length,
          is_before: false,
          is_after: false,
        });

      if (dbError) {
        toast.error("Failed to save image metadata");
      }
    }

    setUploading(false);
    toast.success("Images uploaded successfully");
    fetchImages();
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
          <div className="mt-4">
            <Label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-charcoal/30 rounded-lg hover:border-charcoal/50 transition-colors">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-charcoal/50 mb-2" />
                  <span className="text-sm text-charcoal/60">
                    Click to upload images (or drag & drop)
                  </span>
                </div>
              </div>
            </Label>
            <Input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-charcoal/10">
          <h2 className="text-xl font-playfair font-semibold mb-4">
            Project Images ({images.length})
          </h2>
          <div className="space-y-2">
            {images.map((image, index) => (
              <div
                key={image.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className="flex items-center gap-4 p-3 bg-cream/20 rounded-lg hover:bg-cream/30 transition-colors cursor-move"
              >
                <GripVertical className="h-5 w-5 text-charcoal/50" />
                <img
                  src={image.image_url}
                  alt={image.title || "Project image"}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">Image {index + 1}</p>
                  <p className="text-xs text-charcoal/60">Order: {image.display_order}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={image.is_before}
                      onCheckedChange={() => toggleBeforeAfter(image, 'is_before')}
                    />
                    <Label className="text-sm">Before</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={image.is_after}
                      onCheckedChange={() => toggleBeforeAfter(image, 'is_after')}
                    />
                    <Label className="text-sm">After</Label>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(image)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
