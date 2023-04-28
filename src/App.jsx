import './App.css';
import {createHashRouter,RouterProvider} from "react-router-dom";
import Registration from './Components/Registration/Registration';
import Login from './Components/Login/Login';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import ProtectedRoot from './Components/ProtectedRoot/ProtectedRoot';
import InverseProtectedRoot from './Components/InverseProtectedRoot/InverseProtectedRoot';


const routers = createHashRouter([{
  path:"/", element:<Layout/> , children:[
    {path:"/login",element:<InverseProtectedRoot><Login/></InverseProtectedRoot>},
    {index:true,element:<InverseProtectedRoot><Registration/></InverseProtectedRoot>},
    {path:"*",element:<InverseProtectedRoot><Registration/></InverseProtectedRoot>},
    {path:"/home",element:<ProtectedRoot><Home/></ProtectedRoot>},
  ]
}]) 

function App() {
  return (
    <>
    <RouterProvider router={routers}/>
    </>
  );
}

export default App;
