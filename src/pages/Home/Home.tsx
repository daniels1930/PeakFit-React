import Collections from "../../components/Collections/Collections";
import Hero from "../../components/Hero/Hero";
import Products from "../../components/Products/Products";
import "./Home.css";

function Home() {
  return (
    <main>
      <Hero />
      <Products />
      <Collections />

      <section className="home-brand">
        <div className="home-brand-logo">
          <img src="/assets/images/footer/logo.png" alt="PeakFit" />
        </div>
        <p>
          PeakFit is a fitness focused e-commerce and marketplace built for a driven and growing fit
          community. It&apos;s more than just an online store it&apos;s a platform where users can buy
          high quality gym accessories, apparel, supplements, and lifestyle products, while also selling
          their own fitness brands and creations. PeakFit connects passionate athletes, creators, and
          entrepreneurs in one powerful ecosystem designed to support performance, growth, and community.
        </p>
      </section>
    </main>
  );
}

export default Home;