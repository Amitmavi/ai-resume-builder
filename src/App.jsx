import { useState } from 'react';
import './App.css';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Header from './components/custom/header';

function App() {
  const [count, setCount] = useState(0);
  const { user, isLoaded, isSignedIn } = useUser();

  // Redirect to sign-in page if user is not signed in but the auth state is loaded
  if (!isSignedIn && isLoaded) {
    return <Navigate to='/auth/sign-in' />;
  }

  return (
    <div>
      {/* Render the Header component */}
      <Header />

      {/* Render the children components for the current route */}
      <Outlet />
    </div>
  );
}

export default App;
