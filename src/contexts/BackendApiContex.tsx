import { createContext, ReactNode } from 'react';
import createClient, { OpenapiQueryClient } from 'openapi-react-query';
import { BACKEND_BASE_URL } from '@env';
import { paths } from 'src/schemes/openapi';

interface BackendApiProviderProps {
    children: ReactNode;
    backendApi: OpenapiQueryClient<paths>;
}


export const BackendApiContext = createContext<OpenapiQueryClient<paths>>(createClient({ baseUrl: BACKEND_BASE_URL } as any));

const BackendApiProvider = ({ children, backendApi }: BackendApiProviderProps) => {

    return (
        <BackendApiContext.Provider value={backendApi}>
            {children}
        </BackendApiContext.Provider>
    );
};

export default BackendApiProvider;
