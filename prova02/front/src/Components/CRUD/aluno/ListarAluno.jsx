import AlunoService from "../Services/AlunoService";
import FirebaseContext from "../Utils/FirebaseContext";

import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const ListarAluno = () => {
    const [alunos, setAluno] = useState([]);
    const [mediaIra, setMediaIra] = useState(0);
    const [flag, setFlag] = useState(false);
    const [loading, setLoading] = useState(true); // Controle de carregamento
    const navigate = useNavigate();
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        setLoading(true); // Inicia o carregamento

        AlunoService.listar(
            firebase.getFirestoreDb(),
            (alunos) => {
                setAluno(alunos);
                setLoading(false); // Termina o carregamento
            }
        );
    }, [firebase]);

    useEffect(() => {
        if (alunos.length === 0) {
            setMediaIra(0);
        } else {
            const totalIra = alunos.reduce((acc, aluno) => acc + Number(aluno.ira), 0);
            setMediaIra((totalIra / alunos.length).toFixed(2));
        }
    }, [alunos]);

    const handleDelete = (id) => {
        if (window.confirm(`Deseja excluir id = ${id}`)) {
            AlunoService.apagar(
                firebase.getFirestoreDb(),
                () => {
                    const result = alunos.filter((aluno) => aluno.id !== id);
                    setAluno(result);
                },
                id
            );
        }
    };

    const renderizarAlunos = () => {
        return alunos.map((aluno) => {
            const backgroundColor = flag 
                ? (Number(aluno.ira) < Number(mediaIra) 
                    ? "rgba(255, 99, 132, 0.2)"  // Vermelho suave e transparente
                    : "rgba(54, 162, 235, 0.2)"  // Azul suave e transparente
                ) 
                : 'transparent';

            return (
                <tr key={aluno.id}>
                    <th style={{ backgroundColor: backgroundColor }} scope="row">{aluno.id}</th>
                    <td style={{ backgroundColor: backgroundColor }}>{aluno.nome}</td>
                    <td style={{ backgroundColor: backgroundColor }}>{aluno.curso}</td>
                    <td style={{ backgroundColor: backgroundColor }}>{aluno.ira}</td>
                    <td style={{ backgroundColor: backgroundColor }}>
                        <div className="button-content">
                            <Link to={`/aluno/editar/${aluno.id}`} className="btn btn-primary">
                                Editar
                            </Link>
                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(aluno.id)}>
                                Apagar
                            </button>
                        </div>
                    </td>
                </tr>
            );
        });
    };

    const handleVerificarAprovados = () => {
        setFlag(prevFlag => !prevFlag);
    };

    return (
        <div className="page-content">
            <h1>Listar Aluno</h1>
            <div>
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Curso</th>
                            <th scope="col">Ira</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <tr><td colSpan="5">Carregando...</td></tr> : renderizarAlunos()}
                        <tr>
                            <td colSpan="5" style={{ fontWeight: 'bold', backgroundColor: 'cyan' }}>Média IRA: {mediaIra}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={handleVerificarAprovados}>
                    Verificar Aprovados
                </button>
            </div>
        </div >
    );
};

export default ListarAluno;