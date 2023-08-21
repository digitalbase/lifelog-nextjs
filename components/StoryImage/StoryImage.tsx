import Image from '@prezly/uploadcare-image';
import classNames from 'clsx';

import type { StoryWithImage } from '@/lib/types/types';
import { type CardSize, getCardImageSizes } from '@/lib/utils';

import { getStoryThumbnail } from './lib';

import styles from './StoryImage.module.scss';

type Props = {
    story: StoryWithImage;
    size: CardSize;
    className?: string;
};

function StoryImage({ story, size, className }: Props) {
    const image = getStoryThumbnail(story);

    return (
        <Image
            // @ts-ignore
            imageDetails={image}
            alt={story.title}
            layout="fill"
            objectFit="cover"
            containerClassName={classNames(styles.imageContainer, className)}
            className={styles.image}
            sizes={getCardImageSizes(size)}
        />
    );
}

export default StoryImage;
