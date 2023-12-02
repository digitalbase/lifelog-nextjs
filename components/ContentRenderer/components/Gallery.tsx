import { Elements } from '@prezly/content-renderer-react-js';
import type { GalleryNode } from '@prezly/story-content-format';

interface Props {
    node: GalleryNode;
}

export function Gallery({ node }: Props) {
    return (
        <Elements.Gallery node={node} />
    );
}
