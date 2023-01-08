import { HashtagIcon } from '@heroicons/react/solid';
import { Alignment, HeadingNode } from '@prezly/story-content-format';
import classNames from 'clsx';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import { slugifyNodeText } from '@/utils/slugifyNodeText';

interface Props {
    node: HeadingNode;
    children?: ReactNode;
}

export function Heading({ node, children }: Props) {
    // When components are server side rendered from nextjs /api `useRouter` is unavailable
    // Currently it is a case for algolia indexation webhooks
    // That's a reason why we need to render share icon link conditionally
    const router = useRouter();
    const id = slugifyNodeText(node);

    const className = classNames('group -ml-6 pl-6', {
        'text-left': node.align === Alignment.LEFT,
        'text-center': node.align === Alignment.CENTER,
        'text-right': node.align === Alignment.RIGHT,
    });

    if (node.type === HeadingNode.Type.HEADING_ONE) {
        return (
            <h2 className={className} id={id}>
                {children}
                {router && (
                    <a
                        href={`${router.asPath}#${id}`}
                        className="hidden group-hover:block -ml-6 float-left mt-1"
                    >
                        <HashtagIcon className="w-5 h-5 " />
                    </a>
                )}
            </h2>
        );
    }

    return (
        <h3 className={className} id={id}>
            {router && (
                <a
                    href={`${router.asPath}#${id}`}
                    className="hidden group-hover:block -ml-6 float-left mt-1"
                >
                    <HashtagIcon className="w-5 h-5" />
                </a>
            )}
            {children}
        </h3>
    );
}
