import styled from "@emotion/styled";
import {useState} from 'react';

const Label = styled.label`
    color: #FFF;
    display: block;
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`

const Select = styled.select`
    width: 100%;
    font-size: 18px;
    padding: 14px;
    border-radius: 10px;
`

//la ventaja de crear tu propio hook es que podes reutilizar una función.
//Tambien se pueden crear una Funcion Helper, un archivo externo e importarlo cada vez que lo necesite
//también te permite incorporar State y mantener el valor de una función de forma persistente.
// Y va a tener todas las ventajas de React. state, effects, integrar hooks, performance.
// Reutilizables en otros proyectos y lugares de la página.

// es como crear una función pero no tienen el return. Puede retornar un objeto o un array.

const useSelectMonedas = (label, opciones) => {

    const [state, setState] = useState('')

    //Aca le doy como implícito el return poniendole () por eso puedo mostrarlo en pantalla en el return
    //del component
    const SelectMonedas = () => (
        <>
            <Label> {label} </Label>
            <Select
            //le asocio dos props
            value={state} //
            onChange={e => setState(e.target.value)}
            >
                <option value=""> Seleccione</option>
                //Itero las opciones
                {opciones.map(opcion => (
                    <option
                    key={opcion.id}
                    value={opcion.id} //Lo que va a almacenar el state
                    >
                        {opcion.nombre}
                    </option>
                ))}
            </Select>
        </>
    )


    return [ state, SelectMonedas ]
}
 
export default  useSelectMonedas;