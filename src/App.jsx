import React from 'react';
import {BrowserRouter, useRoutes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import appRoutes from './appRoutes.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import {ThemeProvider} from "./context/ThemeContext.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import {ToastProvider} from "./components/ToastManager.jsx";

const queryClient = new QueryClient();

function AppRoutes() {
    return useRoutes(appRoutes);
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ThemeProvider>
                    <BrowserRouter>
                        <ToastProvider/>
                        <ScrollToTop/>
                        <AppRoutes/>
                    </BrowserRouter>
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
