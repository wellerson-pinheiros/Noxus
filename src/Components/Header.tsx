import { useState } from "react";
import logo from "../assets/logo.svg";
import seta from "../assets/seta-botao-contato.svg";
import menuIcon from "../assets/mobile-hero/menu.png";

function Header() {
  const [aberto, setAberto] = useState(false);

  return (
    <>
        {/* Barra de navegação do desktop: no celular o menu hamburger substitui os links */}
        <div className="navBar max-md:hidden w-full flex justify-between justify-items-center items-center p-10 ">
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

        {/* Menu hamburger do celular, na mesma posição do ícone do Figma (iPhone 16) */}
        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          className="md:hidden absolute right-[35px] top-[25px] z-[70] h-[61px] w-[60px] pointer-events-auto"
        >
          {aberto ? (
            <span className="block text-4xl leading-none text-white">×</span>
          ) : (
            <img src={menuIcon} alt="" className="size-full object-contain" />
          )}
        </button>

        {aberto && (
          <nav
            id="menu-mobile"
            aria-label="Menu"
            className="md:hidden fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-[#182533] text-2xl text-white"
          >
            <a href="" onClick={() => setAberto(false)}>Projetos</a>
            <a href="" onClick={() => setAberto(false)}>Sobre</a>
            <a href="#contato" onClick={() => setAberto(false)} className="rounded-full bg-white px-6 py-2 font-medium text-black">
              Contato
            </a>
          </nav>
        )}
    </>
  )
}

export default Header
