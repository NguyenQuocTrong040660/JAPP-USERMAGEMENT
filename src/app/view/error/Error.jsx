import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { getLangText } from "../../utils/@lang";

export default function Error404() {
  const language = useSelector((state) => state.language);

  return (
    <div className="not-found-wrap text-center">
      <Player
        autoplay
        loop
        src="/assets/json/404.json"
        style={{ height: "300px", width: "300px" }}
      />
      <p className="mb-5 text-muted text-18">
        {getLangText("404page", language.lang)}
      </p>
      <Link to="/home" className="btn btn-lg btn-primary btn-rounded">
        {getLangText("gobacktohome", language.lang)}
      </Link>
    </div>
  );
}
