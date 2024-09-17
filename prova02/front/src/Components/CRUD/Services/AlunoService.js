import {collection, query, getDocs} from "firebase/firestore"
import { addDoc, doc } from "firebase/firestore"
import { getDoc, setDoc, deleteDoc } from "firebase/firestore"

class AlunoService {
    constructor(){}

    static listar(db, callback){
        const c =  collection(db, "alunos")
        const q = query(c)
        getDocs(q)
        .then(
            (querySnapshot)=>{
                const alunos = []
                querySnapshot.forEach(
                    (aluno) =>{
                        alunos.push({
                            id: aluno.id,
                            ...aluno.data()
                        }
                        )
                    }
                )
                callback(alunos)
            }
        )
        .catch(error =>console.log(error))
    }


    static criar(db, callback, aluno){
        const c = collection(db, "alunos")
        addDoc(c, aluno)
        .then(
            (aluno) => callback({id:aluno.id})
        )
        .catch(error => console.log(error))
    }

    static getById(db, callback, id){
        const docRef = doc(db, "alunos", id)
        
        getDoc(docRef)
        .then(
            (docSnap) => {
                callback(docSnap.data())
            }
        )
        .catch(error => console.log(error))
    }

    static atualizar(db, callback, id, aluno){
        const docRef = doc(db, "alunos", id)
        setDoc(docRef, aluno)    
        .then(
            (response) => {
                callback({id})
            }
        )
        .catch(error => console.log(error))
    }

    static apagar(db, callback, id) {
        const docRef = doc(db, "alunos", id)
        deleteDoc(docRef)
        .then(
            () => {
                callback({id})
            }
        )
        .catch(error => console.log(error))
    }
}

export default AlunoService