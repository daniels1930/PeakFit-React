import Collections from "../../components/Collections/Collections";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
import Products from "../../components/Products/Products";

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Collections />
      </main>
      <Footer />
    </>
  );
}

export default Home;
