import AlunoService from "../Services/AlunoService";
import FirebaseContext from "../Utils/FirebaseContext";

import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate} from "react-router-dom"

const EditarAluno = () => {

    const [nome, setNome] = useState("")
    const [curso, setCurso] = useState("")
    const [ira, setIra] = useState("")

    const {id} = useParams() // {id:1}
    const navigate = useNavigate()
    const firebase = useContext(FirebaseContext)

    useEffect(
        () => {
            AlunoService.getById(
                firebase.getFirestoreDb(),
                (aluno) => {
                    const { nome, curso, ira } = aluno;
                    setNome(nome)
                    setCurso(curso)
                    setIra(ira)
                },
                id
            )
        }
        ,
        []
    ) 


    const handleInputNome = (event) => {
        setNome(event.target.value)
    }

    const handleInputCurso = (event) => {
        setCurso(event.target.value)
    }

    const handleInputIra = (event) => {
        setIra(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const alunoEditado = {nome,curso,ira}
        AlunoService.atualizar(
            firebase.getFirestoreDb(),
            (aluno) => {
                console.log(aluno)
                navigate("/aluno/listar")
            },
            id,
            alunoEditado
        )


        
    }
    
    return (
        <div className="page-content">
            <h1>Editar Aluno</h1>
            <form className="form-content" onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label" htmlFor="inputNome">Nome</label>
                    <input
                        className="form-control"
                        type="text"
                        name="nome" 
                        id="inputNome"
                        onChange={handleInputNome}
                        value={nome}
                    />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Curso</label> 
                    <select
                        className="form-select"
                        value={curso}
                        onChange={(e) => setCurso(e.target.value)}
                    >
                        <option value="ES">ES</option>
                        <option value="EC">EC</option>
                        <option value="CC">CC</option>
                        <option value="SI">SI</option>
                        <option value="DD">DD</option>
                        <option value="RC">RC</option>
                    </select>
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Ira</label>
                    <input className="form-control"
                        type="number" step={0.01}
                        name="ira"
                        value={ira}
                        min={0}
                        max={10}
                        onChange={handleInputIra}
                    />
                </div>

                
                <div className="div-button-submit">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{marginLeft:0}}
                    >
                        Atualizar
                    </button>
                </div>

            </form>
        </div>
        
    )
    
}

export default EditarAluno