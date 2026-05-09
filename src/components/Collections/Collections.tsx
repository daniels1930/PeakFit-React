import { Link } from "react-router-dom";
import "./Collections.css";

const collections = [
  { title: "Men", image: "/assets/images/footer/Men.jpg", to: null },
  { title: "Woman", image: "/assets/images/footer/Woman.jpg", to: "/collections/women" },
  { title: "Accessories", image: "/assets/images/footer/accessories.jpg", to: null },
  { title: "Equipment", image: "/assets/images/footer/equipment.jpg", to: null },
];

function Collections() {
  return (
    <section className="collections" id="collections">
      <h2 className="collections-title">
        FEATURED <span>COLLECTIONS</span>
      </h2>

      <div className="collections-container">
        {collections.map((collection) => {
          const card = (
            <article className="collection-card" key={collection.title}>
              <img src={collection.image} alt={collection.title} />
              <div className="overlay">
                <h3>{collection.title}</h3>
                <span className="line" />
              </div>
            </article>
          );

          return collection.to ? (
            <Link
              to={collection.to}
              key={collection.title}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {card}
            </Link>
          ) : (
            card
          );
        })}
      </div>
    </section>
  );
}

export default Collections;