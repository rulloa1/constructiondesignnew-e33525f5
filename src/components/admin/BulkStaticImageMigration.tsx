import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Database, AlertCircle } from "lucide-react";
import { projects } from "@/data/projects";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

export const BulkStaticImageMigration = () => {
  const [migrating, setMigrating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentProject, setCurrentProject] = useState("");
  const projectsWithImages = projects.filter(p => p.images && p.images.length > 0);
  const [selectedProjects, setSelectedProjects] = useState<string[]>(projectsWithImages.map(p => p.id));

  const toggleProject = (projectId: string) => {
    setSelectedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const toggleAll = () => {
    setSelectedProjects(prev =>
      prev.length === projectsWithImages.length ? [] : projectsWithImages.map(p => p.id)
    );
  };

  const handleBulkMigration = async () => {
    const projectsToMigrate = projectsWithImages.filter(p => selectedProjects.includes(p.id));
    
    if (projectsToMigrate.length === 0) {
      toast.error("Please select at least one project to migrate");
      return;
    }

    const confirm = window.confirm(
      `This will migrate ${projectsToMigrate.length} selected project(s) with static images to the database. Continue?`
    );
    if (!confirm) return;

    setMigrating(true);
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < projectsToMigrate.length; i++) {
      const project = projectsToMigrate[i];
      setCurrentProject(project.title);
      setProgress(((i + 1) / projectsToMigrate.length) * 100);

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
      toast.success(`Successfully migrated ${successCount} project(s)!`);
      setTimeout(() => window.location.reload(), 1500);
    }
    if (failCount > 0) {
      toast.error(`Failed to migrate ${failCount} project(s). Check console for details.`);
    }
  };

  if (projectsWithImages.length === 0) return null;

  return (
    <Alert className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="font-medium mb-1">Bulk Migration Available</p>
              <p className="text-sm text-muted-foreground">
                Select projects to migrate their static images to the database.
              </p>
            </div>
            <Button
              onClick={handleBulkMigration}
              disabled={migrating || selectedProjects.length === 0}
              variant="default"
              size="sm"
              className="shrink-0"
            >
              <Database className="mr-2 h-4 w-4" />
              {migrating ? "Migrating..." : `Migrate Selected (${selectedProjects.length})`}
            </Button>
          </div>

          {migrating && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Migrating: {currentProject}</p>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {!migrating && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Button
                  onClick={toggleAll}
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs"
                >
                  {selectedProjects.length === projectsWithImages.length ? "Deselect All" : "Select All"}
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-2 border rounded-md">
                {projectsWithImages.map(project => (
                  <div
                    key={project.id}
                    className="flex items-center gap-2 p-2 hover:bg-accent rounded-md transition-colors"
                  >
                    <Checkbox
                      id={`project-${project.id}`}
                      checked={selectedProjects.includes(project.id)}
                      onCheckedChange={() => toggleProject(project.id)}
                    />
                    <label
                      htmlFor={`project-${project.id}`}
                      className="text-sm cursor-pointer flex-1"
                    >
                      {project.title} ({project.images?.length || 0} images)
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};
