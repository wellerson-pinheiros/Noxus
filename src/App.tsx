import HomePage from "./pages/HomePage"
import Capitulos from "./Components/Capitulos"
import WfGaleria from "./Components/wf/WfGaleria"
import WfHero from "./Components/wf/WfHero"
import WfMundo from "./Components/wf/WfMundo"
import PreLoader from "./Components/PreLoader"
import WfFooter from "./Components/wf/WfFooter"
import { useEffect } from "react"
import { iniciarScrollSuave } from "./smoothScroll"

function App() {
  useEffect(() => iniciarScrollSuave(), [])

  return (
    <>
      <PreLoader />
      <HomePage />
      <WfGaleria/>
      <WfHero/>
      <WfMundo/>
      <Capitulos />
      <WfFooter />

    </>
   
  )
}

export default App
