import "./Collections.css";

const collections = [
  { title: "Men", image: "/assets/images/footer/Men.jpg" },
  { title: "Woman", image: "/assets/images/footer/Woman.jpg" },
  { title: "Accessories", image: "/assets/images/footer/accessories.jpg" },
  { title: "Equipment", image: "/assets/images/footer/equipment.jpg" },
];

function Collections() {
  return (
    <section className="collections" id="collections">
      <h2 className="collections-title">
        FEATURED <span>COLLECTIONS</span>
      </h2>

      <div className="collections-container">
        {collections.map((collection) => (
          <article className="collection-card" key={collection.title}>
            <img src={collection.image} alt={collection.title} />
            <div className="overlay">
              <h3>{collection.title}</h3>
              <span className="line" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Collections;
