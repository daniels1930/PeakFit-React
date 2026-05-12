import { Link, useSearchParams } from "react-router-dom";
import { searchCatalogProducts } from "../../data/searchProducts";
import "./SearchResults.css";

const suggestedSearches = ["dumbbell", "leggings", "bag", "equipment", "women", "accessories"];

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const results = searchCatalogProducts(query);
  const hasQuery = query.trim().length > 0;

  return (
    <main className="search-results-page">
      <section className="search-results-header">
        <p>Search</p>
        <h1>{hasQuery ? `Results for "${query}"` : "Search products"}</h1>
        <span>
          {hasQuery
            ? `${results.length} product${results.length === 1 ? "" : "s"} found`
            : "Try a product, category, or training keyword."}
        </span>
      </section>

      {!hasQuery && (
        <section className="search-suggestions" aria-label="Suggested searches">
          {suggestedSearches.map((term) => (
            <Link key={term} to={`/search?q=${encodeURIComponent(term)}`}>
              {term}
            </Link>
          ))}
        </section>
      )}

      {hasQuery && results.length === 0 ? (
        <section className="search-no-results">
          <h2>No products found</h2>
          <p>Try a broader word like equipment, women, men, bag, dumbbell, or accessories.</p>
        </section>
      ) : (
        <section className="search-grid">
          {results.map((product) => (
            <article className="search-card" key={product.id}>
              <Link className="search-card-image" to={`/products/${product.id}`}>
                <img src={product.images[0]} alt={product.name} />
              </Link>
              <div className="search-card-info">
                <span>{product.collection}</span>
                <h2>{product.name}</h2>
                <p>{product.price}</p>
                <Link to={`/products/${product.id}`}>View product</Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default SearchResults;
