import { useRef } from 'react'
import { select } from 'd3-selection'
import { scaleLinear, scaleBand } from 'd3-scale'
import { axisLeft, axisBottom } from 'd3-axis'
import {lineRadial} from "d3-shape"
//import { axisRadial } from 'd3-axis';
import { axisRadialInner, axisRadialOuter } from 'd3-radial-axis'

const margin = { top: 80, right: 60, bottom: 80, left:40 }

function RadarChart() {
    // Datos de ejemplo
    const d3svg = useRef(null)
    const data = [
        { category: "A", value: 30 },
        { category: "B", value: 70 },
        { category: "C", value: 50 },
        { category: "D", value: 40 },
        { category: "E", value: 60 },
        { category: "F", value: 60 },
        { category: "G", value: 60 },
        { category: "H", value: 60 },
        { category: "I", value: 60 },
    ];
    
    // Dimensiones del gráfico
    const width = 600;
    const height = 600;
    
    // Radio del gráfico
    const radius = Math.min(width, height) / 2;
    
    // Escala para los valores
    const valueScale = scaleLinear()
        .domain([0, Math.max(...data.map( d => d.value))])
        .range([0, radius]);
    
    // Escala angular para las categorías
    const angleScale = scaleBand()
        .domain(data.map(d => d.category))
        .range([0, 2 * Math.PI]);
    
    // Crea el contenedor SVG
    let svg = select(d3svg.current)
    svg = svg.append('g').attr('transform', `translate(${width/2}, ${height/2})`)
    
    // Crea el generador de líneas radiales
    const line = lineRadial()
        .angle(d => angleScale(d.category))
        .radius(d => valueScale(d.value));
    
    // Dibuja las líneas radiales
    svg.append("path")
        .datum(data)
        .attr("fill", "pink")
        .attr("stroke", "grey")
        .attr("stroke-width", 2)
        .attr("d", line);
    
    // Dibuja los puntos en las intersecciones de las líneas radiales
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => valueScale(d.value) * Math.cos(angleScale(d.category)))
        .attr("cy", d => valueScale(d.value) * Math.sin(angleScale(d.category)))
        .attr("r", 10)
        .attr("fill", "blue");

        const radialScale = scaleLinear()
        .domain([0, data.length]) // Rango de datos
        .range([0, 50]); // Radio máximo del gráfico
      
      // Escala angular
      const angularScale = scaleLinear()
        .domain([0, data.length])
        .range([0, 2 * Math.PI]); // Rango angular completo
      
      // Generar la línea radial
      const radialLine = lineRadial()
        .angle((d, i) => angularScale(i)) // Ángulo según la posición en el array
        .radius(d => radialScale(d)); // Radio según el valor de los datos
      
      // Dibujar la línea radial
      svg
        .append('path')
        .datum(data)
        .attr('d', radialLine)
        .attr('fill', 'steelblue')
        .attr('stroke', 'black');
      
      // Añadir ejes radiales y angulares
      /* const radialAxis = axisRadialInner(radialScale);
      const angularAxis = axisRadialInner(angularScale);
      
      svg.append('g').call(radialAxis);
      svg.append('g').call(angularAxis); */
    
  return (
    <svg
    className="radar-chart-container"
    width={width + margin.left + margin.right}
    height={height + margin.top + margin.bottom}
    role="img"
    ref={d3svg}
  ></svg>
  )
}

export default RadarChart
