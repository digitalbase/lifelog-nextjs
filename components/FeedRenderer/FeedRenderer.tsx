import { Component, Renderer } from '@prezly/content-renderer-react-js';
import type { Node } from '@prezly/story-content-format';
import {
    BookmarkNode,
    GalleryNode,
    HeadingNode,
    ImageNode,
    ParagraphNode, StoryBookmarkNode,
} from '@prezly/story-content-format';



import { Heading } from '@/components/RichText';

import { RssGallery, RssImage } from './components';
import {OverwrittenParagraph} from "@/components/FeedRenderer/components/OverwrittenParagraph";
import {EmptyNode} from "@/components/FeedRenderer/EmptyNode";
import isStoryBookmarkNode = StoryBookmarkNode.isStoryBookmarkNode;
import isBookmarkNode = BookmarkNode.isBookmarkNode;

interface Props {
    nodes: Node | Node[];
}

export default function FeedRenderer({ nodes }: Props) {
    console.log(nodes);
    return <>test</>
    return (
        <Renderer nodes={nodes} defaultComponents>
            {/* <Component match={AttachmentNode.isAttachmentNode} component={NoRender} /> */}
            {/* <Component match={ContactNode.isContactNode} component={ContactCard} /> */}
            <Component match={GalleryNode.isGalleryNode} component={RssGallery} />
            <Component match={HeadingNode.isHeadingNode} component={Heading} />
            {/* <Component match={HtmlNode.isHtmlNode} component={Html} /> */}
            <Component match={ImageNode.isImageNode} component={RssImage} />
            {/* <Component match={LinkNode.isLinkNode} component={Link} /> */}
            {/* <Component match={ListNode.isListNode} component={List} /> */}
            {/* <Component match={ListItemNode.isListItemNode} component={ListItem} /> */}
            {/* <Component match={ListItemTextNode.isListItemTextNode} component={ListItemText} /> */}
            <Component match={ParagraphNode.isParagraphNode} component={OverwrittenParagraph} />
            {/* <Component match={QuoteNode.isQuoteNode} component={Quote} /> */}
            <Component
                match={isStoryBookmarkNode}
                component={EmptyNode}
            />
            <Component
                match={isBookmarkNode}
                component={EmptyNode}
            />
        </Renderer>
    );
}