import {getImageProps} from 'next/image';

export async function preloadImage(src: string, sizes: string): Promise<void> {
    const { props } = getImageProps({ src, alt: "", fill: true, sizes });
    const img = new window.Image();
    if (props.sizes) img.sizes = props.sizes;
    if (props.srcSet) img.srcset = props.srcSet;
    img.src = props.src;
    await img.decode();
}
