import { Alignment, ListNode } from '@prezly/story-content-format';
import classNames from 'clsx';
import type { PropsWithChildren } from 'react';

import styles from './styles.module.scss';

interface Props {
    node: ListNode;
}

export function List({ node, children }: PropsWithChildren<Props>) {
    const className = classNames({
        [styles.numberedList]: node.type === ListNode.Type.NUMBERED,
        [styles.orderedList]: node.type === ListNode.Type.BULLETED,
        'text-left': node.align === Alignment.LEFT,
        'text-center': node.align === Alignment.CENTER,
        'text-right': node.align === Alignment.RIGHT,
    });

    if (node.type === ListNode.Type.NUMBERED) {
        return <ol className={className}>{children}</ol>;
    }

    return <ul className={className}>{children}</ul>;
}

export function ListItem({ children }: PropsWithChildren<{}>) {
    return <li className={styles.listItem}>{children}</li>;
}

export function ListItemText({ children }: PropsWithChildren<{}>) {
    return <>{children}</>;
}
