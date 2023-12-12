import type { PropsWithChildren } from 'react';
import {BookmarkNode} from "@prezly/content-format";

interface Props {
    node: BookmarkNode;
}

// @ts-ignore
export function RssBookmark({ node, children }: PropsWithChildren<Props>) {
    return (
        <p>
            <a href={node.url}>{node.oembed.title}</a>
        </p>
    );
}
