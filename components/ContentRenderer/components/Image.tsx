import { Elements } from '@prezly/content-renderer-react-js';
import type { ImageNode } from '@prezly/story-content-format';
import type { PropsWithChildren } from 'react';

interface Props {
    node: ImageNode;
}

export function Image({ node, children }: PropsWithChildren<Props>) {

    return (
        <Elements.Image node={node}>
            {children}
        </Elements.Image>
    );
}
