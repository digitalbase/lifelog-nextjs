import type { PropsWithChildren } from 'react';
import { EmbedNode} from "@prezly/content-format";

interface Props {
    node: EmbedNode;
}

// @ts-ignore
export function RssEmbed({ node, children }: PropsWithChildren<Props>) {

    if (node.oembed.provider_name === 'Gist') {
        return (
            <p>
                <a href={node.url}>Github Gist: {node.oembed.title}</a>
            </p>
        );
    }
    return (
        <p>
            <a href={node.url}>{node.oembed.title}</a>
        </p>
    );
}
