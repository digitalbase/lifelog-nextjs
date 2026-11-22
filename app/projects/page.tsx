import Image from 'next/image';

import { SimpleLayout } from '@/components/TailwindSpotlight/SimpleLayout';
import asknostrScreenshot from 'public/images/projects/asknostr.png';
import prezlyScreenshot from 'public/images/projects/prezly.webp';

export const metadata = {
    alternates: { canonical: '/projects' },
    title: 'Projects',
    description: 'Projects by Gijs Nelissen, including Prezly, AskNostr, and tools for Omarchy.',
};

const omarchyProjects = [
    {
        name: 'Tailscale Services',
        href: 'https://omarchy.digitalbase.tools/tailscale-services/',
        description: 'Find and open your tailnet’s web services from your Omarchy bar.',
    },
    {
        name: 'Omarchy Hyper',
        href: 'https://github.com/digitalbase/omarchy-hyper',
        description: 'Use Caps Lock to open a panel of app shortcuts.',
    },
    {
        name: 'OpenRouter Plus',
        href: 'https://github.com/digitalbase/omarchy-openrouter-plus-improved',
        description: 'Check your OpenRouter balance and usage from your Omarchy bar.',
    },
    {
        name: 't3rmes',
        href: 'https://github.com/digitalbase/t3rmes',
        description: 'A desktop client for Hermes Agent.',
    },
];

export default function Projects() {
    return (
        <SimpleLayout title="Projects" intro="What I’m building, from Prezly to side projects.">
            <div className="space-y-14 text-base text-zinc-600 dark:text-zinc-400">
                <section aria-labelledby="prezly">
                    <h2
                        id="prezly"
                        className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100"
                    >
                        Prezly
                    </h2>
                    <p className="mt-3 max-w-2xl">
                        I co-founded Prezly and spend most of my time there working on the product.
                        It gives PR teams and agencies a place to publish stories in branded
                        newsrooms, manage media contacts, send pitches, and track coverage.
                    </p>
                    <p className="mt-4">
                        <a className="hyperlink" href="https://www.prezly.com/">
                            Visit Prezly
                        </a>
                    </p>
                    <Image
                        src={prezlyScreenshot}
                        alt="Prezly’s story editor alongside publishing settings and an email campaign report"
                        sizes="(min-width: 1248px) 1024px, (min-width: 1024px) calc(100vw - 224px), (min-width: 800px) 672px, (min-width: 640px) calc(100vw - 128px), calc(100vw - 32px)"
                        className="mt-6 h-auto w-full rounded-2xl bg-zinc-100 ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-white/10"
                    />
                </section>

                <section
                    aria-labelledby="asknostr"
                    className="border-t border-zinc-100 pt-10 dark:border-zinc-700/40"
                >
                    <div className="grid items-start gap-6 md:grid-cols-2 lg:gap-12">
                        <div>
                            <h2
                                id="asknostr"
                                className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100"
                            >
                                AskNostr
                            </h2>
                            <p className="mt-3">
                                AskNostr is a Q&amp;A site powered by{' '}
                                <a className="hyperlink" href="https://nostr.org/">
                                    Nostr
                                </a>
                                , a decentralized social protocol. It’s a place to ask questions
                                and share answers with the Nostr community.
                            </p>
                            <p className="mt-4">
                                <a className="hyperlink" href="https://asknostr.site/">
                                    Visit AskNostr
                                </a>
                            </p>
                        </div>
                        <div className="rounded-2xl bg-zinc-100 p-5 ring-1 ring-zinc-900/5 sm:p-6 dark:bg-zinc-800 dark:ring-white/10">
                            <Image
                                src={asknostrScreenshot}
                                alt="AskNostr homepage showing community activity and a featured question"
                                sizes="(min-width: 1248px) 440px, (min-width: 1024px) calc((100vw - 272px) / 2 - 48px), (min-width: 800px) 276px, (min-width: 768px) calc((100vw - 152px) / 2 - 48px), (min-width: 640px) calc(100vw - 176px), calc(100vw - 72px)"
                                className="h-auto w-full rounded-lg shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/10"
                            />
                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby="omarchy"
                    className="border-t border-zinc-100 pt-10 dark:border-zinc-700/40"
                >
                    <h2
                        id="omarchy"
                        className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100"
                    >
                        Omarchy tools
                    </h2>
                    <p className="mt-3 max-w-2xl">
                        Plugins and desktop tools I’ve built for my{' '}
                        <a className="hyperlink" href="https://omarchy.org/">
                            Omarchy
                        </a>{' '}
                        Linux setup.
                    </p>
                    <ul role="list" className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {omarchyProjects.map(({ name, href, description }) => (
                            <li
                                key={name}
                                className="rounded-2xl border border-zinc-100 p-5 dark:border-zinc-700/40"
                            >
                                <h3 className="font-semibold">
                                    <a className="hyperlink" href={href}>
                                        {name}
                                    </a>
                                </h3>
                                <p className="mt-2 text-sm">{description}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </SimpleLayout>
    );
}
