function UrlItem({ url }) {
  return (
    <div className="url">
      <div>{new Date(url.date).toLocaleString("en-US")}</div>
      <h2>
        <a href={`${url.shortUrl}`} target="_blank" rel="noreferrer">
          {url.shortUrl}
        </a>
      </h2>
    </div>
  );
}

export default UrlItem;
