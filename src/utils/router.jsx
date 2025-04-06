import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Details from "../routes/Details.jsx";
import { Add } from "../Add.jsx";
import EditForm from "../components/EditForm.jsx";  

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/add',
    element: <Add />
  },
  {
    path: '/contact/view/:id',
    element: <Details />  
  },
  {
    path: '/contact/edit/:id',  
    element: <EditForm />  
  }
]);

export default router;
