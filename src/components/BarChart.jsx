import { useEffect, useRef } from 'react'
import { select } from 'd3-selection'
import { max } from 'd3-array'
import { scaleLinear, scaleBand } from 'd3-scale'
import { axisLeft, axisBottom } from 'd3-axis'

// margin convention often used with D3
const margin = { top: 80, right: 60, bottom: 80, left:40 }
const width = 600 - margin.left - margin.right
const height = 600 - margin.top - margin.bottom

const color = ['#f05440', '#d5433d', '#b33535', '#283250']

const BarChart = ({ data }) => {
  
  const d3svg = useRef(null)

  useEffect(() => {
    if (data && d3svg.current) {
      let svg = select(d3svg.current)

      // scales
      const xMax = Math.max(...data.map(d=> d.revenue))

      const xScale = scaleLinear()
        .domain([0, xMax])
        .range([0, width])

      const yScale = scaleBand()
        .domain(data.map(d=>d.genre))
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
        .text('Géneros más populares en mi playlist')


      // draw bars
      svg
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        
        .attr('y', d => yScale(d.genre))
        .attr('width', d => xScale(+d.revenue))
        .attr('height', yScale.bandwidth())
        .style('fill', function(d, i) {
          return color[i % 4] // use colors in sequence
        })

        svg
        .selectAll('.text')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'text')  
        .attr("x", 10)        
        .attr('y', d => yScale(d.genre) + yScale.bandwidth()/2 + 5)
        .attr('width', d => xScale(+d.revenue) )
        .attr('height', yScale.bandwidth())
        .text( d=> d.genre)
        .style("fill", "white") 

        svg
        .selectAll('.value')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'value')
        .attr("x", d => xScale(+d.revenue) - 20)        
        .attr('y', d => yScale(d.genre) + yScale.bandwidth()/2 + 5)
        .attr('width', d => xScale(+d.revenue) )
        .attr('height', yScale.bandwidth())
        .text( d=> d.revenue)
        .style("fill", "white")

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
      className="bar-chart-container"
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
      role="img"
      ref={d3svg}
    ></svg>
  )
}

export default BarChart

// style={{ pointerEvents: 'all', width: '100%', height: '100%' }}
