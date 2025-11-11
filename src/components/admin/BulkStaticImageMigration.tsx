import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Database, AlertCircle } from "lucide-react";
import { projects } from "@/data/projects";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

export const BulkStaticImageMigration = () => {
  const [migrating, setMigrating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentProject, setCurrentProject] = useState("");

  const projectsWithImages = projects.filter(p => p.images && p.images.length > 0);

  const handleBulkMigration = async () => {
    const confirm = window.confirm(
      `This will migrate ${projectsWithImages.length} projects with static images to the database. This may take a few minutes. Continue?`
    );
    if (!confirm) return;

    setMigrating(true);
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < projectsWithImages.length; i++) {
      const project = projectsWithImages[i];
      setCurrentProject(project.title);
      setProgress(((i + 1) / projectsWithImages.length) * 100);

      try {
        // Check if images already exist
        const { data: existing } = await supabase
          .from('project_images')
          .select('id')
          .eq('project_id', project.id);

        if (existing && existing.length > 0) {
          console.log(`Skipping ${project.title} - already has ${existing.length} images`);
          continue;
        }

        // Insert images
        const imagesToInsert = project.images.map((imageUrl, index) => ({
          project_id: project.id,
          image_url: imageUrl,
          title: `Image ${index + 1}`,
          description: null,
          display_order: index,
          is_before: false,
          is_after: false,
        }));

        const { error } = await supabase
          .from('project_images')
          .insert(imagesToInsert);

        if (error) {
          console.error(`Failed to migrate ${project.title}:`, error);
          failCount++;
        } else {
          successCount++;
        }
      } catch (error) {
        console.error(`Error migrating ${project.title}:`, error);
        failCount++;
      }
    }

    setMigrating(false);
    setProgress(0);
    setCurrentProject("");

    if (successCount > 0) {
      toast.success(`Successfully migrated ${successCount} projects!`);
      setTimeout(() => window.location.reload(), 1500);
    }
    if (failCount > 0) {
      toast.error(`Failed to migrate ${failCount} projects. Check console for details.`);
    }
  };

  if (projectsWithImages.length === 0) return null;

  return (
    <Alert className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="font-medium mb-1">Bulk Migration Available</p>
            <p className="text-sm text-muted-foreground mb-2">
              {projectsWithImages.length} projects have static images that can be migrated to the database for full management.
            </p>
            {migrating && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Migrating: {currentProject}</p>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
          <Button
            onClick={handleBulkMigration}
            disabled={migrating}
            variant="default"
            size="sm"
            className="shrink-0"
          >
            <Database className="mr-2 h-4 w-4" />
            {migrating ? "Migrating..." : "Migrate All Projects"}
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};
