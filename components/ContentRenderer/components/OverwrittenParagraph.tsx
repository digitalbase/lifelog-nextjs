import { Alignment } from '@prezly/story-content-format';
import type { ParagraphNode } from '@prezly/story-content-format';
import classNames from 'clsx';
import type { ReactNode } from 'react';
import GithubSnippet from "@/components/GithubSnippet";

interface Props {
    node: ParagraphNode;
    children?: ReactNode;
}

function isInfoBox(node: ParagraphNode) {
    // @ts-ignore
    if (node && node.children[0].text) {
        // @ts-ignore
        const text = node.children[0].text as string;
        if (text.substring(0, 1) === 'ℹ' || text.substring(0, 1) === '💡') {
            return true;
        }
    }
    return false;
}

function isGitHubSnippet(node: ParagraphNode) {
    // @ts-ignore
    if (node && node.children[0].text) {
        // @ts-ignore
        const text = node.children[0].text as string;
        if (text.substring(0, 19) === 'https://github.com/') {
            return true;
        }
    }
    return false;
}

export function OverwrittenParagraph({ node, children }: Props) {
    if (isGitHubSnippet(node)) {
        // @ts-ignore
        return <GithubSnippet src={node.children[0].text as string} />;
    }

    if (isInfoBox(node)) {
        return (
            <div className="rounded-md bg-gray-200 p-4 sm:p-3 dark:bg-gray-800 dark:text-white">
                <p
                    className={classNames('m-0 p-2', {
                        'text-left': node.align === Alignment.LEFT,
                        'text-center': node.align === Alignment.CENTER,
                        'text-right': node.align === Alignment.RIGHT,
                    })}
                >
                    {children}
                </p>
            </div>
        );
    }

    return (
        <p
            className={classNames({
                'text-left': node.align === Alignment.LEFT,
                'text-center': node.align === Alignment.CENTER,
                'text-right': node.align === Alignment.RIGHT,
            })}
        >
            {children}
        </p>
    );
}