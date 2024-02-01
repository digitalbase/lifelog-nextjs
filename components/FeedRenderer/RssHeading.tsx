import { HeadingNode } from '@prezly/story-content-format';
import type { ReactNode } from 'react';

interface Props {
    node: HeadingNode;
    children?: ReactNode;
}

export function RssHeading({ node, children }: Props) {

    if (node.type === HeadingNode.Type.HEADING_ONE) {
        return (
            <h1>{children}</h1>
        );
    }

    return (
        <h2>{children}</h2>
    );
}
