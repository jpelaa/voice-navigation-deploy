import React from "react";
import VoiceSearch from "./icons/VoiceSearch";
import Fuse from "fuse.js";
import { withRouter } from "react-router";

const SpeechRecognition = (props) => {
  const {
    handleMouseDown,
    handleMouseUp,
    showTip,
    redirectUrl,
    history,
    setError,
    error,
  } = props;

  React.useEffect(() => {
    if (redirectUrl) {
      const pages = [
        "home",
        "blog",
        "report",
        "contact",
        "blog1",
        "blog2",
        "blog3",
      ];
      const urls = {
        home: "/",
        blog: "/blog",
        report: "/report",
        contact: "/contact",
        blog1: "/blog/blog1",
        blog2: "/blog/blog2",
        blog3: "/blog/blog3",
      };
      const options = {
        isCaseSensitive: false,
        includeScore: true,
        shouldSort: true,
        keys: [],
      };
      const fuse = new Fuse(pages, options);
      const filtered = fuse.search(redirectUrl);
      const prop = filtered.length > 0 ? filtered[0].item : "";

      if (pages.includes(prop)) {
        history.push(urls[prop]);
        setError("");
      } else {
        setError("please try again");
      }
    }
  }, [redirectUrl]);

  return (
    <>
      <div id="visualization">
        {error.length > 0 && <p class="error">{error}</p>}
      </div>
      <div
        id="button"
        className="mic shadow"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <VoiceSearch />
        <div id="contents"></div>
      </div>
      {showTip && (
        <div id="bars">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      )}
      <div id="tip" className={showTip ? "show" : ""}>
        Press and hold to speak
      </div>
    </>
  );
};

export default withRouter(SpeechRecognition);
