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

  var products = [];
  var articles = [];

  for (var i = 0; i < searchResults.hits.length; i++) {
    var hit = searchResults.hits[i];
    if (hit.type === "product") {
      products[i] = hit;
    }
    if (hit.type === "article") {
      articles[i] = hit;
    }
  }
  return (
    <div className="aa-Panel">
      <div className="aa-PanelLayout aa-Panel--scrollable">
        {searchResults?.hits.length === 0 && <p>No results found.</p>}
        {/* {searchResults?.hits.length > 0 && (
          <ul className="aa-List">
            {searchResults.hits.map((hit) => (
              <li className="aa-Item" key={hit.objectID}>
                <a href={hit.slug}>{hit.name}</a>
              </li>
            ))}
          </ul>
        )} */}
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
                  <a href={`/products/${hit.slug}`}>{hit.name}</a>
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
    <div className="container">
      <div
        className="aa-Autocomplete"
        role="combobox"
        aria-expanded="true"
        aria-haspopup="listbox"
        aria-labelledby="autocomplete-0-label"
        aria-owns="autocomplete-0-querySuggestionsPlugin-list autocomplete-0-categoriesPlugin-list autocomplete-0-products-list"
      >
        {" "}
        <form action="" role="search" className="aa-Form">
          {/* <div className="aa-InputWrapperPrefix">
            <label
              className="aa-Label"
              //for="autocomplete-0-input"
              id="autocomplete-0-label"
            >
              <button className="aa-SubmitButton" type="submit" title="Submit">
                <svg
                  className="aa-SubmitIcon"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M16.041 15.856c-0.034 0.026-0.067 0.055-0.099 0.087s-0.060 0.064-0.087 0.099c-1.258 1.213-2.969 1.958-4.855 1.958-1.933 0-3.682-0.782-4.95-2.050s-2.050-3.017-2.050-4.95 0.782-3.682 2.050-4.95 3.017-2.050 4.95-2.050 3.682 0.782 4.95 2.050 2.050 3.017 2.050 4.95c0 1.886-0.745 3.597-1.959 4.856zM21.707 20.293l-3.675-3.675c1.231-1.54 1.968-3.493 1.968-5.618 0-2.485-1.008-4.736-2.636-6.364s-3.879-2.636-6.364-2.636-4.736 1.008-6.364 2.636-2.636 3.879-2.636 6.364 1.008 4.736 2.636 6.364 3.879 2.636 6.364 2.636c2.125 0 4.078-0.737 5.618-1.968l3.675 3.675c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414z"></path>
                </svg>
              </button>
            </label>
          </div> */}
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
          {/* <div className="aa-InputWrapperSuffix">
            <button className="aa-ClearButton" type="reset" title="Clear">
              <svg
                className="aa-ClearIcon"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
              </svg>
            </button>
          </div> */}
        </form>
      </div>
      <div id="powered-by">
        <div className="img-wrap">
          <img
            width="75px"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Algolia-logo.svg/2560px-Algolia-logo.svg.png"
          ></img>
        </div>
        <div className="text-wrap">powered by</div>
      </div>
    </div>
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);
