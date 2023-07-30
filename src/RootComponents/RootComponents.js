import Navigation from '../components/Navigations'
import { Outlet } from 'react-router-dom';

const RootComponent = () => {
  return (
    <>
    <Navigation/>
    <Outlet/>
    </>
  )
}

export default RootComponent;
