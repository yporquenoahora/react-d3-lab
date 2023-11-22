import { useEffect, useRef } from 'react'
import { select } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale'
import { axisLeft, axisBottom } from 'd3-axis'
import { subcategorias, getSubCategoria } from '../data/categorias'

// margin convention often used with D3
const margin = { top: 80, right: 60, bottom: 80, left:40 }
const width = 600 - margin.left - margin.right
const height = 800 - margin.top - margin.bottom

const color = ['#f05440', '#d5433d', '#b33535', '#283250']

const colorScale = scaleLinear()
    .domain([0, 1]) // Rango de datos
    .range(['yellow', 'red']); // Rango de colores


const BandChart = ({data}) => {
  
  
    const d3svg = useRef(null)

    useEffect(() => {
      if (data && d3svg.current) {
        let svg = select(d3svg.current)
  
        // scales
        const xMax = Math.max(...data.map(d=> +d.energy))
  
        const xScale = scaleLinear()
          .domain([0, xMax])
          .range([0, width])
  
        const yScale = scaleBand()
        .domain(Object.keys(subcategorias))
          //.domain([...new Set(data.map(d=>d.genre))])
          .rangeRound([0, height])
          .paddingInner(0.25)

        // append group translated to chart area
        svg = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)
  
        // draw header
        svg
          .append('g')
          .attr('class', 'bar-header')
          .attr('transform', `translate(0, ${-margin.top / 2})`)
          .append('text')
          .append('tspan')
          .text('Canciones por género')
  
  
        // draw bars
        svg
          .selectAll('.circle')
          .data(data)
          .enter()
          .append('circle')
          .attr('class', 'circle')
          .attr("cx", d => xScale(+d.energy))          
          .attr('cy', (d,i) => yScale(d.subcategoria))
          .attr('r', 6)
          //.attr('height', yScale.bandwidth())
          .style('fill', d => colorScale(d.energy))
  
          svg
          .selectAll('.text')
          .data(Object.keys(subcategorias))
          .enter()
          .append('text')
          .attr('class', 'text')
          .attr("x",   width/2 )          
          .attr('y', (d,i) => yScale(d))
          .text((d,i)=> d)
          .attr("text-anchor", "middle")
          .attr("font-size", "14px")
          //.attr('height', yScale.bandwidth())
          .style('fill', "black")
  
        // draw axes
        const xAxis = axisBottom(xScale)
        svg
          .append('g')
          .attr('class', 'x axis')
          .attr('transform', `translate(0,${height + margin.bottom / 3})`)
          .call(xAxis)
  
        /* const yAxis = axisLeft(yScale).tickSize(0)
        svg
          .append('g')
          .attr('class', 'y axis')
          .attr('transform', `translate(${40},0)`)
          .call(yAxis) */
      }
    }, [data])  


  return (
    
    <svg
    className="band-chart-container"
    width={width + margin.left + margin.right}
    height={height + margin.top + margin.bottom}
    role="img"
    ref={d3svg}
  ></svg>

 
  )
}

export default BandChart
