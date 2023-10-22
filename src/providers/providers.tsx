import { HelmetProvider } from "react-helmet-async"
import { BrowserRouter } from 'react-router-dom';

interface AppProviderProps {
    children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {

    return (
        <HelmetProvider>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </HelmetProvider>
    )
}