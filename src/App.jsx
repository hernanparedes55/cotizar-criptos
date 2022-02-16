import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';
import ImagenCripto from './img/imagen-criptos.png';


const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
    
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

//la ventaja de usar style components es que al momento de eliminar un componente que ya no se utilice,
//se elimina también su css. Y sigue teniendo la ventaja de que el css es reutilizable
const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`


function App() {

  //Extraemos moneda y cripto. Por eso lo declaron como objeto {}
  //y se llena con los datos del formulario por lo que le paso setMonedas como prop en el componente Formulario
  const [monedas , setMonedas ] = useState({})
  const [cotizacion , setCotizacion ] = useState({})
  const [cargando , setCargando ] = useState(false)//spinner

  //Para verificar cuando el objeto tiene datos
  useEffect(() => {
    if(Object.keys(monedas).length > 0) {
      
      const cotizarCripto = async () => {
        setCargando(true);
        setCotizacion({});
        //extraigo moneda y cripto
        const {moneda , criptomoneda} = monedas
        //usamos un template de strings `` porque voy a necesitar pasar la moneda y la cripto reemplazando los parametros de la url
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        //se usa esta sintaxis para pasar de forma dinamica parametros al objeto y que los tome como variables
        setCotizacion(resultado.DISPLAY[criptomoneda][moneda]);

        setCargando(false);
        
      }
      cotizarCripto();
    }
  }, [monedas])
  

  return (
    <Contenedor>
      <Imagen
      src={ImagenCripto}
      alt="Imagen Criptomonedas"
      />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario 
        setMonedas={setMonedas} />

        {cargando && <Spinner/> }
        {cotizacion.PRICE && <Resultado cotizacion={cotizacion}/>}

      </div>
    </Contenedor>
  )
}

export default App
