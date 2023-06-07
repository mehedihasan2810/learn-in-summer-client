import PopularCourses from './components/PopularCourses/PopularCourses'
import Slider from './components/Slider/Slider'
import Stats from './components/stats/Stats'

const Home = () => {
  return (
    <div>
      <Slider/>
      <Stats/>
      <PopularCourses/>
    </div>
  )
}

export default Home