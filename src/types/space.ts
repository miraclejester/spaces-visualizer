export type Space = {
    id: number;
    title: string;
    floorType: string;
    wallType: string;
    image: SpaceImage;
    favorite: boolean;
}

export type SpaceImage = {
    imageUrl: string;
    thumbUrl: string;
}

export type AppMode = "visualizer" | "spaces";