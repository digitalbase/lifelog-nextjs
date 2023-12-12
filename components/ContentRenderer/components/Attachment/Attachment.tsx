
import { STORY_FILE, useAnalytics } from '@prezly/analytics-nextjs';
import type { AttachmentNode } from '@prezly/story-content-format';
import { UploadcareFile } from '@prezly/uploadcare';

import { DownloadLink } from './DownloadLink';
import { formatBytes } from './utils';

import styles from './Attachment.module.scss';

interface Props {
    node: AttachmentNode;
}

export function Attachment({ node }: Props) {
    const { file, description } = node;
    const { downloadUrl } = UploadcareFile.createFromPrezlyStoragePayload(file);
    const displayedName = description || file.filename;
    const fileExtension = file.filename.split('.').pop();
    const fileType = fileExtension?.toUpperCase();

    return (
        <a
            id={`attachment-${file.uuid}`}
            className={styles.container}
            href={downloadUrl}
        >
            <div className={styles.content}>
                <h4 className={styles.name}>{displayedName}</h4>
                <h5 className={styles.type}>
                    {fileType}
                    {fileType && ' - '}
                    {formatBytes(file.size)}
                </h5>
            </div>
            <DownloadLink className={styles.downloadLink} />
        </a>
    );
}
