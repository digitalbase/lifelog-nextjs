import { UploadcareImage } from '@prezly/uploadcare-image';
import Image from 'next/image';

import { getStoryThumbnail } from '@/components/StoryImage/lib';
import { formatDateShort } from '@/utils/formatDate';

import type { StoryWithImage } from '../../../types';

import avatarImage from '@/public/images/avatar.jpeg';

interface StoryProps {
    story: StoryWithImage;
}

export default function StoryCard({ story }: StoryProps) {
    const image = getStoryThumbnail(story);

    if (!image) return '';

    return (
        <article key={story.id} className="relative isolate flex flex-col gap-8 lg:flex-row">
            <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                <UploadcareImage
                    imageDetails={image}
                    alt={story.title}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                />

                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            </div>
            <div>
                <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={story.published_at} className="text-gray-500">
                        {formatDateShort(story.published_at)}
                    </time>
                    {story.categories.length > 0 && (
                        <>
                            {story.categories.map((category) => (
                                <a
                                    href={`/category/${category.i18n.en.slug}`}
                                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                >
                                    {category.display_name}
                                </a>
                            ))}
                        </>
                    )}
                </div>
                <div className="group relative max-w-xl">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <a href={`/${story.slug}`}>
                            <span className="absolute inset-0" />
                            {story.title}
                        </a>
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600">{story.summary}</p>
                </div>
                <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                    <div className="relative flex items-center gap-x-4">
                        <Image
                            src={avatarImage}
                            alt=""
                            className="h-10 w-10 rounded-full bg-gray-50"
                        />
                        <div className="text-sm leading-6">
                            <p className="font-semibold text-gray-900">
                                <a href="/about">
                                    <span className="absolute inset-0" />
                                    Gijs Nelissen
                                </a>
                            </p>
                            <p className="text-gray-600">
                                <a href="https://www.twitter.com/digitalbase">@digitalbase</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
