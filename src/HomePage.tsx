import Hero from "./components/Hero";
import TechnologiesList from "./components/Technologies";
import ProjectsList from "./components/Projects";
import NavBar from "./components/NavBar";

export default function HomePage() {

  return (
    <>
      <NavBar/>
      <Hero/>
      <TechnologiesList/>
      <ProjectsList/>    
    </>
  )
}