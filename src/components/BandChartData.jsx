import { useState, useEffect } from 'react'
import { csv } from 'd3-fetch'
import BandChart from './BandChart'
import { subcategorias, getCategorias } from '../data/categorias'

const getSubCategoria = ( cat ) => {
    
    for (const categoria in subcategorias) {   
        //console.log(categoria, cat, subcategorias[categoria])         
        if (subcategorias[categoria].includes(cat)) {
        return categoria;
        }
    }
    return "No se encontró una categoría para esta subcategoría";
    
}
const type = ( d )=>{
    
    
    const data =  {
          genre: getCategorias(d.genre),
          subcategoria:  getCategorias(d.genre).map(d => getSubCategoria(d.genre)),
          energy: +d.energy
        }
        
    const renderedData = data.genre.map(d =>{
        
        return {
            genre: d.trim(),
            subcategoria: getSubCategoria(d.trim()),
            energy: data.energy
          }
        
    })
    
      return renderedData 

}


const prepareBandChartData = (data) => {
    // usually more wrangling is required but the example data is simple
    return data;//.map(d=>{return { genre: d.genre.slice(0,10),revenue: d.revenue.slice(0,10)}})
  }
  
  const customSort = (a, b) => a.energy > b.energy

const BandChartData = () => {
    const [bandChartData, setBandChartData] = useState(null)
  
    useEffect(() => {
      
      csv('../data/songs.csv', type).then(data => {
        //const dataClean = filterData(data)
        setBandChartData([])  
        const prepareData = prepareBandChartData(data.flat())
        const sortData = prepareData.sort(customSort)
        
        setBandChartData(sortData./*slice(-20).*/reverse())
      })
    }, [])
  
    if (bandChartData === null) {
      return <p>Loading...</p>
    }
  
    return <BandChart data={bandChartData} />
}

export default BandChartData
