import { designAlbums } from "./design-albums";

export interface Project {
    id: string;
    title: string;
    category: string;
    coverImage: string;
    description: string;
    gallery: string[];
    location: string;
}

export const projects: Project[] = [
    ...designAlbums.map(album => ({
        id: album.id,
        title: album.title,
        category: "Design",
        location: "Various Locations",
        description: album.description,
        coverImage: album.coverImage,
        gallery: album.images,
    }))
];

export const getProjectById = (id: string) => {
    return projects.find((project) => project.id === id);
};
