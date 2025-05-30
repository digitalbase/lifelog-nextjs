import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/TailwindSpotlight/Container';
import SocialLink from '@/components/TailwindSpotlight/Extracted/SocialLink';
import {
    GitHubIcon,
    LinkedInIcon,
    RssFeedIcon,
} from '@/components/TailwindSpotlight/SocialIcons';
import portraitImage from 'public/images/avatar.jpeg';
import SignalIcon from '@heroicons/react/20/solid/SignalIcon';
import {UserPlusIcon} from "@heroicons/react/20/solid";

export const metadata = {
    title: 'About me - Gijs Nelissen',
    description: 'Husband, Fatherx3, Co-Founder of Prezly.com and amateur gardener.',
};
export default function About() {
    return (
        <Container className="mt-16 sm:mt-32">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                <div className="lg:pl-20">
                    <div className="max-w-xs px-2.5 lg:max-w-none">
                        <Image
                            src={portraitImage}
                            alt=""
                            className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                        />
                    </div>
                </div>
                <div className="lg:order-first lg:row-span-2">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                        Hi. I&apos;m Gijs.
                    </h1>
                    <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                        <p>
                            So my name is Gijs Nelissen. Recently{' '}
                            <Link href="/moving-to-spain" className="hyperlink">
                                moved to Spain
                            </Link>{' '}
                            after living in Leuven, Belgium for most of my life together with
                            Annelies who I proudly call <i>my wife</i> and our three kids Marcel, Lucie and Robbert.
                        </p>
                        <p>
                            Most of my time goes into being a parent and co-founder of{' '}
                            <Link href="https://www.prezly.com" className="hyperlink">
                                Prezly.com
                            </Link>
                            . For the business that means being involved in most aspects of the company
                            where my attention is split between product and marketing.
                        </p>
                        <p>
                            In the time I have left I spend way too much time in front of my
                            computer, do urban gardening, and I am learning how to become an amateur
                            wood-worker.
                        </p>
                        <p>
                            I use this blog (
                            <Link href="/new-blog-theme" className="hyperlink">
                                based on a TailwindUI template
                            </Link>
                            ) to practice my writing skills and share ideas or failures. Topics
                            include product-management, company culture & hiring, tech topics and
                            maybe sometimes about my personal life.
                        </p>

                        <p>Best way to reach me is <Link className="hyperlink" href="https://signal.me/#eu/jUipESdd4n-U_EV9KxKOwMkWA4-5pWc25kbsEUIDn6uRly29l7VH5J4bCijXnTDj">on Signal</Link>.</p>
                    </div>
                </div>
                <div className="lg:pl-20">
                    <ul role="list">
                        <SocialLink href="/feed.xml" icon={RssFeedIcon}>
                            RSS Feed
                        </SocialLink>
                        <SocialLink
                            href="https://nosta.me/npub132ns73pnz2w6mdcnxzkgna3t2dx25gq2nulwxjdq7jj4jvrn6xnqup8cn4?utm_source=asknostr.site"
                            icon={UserPlusIcon}
                            className="mt-4"
                        >
                            Follow on Nostr
                        </SocialLink>
                        <SocialLink
                            href="https://github.com/digitalbase"
                            icon={GitHubIcon}
                            className="mt-4"
                        >
                            Follow on GitHub
                        </SocialLink>
                        <SocialLink
                            href="https://www.linkedin.com/in/gijsnelissen/"
                            icon={LinkedInIcon}
                            className="mt-4"
                        >
                            Connect on LinkedIn
                        </SocialLink>
                        <SocialLink
                            className="mt-4"
                            href="https://signal.me/#eu/jUipESdd4n-U_EV9KxKOwMkWA4-5pWc25kbsEUIDn6uRly29l7VH5J4bCijXnTDj"
                            icon={SignalIcon}
                        >
                            Message on Signal
                        </SocialLink>
                    </ul>
                </div>
            </div>
        </Container>
    );
}
