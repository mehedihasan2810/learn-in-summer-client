import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import  { useLayoutEffect } from 'react'

const SmoothScrollProvider = ({children}) => {

    // smooth scrolling with lenis and scrolltrigger
  useLayoutEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }, []);
// ---------------------------------------------


  return children;
}

export default SmoothScrollProvider