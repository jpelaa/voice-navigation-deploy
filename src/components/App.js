import React, { useState } from "react";
import HomePage from "./Home";
import BlogPage from "./Blog";
import Report from "./Report";
import ContactPage from "./Contact";
import { BrowserRouter, Route, Link } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Speech from "./Speech";
import BlogDetails from "./BlogDetails";
import { TABLE_DATA } from "./Data";
import Fuse from "fuse.js";
function App() {
  const commands = [
    {
      command: ["Go to * page", "Go to *", "Open * page", "Open *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
    {
      command: ["Sort by *", "Sort *"],
      callback: (sort) => setSort(sort),
    },
  ];

  const [showTip, setShowTip] = React.useState(false);
  const [table, setTable] = React.useState(TABLE_DATA);
  const [sortName, setSort] = React.useState("");
  const [error, setError] = React.useState("");
  const [redirectUrl, setRedirectUrl] = useState("");

  React.useEffect(() => {
    console.log(sortName, " sortName ");
    if (sortName) {
      const list = ["firstName", "lastName", "jobTitle", "Twitter"];
      const options = {
        isCaseSensitive: false,
        includeScore: true,
        shouldSort: true,
        keys: [],
      };
      const fuse = new Fuse(list, options);
      const pattern = sortName;
      const filtered = fuse.search(pattern);
      const prop = filtered.length > 0 ? filtered[0].item : "";

      if (prop) {
        const sortedTable = [
          ...table.sort((a, b) => {
            if (a[prop] > b[prop]) {
              return 1;
            } else if (a[prop] < b[prop]) {
              return -1;
            }
            return 0;
          }),
        ];

        setTable(sortedTable);
        setError("");
      } else {
        setError("please try again");
      }
    }
  }, [sortName]);

  const { transcript } = useSpeechRecognition({ commands });

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return "Web browser not support audio";
  }

  const handleMouseDown = () => {
    setShowTip(true);
    SpeechRecognition.startListening();
  };

  const handleMouseUp = () => {
    setShowTip(false);
    SpeechRecognition.stopListening();
  };
  return (
    <div>
      <BrowserRouter>
        <div
          id="links"
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
            backgroundColor: "#333",
            marginTop: "10px",
            padding: "10px",
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/report">Reports</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <Route path="/" exact component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/blog" exact component={BlogPage} />
        <Route
          path="/report"
          component={(props) => <Report {...props} table={table} />}
        />
        <Route path="/contact" component={ContactPage} />
        <Route path="/blog/:id" component={BlogDetails} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Speech
            handleMouseDown={handleMouseDown}
            handleMouseUp={handleMouseUp}
            showTip={showTip}
            redirectUrl={redirectUrl}
            setError={setError}
            error={error}
          />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
