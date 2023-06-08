import PopularCourses from './components/PopularCourses/PopularCourses'
import PopularInstructors from './components/PopularInstructors/PopularInstructors'
import Slider from './components/Slider/Slider'
import Testimonials from './components/Testimonials/Testimonials'
import Stats from './components/stats/Stats'

const Home = () => {
  return (
    <div>
      <Slider/>
      <Stats/>
      <PopularCourses/>
      <PopularInstructors/>
      <Testimonials/>
      {/* <Test/> */}
    </div>
  )
}

export default Home