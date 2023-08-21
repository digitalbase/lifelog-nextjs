import type { ReactNode } from 'react';

interface Props {
    node: any;
    children?: ReactNode;
}


export function EmptyNode({ node, children }: Props) {
    return <p>empty</p>
}