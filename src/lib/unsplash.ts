export type UnsplashResponseBody = {
    urls: {
        full: string;
        small: string;
    }
}

export async function fetchRandomUnsplashImage(): Promise<UnsplashResponseBody> {
    let results: Response;
    try {
        const url = new URL("https://api.unsplash.com/photos/random?query=interior+room&orientation=landscape");
        results = await fetch(url, {
            headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`, Accept: "application/json" }
        })
    } catch (e) {
        throw new Error(`Error fetching image from unsplash: ${e}`);
    }

    if (!results.ok) {
        throw new Error(`Unsplash api has rejected the request. Status: ${results.status}`);
    }

    return results.json();
}
