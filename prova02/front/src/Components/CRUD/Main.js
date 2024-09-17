import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditarAluno from "./aluno/EditarAluno";
import CriarAluno from "./aluno/CriarAluno";
import ListarAluno from "./aluno/ListarAluno";

import Home from "./Home";

const router = createBrowserRouter(
    [
        {
            path:"/",
            element: <Home/>,
            children:[
                {
                    path:"aluno/listar",
                    element:<ListarAluno/>
                },
                {
                    path:"aluno/criar",
                    element:<CriarAluno/>
                },
                {
                    path:"aluno/editar/:id",
                    element:<EditarAluno/>
                }
            ]
        },
    ]
)

const Main = () => {
    return (
        <RouterProvider router={router}/>
    )
}

export default Main