import type { TranslatedCategory} from '@prezly/sdk';
import classNames from 'clsx';

type Props = {
    category: TranslatedCategory;
    className?: string;
};

export default function Header({ category, className }: Props) {
    const { name, description } = category;

    return (
        <header className={classNames('max-w-2xl mb-12', className)}>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                {name}
            </h1>
            {description && (
                <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                    {description}
                </p>
            )}
        </header>
    );
}
