import Image from '@prezly/uploadcare-image';
import classNames from 'clsx';

import { type CardSize, getCardImageSizes } from '@/utils';
import type { StoryWithImage } from 'types';

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
