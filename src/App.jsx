import { StrictMode } from 'react'
import BarChartData from './components/BarChartData'
import BandChartData from './components/BandChartData';
import RadarChart from './components/RadarChart';

function App() {
  return (
    <>
      <BarChartData />
      <BandChartData/>
      <RadarChart/>
    </>
  )
}

export default App;
