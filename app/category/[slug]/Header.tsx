import type { Category } from '@prezly/sdk';
import classNames from 'clsx';

type Props = {
    category: Category;
    className?: string;
};

export default function Header({ category, className }: Props) {
    const { display_name, display_description } = category;

    return (
        <header className={classNames('max-w-2xl mb-12', className)}>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                {display_name}
            </h1>
            {display_description && (
                <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                    {display_description}
                </p>
            )}
        </header>
    );
}
