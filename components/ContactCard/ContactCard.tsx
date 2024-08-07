import classNames from 'clsx';
import type { ReactNode } from 'react';

import { useDevice } from '@/lib/hooks';

import type { Contact } from './types';
import { getSocialHandles } from './utils';

import styles from './ContactCard.module.scss';

interface Props {
    className?: string;
    contact: Contact;
    isCompact?: boolean;
    renderAvatar: ({ className }: { className: string }) => ReactNode;
}

function ContactCard({ className, contact, isCompact = false, renderAvatar }: Props) {
    const device = useDevice();
    const { name, description, company, email, phone, mobile, website } = contact;
    const { facebook, twitter } = getSocialHandles(contact);
    const subtitle = description && company ? `${description}, ${company}` : description;

    return (
        <div
            id={`contact-${contact.uuid}`}
            className={classNames(styles.container, className, {
                [styles.compact]: isCompact || device.isMobile,
            })}
        >
            {renderAvatar({ className: styles.avatar })}
            <div className={styles.content}>
                <h4 className={styles.name}>{name}</h4>
                {subtitle && <h5 className={styles.position}>{subtitle}</h5>}

                <div className={styles.links}>
                    {email && (
                        <a href={`mailto:${email}`} className={styles.link}>
                            <span className={styles.linkText}>{email}</span>
                        </a>
                    )}
                    {website && (
                        <a href={website} className={styles.link}>
                            <span className={styles.linkText}>{website}</span>
                        </a>
                    )}
                    {mobile && (
                        <a href={`tel:${mobile}`} className={styles.link}>
                            <span className={styles.linkText}>{mobile}</span>
                        </a>
                    )}
                    {phone && (
                        <a href={`tel:${phone}`} className={styles.link}>
                            <span className={styles.linkText}>{phone}</span>
                        </a>
                    )}
                    {twitter && (
                        <a href={`https://twitter.com/${twitter}`} className={styles.link}>
                            <span className={styles.linkText}>{`@${twitter}`}</span>
                        </a>
                    )}
                    {facebook && (
                        <a href={`https://facebook.com/${facebook}`} className={styles.link}>
                            <span className={styles.linkText}>{facebook}</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ContactCard;
