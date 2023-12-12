import { translations } from '@prezly/theme-kit-nextjs';
import classNames from 'classnames';


import styles from './DownloadLink.module.scss';

interface Props {
    className: string;
}

export function DownloadLink({ className }: Props) {
    return (
        <div className={classNames(styles.link, className)}>
            <>{translations.actions.download}</>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
                <path
                    d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width={16}
                    height={16}
                    className={styles.icon}
                />
            </svg>
        </div>
    );
}
