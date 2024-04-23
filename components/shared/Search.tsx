import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  connectStateResults,
  connectSearchBox,
} from "react-instantsearch-dom";

const searchClient = algoliasearch(
  "CJONDOJUF9",
  "6357a282d1853ac1dffd37a7fcd8b1a5"
);

export default function Search() {
  return (
    <div>
      <InstantSearch
        searchClient={searchClient}
        indexName="stonex"
        className="aa-Input"
      >
        <CustomSearchBox />
        <CustomHits />
      </InstantSearch>
    </div>
  );
}

const Hits = ({ searchState, searchResults }) => {
  const validQuery = searchState.query?.length >= 1;
  if (!validQuery) return null;

  const products = [];
  const articles = [];

  for (let i = 0; i < searchResults.hits.length; i++) {
    const hit = searchResults.hits[i];
    if (hit.type === "product") {
      products[i] = hit;
    }
    if (hit.type === "article") {
      articles[i] = hit;
    }
  }
  return (
    <div className="aa-Panel z-10">
      <div className="aa-PanelLayout aa-Panel--scrollable">
        {searchResults?.hits.length === 0 && <p>No results found.</p>}
        {products?.length > 0 && (
          <section className="aa-Source">
            <div className="aa-SourceHeader">
              <span className="aa-SourceHeaderTitle">Products</span>
              <div className="aa-SourceHeaderLine"></div>
            </div>
            <ul className="aa-List">
              {products.map((hit) => (
                <li className="aa-Item" key={hit.objectID}>
                  <a href={`/products/${hit.slug}`}>{hit.name}</a>
                </li>
              ))}
            </ul>
          </section>
        )}
        {articles?.length > 0 && (
          <section className="aa-Source">
            <div className="aa-SourceHeader">
              <span className="aa-SourceHeaderTitle">Articles</span>
              <div className="aa-SourceHeaderLine"></div>
            </div>
            <ul className="aa-List">
              {articles.map((hit) => (
                <li className="aa-Item" key={hit.objectID}>
                  <a href={`/articles/${hit.slug}`}>{hit.name}</a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

const CustomHits = connectStateResults(Hits);

const SearchBox = ({ refine }) => {
  return (
    <div className={"max-w-[375px] mt-8"}>
      <div
        className="aa-Autocomplete"
        role="combobox"
        aria-controls=""
        aria-expanded="true"
        aria-haspopup="listbox"
        aria-labelledby="autocomplete-0-label"
        aria-owns="autocomplete-0-querySuggestionsPlugin-list autocomplete-0-categoriesPlugin-list autocomplete-0-products-list"
      >
        {" "}
        <form action="" role="search" className="aa-Form">
          <div className="aa-InputWrapper">
            <input
              className="aa-Input"
              id="algolia_search"
              type="search"
              placeholder="Search"
              onChange={(e) => refine(e.currentTarget.value)}
              aria-autocomplete="both"
              aria-labelledby="autocomplete-0-label"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              enterKeyHint="search"
              spellCheck="false"
              maxLength={512}
              aria-controls="autocomplete-0-querySuggestionsPlugin-list autocomplete-0-categoriesPlugin-list autocomplete-0-products-list"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);
