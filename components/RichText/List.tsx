import { Alignment, ListNode } from '@prezly/story-content-format';
import classNames from 'clsx';
import type { PropsWithChildren } from 'react';

interface Props {
    node: ListNode;
}

export function List({ node, children }: PropsWithChildren<Props>) {
    const className = classNames({
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
    return <li>{children}</li>;
}

export function ListItemText({ children }: PropsWithChildren<{}>) {
    return <>{children}</>;
}
