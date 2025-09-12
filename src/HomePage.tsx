import Hero from "./components/Hero";
import TechnologiesList from "./components/Technologies";
import ProjectsList from "./components/Projects";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default function HomePage() {

  return (
    <>
      <NavBar/>
      <Hero/>
      <TechnologiesList/>
      <ProjectsList/>  
      <Footer/>
    </>
  )
}