import { useSearchParams } from 'react-router-dom';
import { SearchResults } from '../components/SearchResults';

export function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <main className="search-results">
      <h1 className="search-title">Search Results</h1>
      <SearchResults query={query} />
    </main>
  );
}