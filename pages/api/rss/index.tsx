import type { ExtendedStory } from '@prezly/sdk';
import { StoryFormatVersion } from '@prezly/sdk';
import { getPrezlyApi } from '@prezly/theme-kit-nextjs';
import { Feed } from 'feed';
import type { NextApiRequest, NextApiResponse } from 'next';
import ReactDOMServer from 'react-dom/server';

import SlateFeedRenderer from '@/components/SlateFeedRenderer';

const feed = new Feed({
    copyright: 'All rights reserved 2022, Gijs Nelissen',
    title: 'Gijs Lifelog',
    description: 'About www.lifelog.be - Programming, Living in Spain, Running a Company',
    id: 'https://lifelog.be',
    link: 'https://lifelog.be/feed.xml',
    language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: 'https://lifelog.be/images/avatar.jpeg',
    favicon:
        'https://cdn.uc.assets.prezly.com/637bc5ad-53be-4b96-89ea-205d41211b66/-/preview/180x180/download.png',
    feedLinks: {
        rss: 'https://example.com/feed.xml',
        json: 'https://example.com/feed.json',
        atom: 'https://example.com/feed.atom',
    },
    author: {
        name: 'Gijs Nelissen',
        email: 'gijs@prezly.com',
        link: 'https://lifelog.be/about',
    },
    // updated: new Date(2013, 6, 14), // optional, default = today
});

function getStoryHtml(story: ExtendedStory): string {
    if (story.format_version === StoryFormatVersion.HTML) {
        return story.content as string;
    }

    if (story.format_version === StoryFormatVersion.SLATEJS) {
        return ReactDOMServer.renderToString(
            <SlateFeedRenderer nodes={JSON.parse(story.content as string)} />,
        );
    }

    return '';
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(404);
    }

    const { category, format } = req.query;
    const page = 1;
    const pageSize = 20;
    const localeCode = 'en';
    const api = getPrezlyApi();
    let apiResponse = null;

    if (category) {
        const categoryEntity = await api.getCategoryBySlug(category as string);
        if (categoryEntity) {
            apiResponse = await api.getStoriesFromCategory(categoryEntity, {
                page,
                pageSize,
                include: ['content'],
                localeCode,
            });
        }
    }

    if (!apiResponse) {
        apiResponse = await api.getStories({
            page,
            pageSize,
            include: ['content'],
            localeCode,
        });
    }

    try {
        apiResponse.stories.forEach((story) => {
            feed.addItem({
                title: story.title,
                id: `https://www.lifelog.be/${story.slug}`,
                link: `https://www.lifelog.be/${story.slug}`,
                date: new Date(story.published_at ?? ''),
                content: getStoryHtml(story as ExtendedStory),
            });
        });

        // set response content header to xml
        if (format === 'xml' || format === 'atom') {
            res.setHeader('Content-Type', 'text/xml');
        }

        if (format === 'json') {
            res.setHeader('Content-Type', 'application/json');
        }

        if (format === 'xml') res.status(200).send(feed.rss2());
        if (format === 'atom') res.status(200).send(feed.atom1());
        if (format === 'json') res.status(200).send(feed.json1());
    } catch (exception: unknown) {
        if (!(exception instanceof Error)) {
            throw exception;
        }

        res.status(500).json({});
    }
}
