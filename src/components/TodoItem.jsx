import React, {Fragment} from 'react'

export function TodoItem({todo, cambiarEstado}){

    const {id, task, titulo, completed, color} = todo;

    const fnCambiarEstado = () => {
        cambiarEstado(id);
    }


    return (
            <Fragment>
                
                <div className="card col-3 close" style={{ display: "inline-block", marginLeft:"1em", marginTop:"1em", backgroundColor:"#FFFFCC"}}>
                <button type="button" onChange={fnCambiarEstado} checked={completed} class="close" aria-label="Close" style={{alignContent:"right"}}>
                    <span aria-hidden="true">&times;</span>
                </button>
                    <div className="card-body close">
                        <h3 className="card-title">{titulo}</h3>
                        <p className="card-text" style={{fontFamily:'Reenie Beanie', fontfamily:'cursive', fontSize:"2em"}}>{task}</p>
                        <input type="checkbox" onChange={fnCambiarEstado} checked={completed} className="form-check-input me-2"></input>
                        <strong><i>Eliminar Post It</i></strong>
                    </div>
                </div>

            </Fragment>
            //<li className="list-group-item">
            //    <input type="checkbox" onChange={fnCambiarEstado} checked={completed} className="form-check-input me-2"></input>
            //    {titulo}
            //    &nbsp;
            //    {task}
            //</li>
        )
}
