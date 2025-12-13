import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

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
