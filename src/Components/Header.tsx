import logo from "../assets/logo.svg";
import seta from "../assets/seta-botao-contato.svg";
function Header() {
  return (
    <>
        <div className="navBar w-full flex justify-between justify-items-center items-center p-10 ">
            <div className="logo"><img src={logo} alt="Logo do site" /></div>
            <div className="links-navegacao text-2xl text-white flex  gap-8 pr-10 items-center" > 
                <a href="">Projetos</a>
                <a href="">Sobre</a>
                <a href="#contato" className="button-contato bg-white rounded-full text-black flex items-center gap-2 p-2 font-medium hover:bg-gray-200 transition-all">
        <span>Contato</span>
        <img src={seta} alt="Seta do botao de contato" className="w-5 h-5" />
    </a>
            </div>
        </div>
    </>
  )
}

export default Header