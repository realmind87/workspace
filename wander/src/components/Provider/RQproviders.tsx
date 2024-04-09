'use client'

import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { useState } from 'react';

export default function Providers({ children } : { children : React.ReactNode }) {
    const [client] = useState(
        new QueryClient({
            defaultOptions: {  // react-query 전역 설정
                queries: {
                    refetchOnWindowFocus: false,
                    retryOnMount: true,
                    refetchOnReconnect: false,
                    retry: false,
                },
            },
        })
    );
    
    return (
        <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local'} />
        </QueryClientProvider>
    )
}