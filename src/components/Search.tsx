import Link from "next/link";
import { searchPortfolio } from "../search/searchPortfolio";
import { getMessages, type Locale } from "../i18n/messages";

const Search = ({ query, locale = "en" }: { query: string; locale?: Locale }) => {
  const copy = getMessages(locale);
  if (!query.trim()) return <span>{copy.search.usage}</span>;
  const results = searchPortfolio(query);
  if (!results.length) return <span>{copy.search.noResults(query)}</span>;
  return (
    <span>
      {copy.search.heading(query)}<br />
      {results.map((result) => (
        <span key={result.id}>
          <strong>[{copy.search.category[result.category]}] {result.title}</strong><br />
          {result.excerpt}<br />
          <Link href={`/?command=${encodeURIComponent(result.command)}`}>
            {copy.search.open}: {result.command}
          </Link><br /><br />
        </span>
      ))}
    </span>
  );
};

export default Search;
