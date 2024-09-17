import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CriarAluno from "../CRUD/Aluno/CriarAluno"
import EditarAluno from "../CRUD/Aluno/EditarAluno"
import ListarAluno from "../CRUD/Aluno/ListarAluno"

import Navbar from "./Navbar";
import Home from "./Home";

import Firebase from "./Utils/Firebase";
import FirebaseContext from "./Utils/FirebaseContext";
import ListarAlunosPorCurso from "../CRUD/Aluno/ListarAlunosPorCurso";

const Router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Navbar />,
            children: [
                {
                    path: "/aluno/criar",
                    element: <CriarAluno />
                },
                {
                    path: "/aluno/editar/:id",
                    element: <EditarAluno />
                },
                {
                    path: "/aluno/listar",
                    element: <ListarAluno />
                },
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/aluno/listarAlunosPorCurso",
                    element: <ListarAlunosPorCurso />
                }
            ]
        }
    ]
)

const Main = () => {
    return (
        <FirebaseContext.Provider value={new Firebase()}>
            <RouterProvider router={Router} />
        </FirebaseContext.Provider>
    )
}

export default Main