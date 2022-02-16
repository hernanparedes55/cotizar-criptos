import styled from "@emotion/styled";

const Contenedor = styled.div`
    color: #FFF;
    font-family: 'Lato', sans-serif;

    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`
const Texto = styled.p`
    font-size: 18px;
    span {
        font-weight: 700;
    }
`

const Precio = styled.p`
    font-size: 24px;
    span {
        font-weight: 700;
    }
`
const Imagen = styled.img`
    display: block;
    width: 120px;
`

const Resultado = ({cotizacion}) => {
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = cotizacion
    return (
        <Contenedor>
            <Imagen
             src={`https://cryptocompare.com/${IMAGEURL}`}
             alt="Imagen cripto"
            />
            <div>
                <Precio>El precio es de: <span>{PRICE}</span></Precio>
                <Texto>El precio más alto del día es: <span>{HIGHDAY}</span></Texto>
                <Texto>El precio más bajo del día es: <span>{LOWDAY}</span></Texto>
                <Texto>Variación últimas 24 hs: <span>{CHANGEPCT24HOUR}</span></Texto>
                <Texto>Última actualización: <span>{LASTUPDATE}</span></Texto>
            </div>
            
        </Contenedor>
      );
}
 
export default Resultado;