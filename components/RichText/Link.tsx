import type { LinkNode } from '@prezly/story-content-format';
import type { ReactNode } from 'react';

interface Props {
    node: LinkNode;
    children?: ReactNode;
}

export function Link({ node, children }: Props) {
    const { href } = node;

    return (
        <a
            href={href}
            rel="noopener noreferrer"
            target={node.new_tab ? '_blank' : '_self'}
        >
            {children}
        </a>
    );
}
