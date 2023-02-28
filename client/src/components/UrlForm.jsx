import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUrl } from "../features/urls/urlSlice";

function UrlForm() {
  const [longUrl, setLongUrl] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createUrl({ longUrl }));
    setLongUrl("");
  };

  return (
    <section className="form">
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
    </section>
  );
}

export default UrlForm;
