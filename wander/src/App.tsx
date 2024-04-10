
import Router from './router'
import RQproviders from './components/provider/RQproviders'
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { useEffect } from 'react';
import {getPosts} from './api/posts'
import { AppProvider } from './components/provider/AppProvider';
import { CookiesProvider } from 'react-cookie';

function App() {
  
  return (
      <RQproviders>
        <CookiesProvider>
          <AppProvider>
              <Router />
          </AppProvider>
        </CookiesProvider>
      </RQproviders>
  );
}

export default App;
