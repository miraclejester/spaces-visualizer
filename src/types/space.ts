export type Space = {
    id: string;
    title: string;
    floorType: string;
    wallType: string;
    imageUrl: string;
    thumbUrl: string;
    favorite: boolean;
}

export type AppMode = "visualizer" | "spaces";