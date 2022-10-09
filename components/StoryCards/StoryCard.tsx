import {StoryPublicationDate} from '@prezly/themes-ui-components';
import classNames from 'clsx';
import Link from 'next/link';

import { useDevice, useThemeSettings } from '@/hooks';
import type { StoryWithImage } from 'types';

import CategoriesList from '../CategoriesList';
import StoryImage from '../StoryImage';

import styles from './StoryCard.module.scss';

type Props = {
    story: StoryWithImage;
    size?: 'small' | 'medium' | 'big';
};

function StoryCard({ story, size = 'small' }: Props) {
    const { categories, title, subtitle } = story;
    const { showDate, showSubtitle } = useThemeSettings();
    const { isTablet } = useDevice();
    const hasCategories = categories.length > 0;
    const HeadingTag = size === 'small' ? 'h3' : 'h2';
    const shouldShowSubtitle = isTablet ? true : size !== 'small';

    return (
        <div
            className={classNames(styles.container, {
                [styles.small]: size === 'small',
                [styles.medium]: size === 'medium',
                [styles.big]: size === 'big',
            })}
        >
            <Link href={`/${story.slug}`} locale={false} passHref>
                <a className={classNames(styles.imageWrapper, 'dark:border-gray-400')}>
                    <StoryImage
                        story={story}
                        size={size}
                        className={styles.image}
                        placeholderClassName={styles.placeholder}
                    />
                </a>
            </Link>
            <div className={styles.content}>
                {hasCategories && (
                    <div className={styles.categories}>
                        <CategoriesList
                            categories={categories}
                            showAllCategories={size !== 'small'}
                            isStatic
                        />
                    </div>
                )}

                <HeadingTag
                    className={classNames(styles.title, {
                        [styles.noCategories]: !hasCategories,
                        [styles.noDate]: !showDate,
                        [styles.noDateAndCategories]: !hasCategories && !showDate,
                        [styles.extendedTitle]: size !== 'small' && !subtitle.length,
                    })}
                >
                    <Link href={`/${story.slug}`} locale={false} passHref>
                        <a
                            className={classNames(
                                styles.titleLink,
                                'dark:focus:text-gray-400 dark:hover:text-gray-400',
                            )}
                        >
                            {title}
                        </a>
                    </Link>
                </HeadingTag>

                {subtitle && showSubtitle && shouldShowSubtitle && (
                    <p className={styles.subtitle}>
                        <Link href={`/${story.slug}`} locale={false} passHref>
                            <a className={styles.subtitleLink}>{subtitle}</a>
                        </Link>
                    </p>
                )}

                {showDate && (
                    <p className={styles.date}>
                        <StoryPublicationDate story={story} />
                    </p>
                )}
            </div>
        </div>
    );
}

export default StoryCard;
