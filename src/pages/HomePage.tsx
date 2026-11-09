import Header from "../Components/Header";
import Home from "../Components/Home";

function HomePage() {
  return (
    <main className="relative w-full">
      <Home />

      {/* Header fixo, sobreposto ao Home */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
    </main>
  );
}

export default HomePage;
