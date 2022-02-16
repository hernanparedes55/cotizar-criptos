import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useSelectMonedas from '../hooks/useSelectMonedas';
import { monedas } from '../data/monedas';

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #7a7dfe;
        cursor: pointer;
    }
`

//Extraigo setMonedas
const Formulario = ({setMonedas}) => {
    
    const [criptos, setCriptos] = useState([]);

    const [error, setError] = useState(false);

    
    //la sintaxis para llamar al hook es muy parecida a la de useState.
    //Tengo que llamar a la función que está dentro del hook (SelectMonedas)
    //y como retorna como array, lo llamo con un nombre o con el indice.
    //Le pongo un valor inicial al hook y se pasa como parámetro al hook. en este caso le pongo "label" y "opciones"
    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas);
    
    const [ criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige tu Criptomoneda', criptos);

    useEffect(() => {
      const consultarApi = async () => {
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        //cripto seria el nombre del nuevo array que crea map
        const arrayCriptos = resultado.Data.map(cripto => {
            
            const objeto = {
                id: cripto.CoinInfo.Name,
                nombre: cripto.CoinInfo.FullName
            }
            return objeto
                          
        })
        setCriptos(arrayCriptos);
      }
      consultarApi();

    }, [])
    
    const handleSubmit = e => {
        e.preventDefault()
        
        if([moneda, criptomoneda].includes('')) {
            setError(true);

            return
        }
        setError(false);
        setMonedas({
            moneda,
            criptomoneda
        })
    }


     //Como ya tiene el return en la función, lo puedo directamente meter dentro del return del componente
    return (
        <>
        
            {error && <Error>Todos los campos son obligatorios</Error>} 
            <SelectMonedas/>
            <SelectCriptomoneda/>

                 
            <form onSubmit={handleSubmit}>
            
                <InputSubmit type="submit" value="Cotizar" />
            
            </form>
        </>
      );
    
}
 
export default Formulario;