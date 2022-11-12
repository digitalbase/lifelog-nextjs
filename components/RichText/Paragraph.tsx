import { Alignment } from '@prezly/story-content-format';
import type { ParagraphNode } from '@prezly/story-content-format';
import classNames from 'clsx';
import type { ReactNode } from 'react';

import styles from './styles.module.scss';

interface Props {
    node: ParagraphNode;
    children?: ReactNode;
}

export function Paragraph({ node, children }: Props) {
    return (
        <p
            className={classNames(styles.paragraph, {
                'text-left': node.align === Alignment.LEFT,
                'text-center': node.align === Alignment.CENTER,
                'text-right': node.align === Alignment.RIGHT,
            })}
        >
            {children}
        </p>
    );
}
