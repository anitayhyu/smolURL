import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UrlForm from "../components/UrlForm";
import UrlItem from "../components/UrlItem";
import Spinner from "../components/Spinner";
import { getShortUrls, reset } from "../features/urls/urlSlice";

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { urls, isLoading, isError, message } = useSelector(
    (state) => state.urls
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (user && user.token) {
      dispatch(getShortUrls());
    } else {
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name.split(" ")[0]}</h1>
      </section>
      <UrlForm />
      <h2>Your smol URLs list:</h2>
      <section className="content">
        {urls.length > 0 ? (
          <div className="urls">
            {urls.map((url) => (
              <UrlItem key={urls._id} url={url} />
            ))}
          </div>
        ) : (
          <h3>You have not created any smolURLs yet</h3>
        )}
      </section>
    </>
  );
}

export default Main;
