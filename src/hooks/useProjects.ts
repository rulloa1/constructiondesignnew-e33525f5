import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url?: string;
  rotation_angle?: number;
}

export interface Project {
  id: string;
  title: string;
  description: string | null;
  category?: string;
  image_url?: string;
  rotation_angle?: number;
  images?: any[];
}

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
