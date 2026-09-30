"use server";

import {Space} from '@/types/space';
import {fetchRandomUnsplashImage, UnsplashResponseBody} from '@/lib/unsplash';

const TITLES = ["Cosy Bedroom", "Living Room", "Reading Nook", "Guest Room", "Dining Room", "Studio Loft", "Sunroom", "Kitchen"];
const FLOOR_TYPES = ["Hawk maple hardwood", "Dark forest hardwood", "Grey oak laminate", "Walnut herringbone", "White marble tile", "Polished concrete"];
const WALL_TYPES = ["Deep night blue", "Pearl white", "Sage green", "Terracotta", "Warm greige", "Charcoal gray"];

const pick = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

export async function getRandomSpace(id: number): Promise<Space> {
    const unsplash: UnsplashResponseBody = await fetchRandomUnsplashImage();

    return {
        id,
        title: pick(TITLES),
        floorType: pick(FLOOR_TYPES),
        wallType: pick(WALL_TYPES),
        image: {
            imageUrl: unsplash.urls.full,
            thumbUrl: unsplash.urls.small
        },
        favorite: false
    }
}
