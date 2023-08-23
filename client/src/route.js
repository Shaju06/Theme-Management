import { Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn'
import Home from './components/Home'
import NoPageFound from './components/NoPageFound';
import PrivateRoute from './components/PrivateRoute';


const AppRoutes = () => {
    return (
        <>
        <Routes>
          <Route path="/" exact element={
          <PrivateRoute>
          <Home />
          </PrivateRoute>
          } />
        <Route path="/login"  element={<SignIn />} />
        
        <Route path="*" element={<NoPageFound />} />
      </Routes>
      </>
    )
}

export default AppRoutes