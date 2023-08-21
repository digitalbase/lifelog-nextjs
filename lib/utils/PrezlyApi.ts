import { ApiError, createPrezlyClient, SortOrder, Story } from '@prezly/sdk';
import type {
    Category,
    Newsroom,
    NewsroomLanguageSettings,
    PrezlyClient,
    Stories,
} from '@prezly/sdk';

import { toPaginationParams } from '@/lib/utils/toPaginationParams';

import {
    getChronologicalSortOrder,
    getContactsQuery,
    getSlugQuery,
    getStoriesQuery,
} from './queries';

const CATEGORIES_SORT_ORDER = '+order';
const DEFAULT_SORT_ORDER = SortOrder.Direction.DESC;

const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_FORBIDDEN = 403;
const ERROR_CODE_GONE = 410;

interface GetStoriesOptions {
    page?: number;
    pageSize?: number;
    order?: `${SortOrder.Direction}`;
    pinning?: boolean;
    include?: (keyof Story.ExtraFields)[];
    localeCode?: string;
    /**
     * When set to `true`, the result for the first page will include one extra story to place as highlighted story.
     * This will offset each subsequent page by 1 story to account for that.
     */
    withHighlightedStory?: boolean;
    /**
     * Additional filter to apply to the story query. Note that it will be inserted into the root `$and` query operator along with default filters.
     */
    filterQuery?: Object;
}

export class PrezlyApi {
    protected readonly sdk: PrezlyClient;

    protected readonly newsroomUuid: Newsroom['uuid'];

    protected readonly themeUuid: string | undefined;

    constructor(accessToken: string, newsroomUuid: Newsroom['uuid'], themeUuid?: string) {
        const baseUrl = process.env.API_BASE_URL_OVERRIDE ?? undefined;
        this.sdk = createPrezlyClient({
            accessToken,
            baseUrl,
        });
        this.newsroomUuid = newsroomUuid;
        this.themeUuid = themeUuid;
    }

    async getStory(uuid: string, formats = [Story.FormatVersion.SLATEJS_V4]) {
        try {
            const story = await this.sdk.stories.get(uuid, {
                formats,
            });
            return story;
        } catch (error) {
            if (
                error instanceof ApiError &&
                (error.status === ERROR_CODE_NOT_FOUND ||
                    error.status === ERROR_CODE_GONE ||
                    error.status === ERROR_CODE_FORBIDDEN)
            ) {
                return null;
            }
            throw error;
        }
    }

    async getNewsroom() {
        return this.sdk.newsrooms.get(this.newsroomUuid);
    }

    async getNewsroomContacts() {
        return this.sdk.newsroomContacts.search(this.newsroomUuid, {
            query: JSON.stringify(getContactsQuery()),
        });
    }

    async getNewsroomLanguages(): Promise<NewsroomLanguageSettings[]> {
        return (await this.sdk.newsroomLanguages.list(this.newsroomUuid)).languages;
    }

    /**
     * Note: this method returns ALL stories from the newsroom. It's intended to be used for sitemaps and not to display actual content.
     */
    async getAllStories({
        order = DEFAULT_SORT_ORDER,
        pinning = false,
    }: Pick<GetStoriesOptions, 'order' | 'pinning'> = {}) {
        const sortOrder = getChronologicalSortOrder(order, pinning);
        const newsroom = await this.getNewsroom();
        const query = JSON.stringify(getStoriesQuery(newsroom.uuid));
        const maxStories = newsroom.stories_number;
        const chunkSize = 200;

        const pages = Math.ceil(maxStories / chunkSize);
        const storiesPromises = Array.from({ length: pages }, (_, pageIndex) =>
            this.searchStories({
                limit: chunkSize,
                sortOrder,
                query,
                offset: pageIndex * chunkSize,
            }),
        );

        const stories = (await Promise.all(storiesPromises)).flatMap(
            (response) => response.stories,
        );

        return stories;
    }

    async getStories({
        page = undefined,
        pageSize = 20,
        order = DEFAULT_SORT_ORDER,
        pinning = false,
        include,
        localeCode,
        withHighlightedStory,
        filterQuery,
    }: GetStoriesOptions = {}) {
        const sortOrder = getChronologicalSortOrder(order, pinning);
        const query = JSON.stringify(
            getStoriesQuery(this.newsroomUuid, undefined, localeCode, filterQuery),
        );

        const { offset, limit } = toPaginationParams({ page, pageSize, withHighlightedStory });

        const { stories, pagination } = await this.searchStories({
            limit,
            offset,
            sortOrder,
            query,
            include,
        });

        const storiesTotal = pagination.matched_records_number;

        return { stories, storiesTotal };
    }

    async getStoriesFromCategory(
        category: Category,
        {
            page = undefined,
            pageSize = 20,
            order = DEFAULT_SORT_ORDER,
            include,
            localeCode,
            filterQuery,
        }: Omit<GetStoriesOptions, 'pinning' | 'withHighlightedStory'> = {},
    ) {
        const sortOrder = getChronologicalSortOrder(order);
        const query = JSON.stringify(
            getStoriesQuery(this.newsroomUuid, category.id, localeCode, filterQuery),
        );

        const { offset, limit } = toPaginationParams({ page, pageSize });

        const { stories, pagination } = await this.searchStories({
            limit,
            offset,
            sortOrder,
            query,
            include,
        });

        const storiesTotal = pagination.matched_records_number;

        return { stories, storiesTotal };
    }

    async getStoryBySlug(slug: string, formats = [Story.FormatVersion.SLATEJS_V4]) {
        const query = JSON.stringify(getSlugQuery(this.newsroomUuid, slug));

        const { stories } = await this.searchStories({
            limit: 1,
            query,
            formats,
        });

        if (stories[0]) {
            return this.getStory(stories[0].uuid, formats);
        }

        return null;
    }

    async getCategories(): Promise<Category[]> {
        const categories = await this.sdk.newsroomCategories.list(this.newsroomUuid, {
            sortOrder: CATEGORIES_SORT_ORDER,
        });

        return Array.isArray(categories) ? categories : Object.values(categories);
    }

    async getCategoryBySlug(slug: string) {
        const categories = await this.getCategories();

        return categories.find((category) =>
            Object.values(category.i18n).some((t) => t.slug === slug),
        );
    }

    searchStories: Stories.Client['search'] = (options) => {
        const formats = options?.formats ?? [Story.FormatVersion.SLATEJS_V4];

        return this.sdk.stories.search({ ...options, formats });
    };
}
