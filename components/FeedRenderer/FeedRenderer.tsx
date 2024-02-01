import {Component, Renderer, Elements} from '@prezly/content-renderer-react-js';
import type { Node } from '@prezly/story-content-format';
import {
    AttachmentNode, BookmarkNode,
    ButtonBlockNode, EmbedNode,
    GalleryNode,
    HeadingNode,
    ImageNode, VideoNode,
} from '@prezly/content-format';


import {EmptyNode} from "@/components/FeedRenderer/EmptyNode";
import styles from "@/components/ContentRenderer/ContentRenderer.module.scss";
import {RssBookmark} from "@/components/FeedRenderer/components/RssBookmark";
import {RssEmbed} from "@/components/FeedRenderer/components/RssEmbed";
import {RssGallery} from "@/components/FeedRenderer/components/RssGallery";
import {RssImage} from "@/components/FeedRenderer/components/RssImage";
import {RssHeading} from "@/components/FeedRenderer/RssHeading";

interface Props {
    nodes: Node | Node[];
}

export default function FeedRenderer({ nodes }: Props) {
    // const filteredChildren = (nodes.children.filter((node) => node.type === 'bookmark'));
    // const filteredNodes = { ...nodes, children: nodes.children.slice(0,100)};

    return (
        <div className={styles.renderer}>
            <Renderer nodes={nodes} defaultComponents={true} defaultFallback={Elements.Unknown}>
                <Component match={AttachmentNode.isAttachmentNode} component={EmptyNode} />
                <Component
                    match={ButtonBlockNode.isButtonBlockNode}
                    component={EmptyNode}
                />
                <Component match={BookmarkNode.isBookmarkNode} component={RssBookmark}/>
                {/*<Component match={ContactNode.isContactNode} component={EmptyNode} />*/}
                {/*<Component match={DividerNode.isDividerNode} component={EmptyNode} />*/}
                {/*<Component match={DocumentNode.isDocumentNode} component={EmptyNode} />*/}
                <Component match={EmbedNode.isEmbedNode} component={RssEmbed} />
                <Component match={GalleryNode.isGalleryNode} component={RssGallery} />
                {/*// @ts-ignore*/}
                <Component match={HeadingNode.isHeadingNode} component={RssHeading} />
                {/*<Component match={HeadingNode.isSubtitleHeadingNode} component={EmptyNode} />*/}
                {/*<Component match={HeadingNode.isHeadingNode} component={EmptyNode} />*/}
                {/*<Component match={HtmlNode.isHtmlNode} component={EmptyNode} />*/}
                {/*// @ts-ignore*/}
                <Component match={ImageNode.isImageNode} component={RssImage} />
                {/*<Component match={LinkNode.isLinkNode} component={EmptyNode} />*/}
                {/*<Component match={ListNode.isListNode} component={EmptyNode} />*/}
                {/*<Component match={ListItemNode.isListItemNode} component={EmptyNode} />*/}
                {/*<Component match={ListItemTextNode.isListItemTextNode} component={EmptyNode} />*/}
                {/*<Component match={ParagraphNode.isParagraphNode} component={EmptyNode} />*/}
                {/*<Component match={PlaceholderNode.isPlaceholderNode} component={EmptyNode} />*/}
                {/*<Component match={QuoteNode.isQuoteNode} component={EmptyNode} />*/}
                {/*<Component match={VariableNode.isVariableNode} component={EmptyNode} />*/}
                <Component match={VideoNode.isVideoNode} component={EmptyNode} />
                {/*<Component match={TableNode.isTableNode} component={EmptyNode} />*/}
                {/*<Component match={TableRowNode.isTableRowNode} component={EmptyNode} />*/}
                {/*<Component match={TableCellNode.isTableCellNode} component={EmptyNode} />*/}
            </Renderer>
        </div>
    );
}