import type { UploadcareImageDetails } from '@prezly/uploadcare-image/build/types';

import type { StoryWithImage } from '../../../lib/types/types';

export function getStoryThumbnail(story: StoryWithImage | null): UploadcareImageDetails | null {
    // @ts-ignore
    const { thumbnail_image } = story;

    if (thumbnail_image) {
        return JSON.parse(thumbnail_image);
    }

    return null;
}
