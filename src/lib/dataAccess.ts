import {Space} from '@/types/space';
import {fetchRandomUnsplashImage, UnsplashResponseBody} from '@/lib/unsplash';

export async function getRandomSpace(): Promise<Space> {
    const unsplash: UnsplashResponseBody = await fetchRandomUnsplashImage();
    
    return {
        id: 1,
        title: "Space 1",
        floorType: "Some floor",
        wallType: "Some wall",
        image: {
            imageUrl: unsplash.urls.full,
            thumbUrl: unsplash.urls.small
        },
        favorite: false
    }
}