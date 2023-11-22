import { useState, useEffect } from 'react'
import { csv } from 'd3-fetch'
import BarChart from './BarChart'
import Papa from 'papaparse';

const parseNA = string => (string === 'NA' ? undefined : string)

function type(d) {
    console.log(d)
 const renderedData =  Object.entries(d).map((d,i)=>{
    return {
      genre: d[0],
      revenue: +d[1]
    }
  })
  return renderedData 
}

function filterData(data) {  
  
  return data.filter(d => {    
    
    return d.revenue > 0
  })
}

function prepareBarChartData(data) {
  // usually more wrangling is required but the example data is simple
  return data;//.map(d=>{return { genre: d.genre.slice(0,10),revenue: d.revenue.slice(0,10)}})
}

const customSort = (a, b) => a.revenue > b.revenue

const BarChartData = () => {
  const [barChartData, setBarChartData] = useState(null)
  
  useEffect(() => {
    const csvFilePath = '../data/my_songs_genres.csv';
    /* Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: (result) => {
        // Los datos están disponibles en result.data
        console.log(result);

        const prepareData = prepareBarChartData(result.data)[0]
        const sortData = prepareData.sort(customSort)
        
        setBarChartData(sortData.slice(-15).reverse())

      },
      error: (error) => {
        console.error('Error parsing CSV', error);
      },
    }); */
     csv('../data/my_songs_genres.csv', type).then(data => {
      //const dataClean = filterData(data)
      console.log(data)
      setBarChartData([])  
      const prepareData = prepareBarChartData(data)[0]
      const sortData = prepareData.sort(customSort)
      
      setBarChartData(sortData.slice(-15).reverse())
    }) 
  }, [])

  if (barChartData === null) {
    return <p>Loading...</p>
  }

  return <BarChart data={barChartData} />
}

export default BarChartData
