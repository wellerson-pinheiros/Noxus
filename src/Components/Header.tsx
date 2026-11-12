import { useState, type MouseEvent } from "react";
import logo from "../assets/logo.svg";
import seta from "../assets/seta-botao-contato.svg";
import menuIcon from "../assets/mobile-hero/menu.png";

const WHATSAPP = "https://wa.me/5511914881120";

// Rola suavemente até o topo da página
function voltarAoTopo(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Rola suavemente até a seção com o id informado
function irPara(e: MouseEvent<HTMLAnchorElement>, id: string) {
  e.preventDefault();
  const alvo = document.getElementById(id);
  if (!alvo) return;
  window.scrollTo({ top: alvo.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
}

function Header() {
  const [aberto, setAberto] = useState(false);

  return (
    <>
        {/* Barra de navegação do desktop: no celular o menu hamburger substitui os links */}
        <div className="navBar max-md:hidden w-full flex justify-between justify-items-center items-center p-10 ">
            <a href="#" onClick={voltarAoTopo} aria-label="Voltar ao início" className="logo">
              <img src={logo} alt="Logo do site" />
            </a>
            <div className="links-navegacao text-2xl text-white flex  gap-8 pr-10 items-center" >
                <a href="#galeria" onClick={(e) => irPara(e, "galeria")}>Projetos</a>
                <a href="#wf-hero" onClick={(e) => irPara(e, "wf-hero")}>Sobre</a>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="button-contato bg-white rounded-full text-black flex items-center gap-2 p-2 font-medium hover:bg-gray-200">
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
            <a
              href="#galeria"
              onClick={(e) => {
                setAberto(false);
                irPara(e, "galeria");
              }}
            >
              Projetos
            </a>
            <a
              href="#wf-hero"
              onClick={(e) => {
                setAberto(false);
                irPara(e, "wf-hero");
              }}
            >
              Sobre
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setAberto(false)}
              className="rounded-full bg-white px-6 py-2 font-medium text-black"
            >
              Contato
            </a>
          </nav>
        )}
    </>
  )
}

export default Header
