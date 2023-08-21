import Rss from "rss";
import {PrezlyApi} from "@/lib/utils/PrezlyApi";
import FeedRenderer from "@/components/FeedRenderer";
import {NextRequest} from "next/server";

async function getStories() {
    const api = new PrezlyApi(
        process.env.PREZLY_ACCESS_TOKEN ?? '',
        process.env.PREZLY_NEWSROOM_UUID ?? '',
        process.env.PREZLY_THEME_UUID ?? '',
    );
    const { stories } = await api.getStories({ pageSize: 30, include: ['thumbnail_image', 'content'] });

    return stories;
}

async function getStoriesForCategory(slug) {
    const api = new PrezlyApi(
        process.env.PREZLY_ACCESS_TOKEN ?? '',
        process.env.PREZLY_NEWSROOM_UUID ?? '',
        process.env.PREZLY_THEME_UUID ?? '',
    );

    const category = await api.getCategoryBySlug(slug);

    if (!category) return [];

    const { stories } = await api.getStoriesFromCategory(category, {
        pageSize: 30,
        include: ['thumbnail_image', 'content'],
    });

    return stories;
}

const generateRssFeed = async ( category ) => {

    try {
        const { renderToString } = await import('react-dom/server')

        const stories = category ? await getStoriesForCategory(category) : await getStories();

        const feed = new Rss({
            title: "Gijs Nelissen / Lifelog - All blog posts",
            description: "All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.",
            site_url: `${process.env.NEXT_PUBLIC_URL}`,
            feed_url: `${process.env.NEXT_PUBLIC_URL}/rss.xml`,
        });

        stories.forEach((story) => {
            const nodes = JSON.parse(story.content);

            feed.item({
                title: story.title,
                description: story.summary,
                url: `${process.env.NEXT_PUBLIC_URL}/${story.slug}`,
                date: new Date(story.published_at ?? ''),
                //content: renderToString(<FeedRenderer nodes={nodes} />),
            });
        });

        return feed.xml();
    } catch (error) {
        // Handle error appropriately (e.g., log, return an error message, etc.)
        console.error("Error generating RSS feed:", error);
        return null;
    }
};

export async function GET(req : NextRequest) {
    const url = new URL(req.url)
    const category = url.searchParams.get("category") ?? null
    const feedXml = await generateRssFeed(category);

    if (feedXml) {
        return new Response(feedXml, {
            headers: {
                "Content-Type": "application/xml",
            },
        });
    } else {
        return new Response("Error generating RSS feed.", { status: 500 });
    }
}