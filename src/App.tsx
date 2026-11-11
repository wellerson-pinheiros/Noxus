import HomePage from "./pages/HomePage"
import Capitulos from "./Components/Capitulos"
import WfGaleria from "./Components/wf/WfGaleria"
import WfHero from "./Components/wf/WfHero"
import WfMundo from "./Components/wf/WfMundo"
import PreLoader from "./Components/PreLoader"

function App() {
  return (
    <>
      <PreLoader />
      <HomePage />
      <WfGaleria/>
      <WfHero/>
      <WfMundo/>
      <Capitulos />
      
    </>
   
  )
}

export default App
