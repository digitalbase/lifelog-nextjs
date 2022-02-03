import type { LinkNode } from '@prezly/slate-types';
import type { ReactNode } from 'react';

import { STORY_LINK, useAnalytics } from '@/modules/analytics';

import styles from './styles.module.scss';

interface Props {
    node: LinkNode;
    children?: ReactNode;
}

export function Link({ node, children }: Props) {
    const { track } = useAnalytics();
    const { href } = node;

    function handleClick() {
        track(STORY_LINK.CLICK, { href });
    }

    return (
        <a
            className={styles.link}
            href={href}
            onClick={handleClick}
            rel="noopener noreferrer"
            target="_blank"
        >
            {children}
        </a>
    );
}
