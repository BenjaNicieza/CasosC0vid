const input = document.querySelector('#buscador');
const btnInput = document.querySelector('#btn');
const contenedorInfo = document.querySelector('.contenedor');
const info = document.querySelectorAll('.info');

document.addEventListener('DOMContentLoaded', () => {
    mostrarDatos()
    leerInput()
})

const pais = {
    region: '',
}

const leerInput = () => input.addEventListener('blur', (e) => {
    pais.region = e.target.value.toLowerCase()
    mostrarDatos()
    limpiarDatos()
})

const mostrarDatos = async () => {
    try {
        const respuesta = await fetch('https://api.covid19api.com/summary')
        const data = await respuesta.json();
        const dataTotal = await data.Countries
        mostrarContenido(dataTotal)

    } catch (error) {
        console.log(error)
    }   
    
}

const mostrarContenido = (informacion) => {
    limpiarHtml()
    const datosCovid =  informacion.find(element => {
        const { region } = pais;
        if(region){
            return element.Country.toLowerCase() === region.toLowerCase()
        }
        else return pais
    })

    const nombrePais = document.createElement('H3')
    nombrePais.innerHTML = `Datos sobre el COVID-19 en: <span>${datosCovid.Country}</span>`

    const positivo = document.createElement('P');
    positivo.textContent = datosCovid.TotalConfirmed.toLocaleString('en-US')
    
    const fallecidos = document.createElement('P');
    fallecidos.textContent = datosCovid.TotalDeaths.toLocaleString('en-US')
    
    
    const recuperados = document.createElement('P');
    recuperados.textContent = datosCovid.TotalRecovered.toLocaleString('en-US')

    info[0].appendChild(positivo)
    info[1].appendChild(fallecidos)
    info[2].appendChild(recuperados)

    contenedorInfo.appendChild(nombrePais)
    contenedorInfo.appendChild(info[0])
    contenedorInfo.appendChild(info[1])
    contenedorInfo.appendChild(info[2])
    
}

const limpiarHtml = () => {
    while(contenedorInfo.firstChild) contenedorInfo.removeChild(contenedorInfo.firstChild)
}


const limpiarDatos = () => {
    for(const borrar of info){
        console.log(borrar.querySelector('p').remove())
    }
}
