'use client';

import type { Story } from '@prezly/sdk';
import type { VariableNode } from '@prezly/story-content-format';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

interface Props {
    node: VariableNode;
}

export function Variable({ node }: Props) {
    const variables = useVariables();

    // TODO: `PlaceholderNode` doesn't have correct types for `key` property
    if (node.key === 'publication.date' && variables['publication.date']) {
        return <></>
    }

    return null;
}

interface Context {
    [`publication.date`]: Story['published_at'];
}

const context = createContext<Context>({
    [`publication.date`]: null,
});

export function VariableContextProvider(props: { value: Context; children: ReactNode }) {
    return <context.Provider value={props.value}>{props.children}</context.Provider>;
}

function useVariables(): Context {
    return useContext(context);
}
