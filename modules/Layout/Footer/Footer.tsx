import classNames from 'clsx';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { InnerContainer, OuterContainer } from '@/components/TailwindSpotlight/Container';

interface NavLinkProps {
    href: string;
    className?: string;
    children: ReactNode;
}

function NavLink({ href, children, className }: NavLinkProps) {
    return (
        <Link
            href={href}
            className={classNames(
                className,
                'transition hover:text-rose-500 dark:hover:text-rose-400',
            )}
        >
            {children}
        </Link>
    );
}

export function Footer() {
    return (
        <footer className="mt-16 lg:mt-32">
            <OuterContainer>
                <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
                    <InnerContainer>
                        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                            <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                <NavLink href="/articles">All articles</NavLink>
                                <NavLink href="/about">About me</NavLink>
                                <NavLink href="/topics" className="hidden lg:block">
                                    Topics I write about
                                </NavLink>
                                <NavLink href="/how-i-built-this-blog" className="hidden lg:block">
                                    How I built this blog
                                </NavLink>
                                <NavLink href="/uses">Uses</NavLink>
                                <NavLink href="/feed.xml">RSS Feed</NavLink>
                                <NavLink href="https://www.twitter.com/digitalbase">
                                    Contact
                                </NavLink>
                            </div>
                            <p className="text-sm text-zinc-400 dark:text-zinc-500">
                                &copy; {new Date().getFullYear()}
                                {` `}
                                <span className="h-card">
                                    <a
                                        className="p-name u-url"
                                        rel="me"
                                        href="https://lifelog.be/about/"
                                    >
                                        Gijs Nelissen
                                    </a>
                                </span>
                            </p>
                        </div>
                    </InnerContainer>
                </div>
            </OuterContainer>
        </footer>
    );
}
