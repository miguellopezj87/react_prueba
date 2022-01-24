import React, { Fragment, useState, useRef, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import { TodoItem } from './TodoItem';

const KEY = "todolist-todos"


export function TodoList(){

    const [arregloTareas, setRegistros] = useState([]);


    // Crea una referencia al campo donde escribe el nombre de la terea
    // para monitorear el estado de dicho campo a nivel de contenido.
    // Se asocia directamente en el botón (<button ref="¿?"></button>)
    const campoNombreTarea = useRef();
    const campoTituloTarea = useRef();
    const campoImportanciaTarea = useRef();



    useEffect(() => {
        const almacenamiento = JSON.parse(localStorage.getItem(KEY));
        if (almacenamiento){
            setRegistros(almacenamiento);
        }
    }, [])


    
    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(arregloTareas));
    }, [arregloTareas])
    





    const agregarTarea = () => {
        // Captura el texto escrito y o guarda en la variable.
        const nombreTarea = campoNombreTarea.current.value;
        const tituloTarea = campoTituloTarea.current.value;
        const importanciaTarea = campoImportanciaTarea.current.value;


        // Si el campo está en blanco, nada ocurrirá.
        if (nombreTarea === ""){
            return <mostrarError/>
        }else{
            setRegistros((listado) => {
                const capturar = {
                    id: uuid(),
                    task: nombreTarea,
                    titulo: tituloTarea,
                    completed: false,
                    color:"##FFFFCC"
                }

                return [...listado, capturar]
            })

            // Limpia la caja de texto
            campoNombreTarea.current.value = null
            campoTituloTarea.current.value = null

        }
    }



    // "filter" recorre el arreglo. 
    // "x" es un parámentro inventado por mi que osocia la estructura 
    //  de objetos almacenados: (id, stak y completed).
    const ResumenTareas = () => {
        const cant = arregloTareas.filter((x) => !x.completed).length;
        if (cant === 0){
            return (
                <div className="alert alert-success mt-3">
                    Felicitaciones no tienes tareas pendientes! :)
                </div>
            )
        }

        if (cant === 1){
            return (
                <div className="alert alert-info mt-3">
                    Te queda solamente una tarea pendiente!
                </div>
            )
        }

        return (
            <div className="alert alert-info mt-3">
                Te quedan {cant} tareas pendientes!
            </div>
        )
    }



    const cambiarEstadoTarea = (id) => {
        const newTodos = [...arregloTareas];
        const todo = newTodos.find((todo) => todo.id === id)
        todo.completed = !todo.completed;
        setRegistros(newTodos)
    }



    const eliminarTareasCompletadas = () => {
        const respuesta = arregloTareas.filter((x) => !x.completed);
        setRegistros(respuesta);
    }



    return (

        <Fragment>
            <h1>Post It Simulator</h1>

            <div className="input-group mt-4 mb-4">
                <input ref={campoTituloTarea} placeholder='Titulo' className="form-control mb-3" type="text" style={{ marginRight: "1em"}}/>
                <input ref={campoNombreTarea} placeholder='Descripcion' className="form-control mb-3" type="text" style={{ marginRight: "1em"}}/>
                <input ref={campoImportanciaTarea} type="checkbox" id="chk1" className="form-check-input mb-3" />
                <label for="chk1" style={{color:"white"}}>&nbsp;Importante!</label>
                <button onClick={agregarTarea} className="btn btn-success ms-2" style={{backgroundColor:"#111"}}>Agregar</button>
                <button onClick={eliminarTareasCompletadas} className="btn btn-danger ms-2">Eliminar</button>
            </div>


            

            {arregloTareas.map((todo) => (
                <TodoItem todo={todo} key={todo.id} cambiarEstado={cambiarEstadoTarea}></TodoItem>
            ))}

        </Fragment>

    );
}
