import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPublicUrl } from "../features/urls/urlSlice";
import { FaUser } from "react-icons/fa";
import { signup, reset } from "../features/auth/authSlice";

// For non-authenticated users
function UrlFormPublic() {
  const [longUrl, setLongUrl] = useState("");
  const [requestCount, setRequestCount] = useState(0);
  const [showSignupButton, setShowSignupButton] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { urls } = useSelector((state) => state.urls);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createPublicUrl({ longUrl }));
    setLongUrl("");
    setRequestCount(requestCount + 1);
  };

  const isPublic = requestCount < 3; // limit to 3 requests for public access

  const onSignup = () => {
    dispatch(signup());
    dispatch(reset());
    navigate("/signup");
    setShowSignupButton(false);
  };

  return (
    <section className="form">
      {isPublic ? (
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="text">Please enter long URL: </label>
            <input
              type="text"
              name="longUrl"
              id="longUrl"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Make a smolURL!</button>
          </div>
        </form>
      ) : (
        <div className="center">
          <p>You have reached the limit of public requests.</p>
          <p>Please sign up for an account to continue.</p>
          {!showSignupButton ? null : (
            <div className="center-btn">
              <button className="btn" onClick={onSignup}>
                <FaUser />
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
      {urls.shortUrl && (
        <div className="center">
        <h3>
          Here's your smolURL:
          <div className="center-btn">
            <a href={`${urls.shortUrl}`} target="_blank" rel="noreferrer">
              {urls.shortUrl}
            </a>
          </div>
        </h3>
        </div>
      )}
    </section>
  );
}

export default UrlFormPublic;
