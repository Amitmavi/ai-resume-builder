import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';  // Adjust the path if needed
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'; 
import SignInPage from './auth/sign-in'; 
import Home from './home';
import Dashboard from './dashboard';
import { ClerkProvider } from '@clerk/clerk-react';
import EditResume from './dashboard/resume/[resumeId]';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const router = createBrowserRouter([
  {
    
    element: <App/>,
    children:[
      {
        path:'/dashboard',
        element:<Dashboard/>
      },
      {
        path:'/dashboard/resume/:resumeId/edit',
        element:<EditResume/>
      }
    ]
  },
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/auth/sign-in',
    element:<SignInPage/>
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
