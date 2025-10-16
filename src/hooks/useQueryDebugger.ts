import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useQueryDebugger = (enabled: boolean = true) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;

    const logQueryCache = () => {
      const cache = queryClient.getQueryCache();
      const queries = cache.getAll();

      console.group('🔍 React Query Cache Debug');
      queries.forEach((query: any) => {
        const { queryKey, state } = query;
        console.log(`📊 Query: ${JSON.stringify(queryKey)}`);
        console.log(`  Status: ${state.status}`);
        console.log(`  Data: `, state.data);
        console.log(`  Error: `, state.error);
        console.log(
          `  Last Updated: `,
          new Date(state.dataUpdatedAt).toLocaleTimeString(),
        );
      });
      console.groupEnd();
    };

    // Global query debugger functions
    (global as any).debugQueries = logQueryCache;
    (global as any).invalidateQuery = (queryKey: any) => {
      queryClient.invalidateQueries({ queryKey });
      console.log(`🔄 Invalidated query:`, queryKey);
    };
    (global as any).getQueryData = (queryKey: any) => {
      const data = queryClient.getQueryData(queryKey);
      console.log(`📋 Query data for ${JSON.stringify(queryKey)}:`, data);
      return data;
    };

    console.log('🚀 Query Debugger Ready! Use these in console:');
    console.log('  debugQueries() - Show all queries');
    console.log('  invalidateQuery(["get", "/users/{id}"]) - Invalidate query');
    console.log('  getQueryData(["get", "/users/{id}"]) - Get query data');
  }, [enabled, queryClient]);
};
