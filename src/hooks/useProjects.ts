import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ProjectImage {
  id: string;
  image_url: string;
  rotation_angle: number;
}

export interface Project {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url?: string;
  rotation_angle?: number;
  images?: ProjectImage[];
}

interface UseProjectsOptions {
  category?: string;
  categories?: string[];
  includeAllImages?: boolean;
}

/**
 * Custom hook to fetch projects from Supabase
 * Handles loading states and image fetching
 */
export const useProjects = (options: UseProjectsOptions = {}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.category, options.categories?.join(','), options.includeAllImages]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query
      let query = supabase.from("projects").select("*");

      // Filter by category
      if (options.category) {
        query = query.eq("category", options.category);
      } else if (options.categories && options.categories.length > 0) {
        query = query.in("category", options.categories);
      }

      // Order results
      query = query.order("display_order");

      const { data: projectsData, error: projectsError } = await query;

      if (projectsError) throw projectsError;

      // Fetch images for each project
      const projectsWithImages = await Promise.all(
        (projectsData || []).map(async (project) => {
          if (options.includeAllImages) {
            // Fetch all images for gallery
            const { data: allImages } = await supabase
              .from("project_images")
              .select("id, image_url, rotation_angle")
              .eq("project_id", project.id)
              .order("display_order");

            const images = allImages || [];
            return {
              ...project,
              image_url: images[0]?.image_url,
              rotation_angle: images[0]?.rotation_angle || 0,
              images: images,
            };
          } else {
            // Fetch only first image for thumbnails
            const { data: images } = await supabase
              .from("project_images")
              .select("image_url, rotation_angle")
              .eq("project_id", project.id)
              .order("display_order")
              .limit(1)
              .maybeSingle();

            return {
              ...project,
              image_url: images?.image_url,
              rotation_angle: images?.rotation_angle || 0,
            };
          }
        })
      );

      setProjects(projectsWithImages);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(err instanceof Error ? err : new Error("Failed to fetch projects"));
    } finally {
      setLoading(false);
    }
  };

  return { projects, loading, error, refetch: fetchProjects };
};

export const useProjectsByCategory = (category: string | string[]) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Optimized query: Uses Supabase JOIN to fetch projects and their first image in one request
        let query = supabase
          .from("projects")
          .select(`
            *,
            project_images (
              image_url,
              rotation_angle,
              display_order
            )
          `);

        if (Array.isArray(category)) {
          query = query.in("category", category).order("category");
        } else {
          query = query.eq("category", category);
        }

        const { data, error } = await query.order("display_order");

        if (error) throw error;

        const processedProjects = (data || []).map((project) => {
          const images = project.project_images as unknown as { image_url: string; rotation_angle: number; display_order: number }[];
          const firstImage = images && images.length > 0
            ? images.sort((a, b) => a.display_order - b.display_order)[0]
            : null;

          return {
            id: project.id,
            title: project.title,
            description: project.description,
            category: project.category, // Added category to return type
            image_url: firstImage?.image_url,
            rotation_angle: firstImage?.rotation_angle || 0,
            images: images, // Keep all images if needed for gallery
          };
        });

        setProjects(processedProjects);
      } catch (error) {
        console.error(`Error fetching ${category} projects:`, error);
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProjects();
    }
  }, [category]);

  return { projects, loading };
};
