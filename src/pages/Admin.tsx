import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { ProjectsManager } from "@/components/admin/ProjectsManager";
import { ImageManager } from "@/components/admin/ImageManager";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogOut, Loader2, RotateCw } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Admin() {
  const navigate = useNavigate();
  const { user, loading, isAdmin } = useAuth();
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [projects, setProjects] = useState<Array<{ id: string; title: string }>>([]);
  const [fixingCovers, setFixingCovers] = useState(false);

  const fetchProjects = useCallback(async () => {
    const { data } = await supabase
      .from("projects")
      .select("id, title")
      .order("title");
    
    if (data && data.length > 0) {
      setProjects(data);
      setSelectedProjectId(data[0].id);
    }
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchProjects();
    }
  }, [user, isAdmin, fetchProjects]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleFixAllCoverPhotos = async () => {
    if (!confirm("This will set all cover photo rotations to 0° (upright). Continue?")) {
      return;
    }

    setFixingCovers(true);
    try {
      // Get all projects
      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select("id, title");

      if (projectsError) throw projectsError;

      let fixedCount = 0;
      let errorCount = 0;

      // For each project, get the first image (cover) and set rotation to 0
      for (const project of projectsData || []) {
        // Get the first image (lowest display_order)
        const { data: coverImage, error: imageError } = await supabase
          .from("project_images")
          .select("id, rotation_angle")
          .eq("project_id", project.id)
          .order("display_order", { ascending: true })
          .limit(1)
          .maybeSingle();

        if (imageError) {
          if (import.meta.env.DEV) {
            console.error(`Error fetching cover for ${project.title}:`, imageError);
          }
          errorCount++;
          continue;
        }

        if (!coverImage) continue;

        // If rotation is not 0, fix it
        if (coverImage.rotation_angle !== 0 && coverImage.rotation_angle !== null) {
          const { error: updateError } = await supabase
            .from("project_images")
            .update({ rotation_angle: 0 })
            .eq("id", coverImage.id);

          if (updateError) {
            if (import.meta.env.DEV) {
              console.error(`Error updating ${project.title}:`, updateError);
            }
            errorCount++;
          } else {
            fixedCount++;
          }
        }
      }

      if (errorCount > 0) {
        toast.error(`Fixed ${fixedCount} cover photos, ${errorCount} errors`);
      } else {
        toast.success(`Fixed ${fixedCount} cover photos!`);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error fixing cover photos:", error);
      }
      toast.error("Failed to fix cover photos");
    } finally {
      setFixingCovers(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-playfair font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You don't have admin permissions.</p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-playfair font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
        
        <Tabs defaultValue="projects" className="w-full">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>
160	
161	          <TabsContent value="projects">
162	            <ProjectsManager />
163	          </TabsContent>
164	
165	          <TabsContent value="images">
166	            <div className="space-y-6">
167	              <div className="flex items-end gap-4">
168	                <div className="max-w-xs flex-1">
169	                  <Label className="mb-2 block">Select Project</Label>
170	                  <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
171	                    <SelectTrigger>
172	                      <SelectValue placeholder="Choose a project" />
173	                    </SelectTrigger>
174	                    <SelectContent>
175	                      {projects.map((project) => (
176	                        <SelectItem key={project.id} value={project.id}>
177	                          {project.title}
178	                        </SelectItem>
179	                      ))}
180	                    </SelectContent>
181	                  </Select>
182	                </div>
183	                <Button
184	                  variant="outline"
185	                  onClick={handleFixAllCoverPhotos}
186	                  disabled={fixingCovers}
187	                  className="mb-0"
188	                >
189	                  {fixingCovers ? (
190	                    <>
191	                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
192	                      Fixing...
193	                    </>
194	                  ) : (
195	                    <>
196	                      <RotateCw className="mr-2 h-4 w-4" />
197	                      Fix All Cover Photos
198	                    </>
199	                  )}
200	                </Button>
201	              </div>
202	
203	              {selectedProjectId && <ImageManager projectId={selectedProjectId} />}
204	            </div>
205	          </TabsContent>
206	        </Tabs>
207	      </div>
208	    </div>
209	  );
210	}
