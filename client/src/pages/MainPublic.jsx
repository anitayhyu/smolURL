import UrlFormPublic from "../components/UrlFormPublic";

function MainPublic() {
  return (
    <>
      <div>
        <section className="heading">
          <h1>Welcome to smolURL</h1>
          <p>Enter a long URL to get it shortened!</p>
        </section>
        <UrlFormPublic />
      </div>
    </>
  );
}

export default MainPublic;
