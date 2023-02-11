import { useRef, useEffect } from "react";
import "./App.css";

function App() {
  const vidRef = useRef();

  useEffect(() => {
    vidRef.current.play();
  }, []);

  function typewrite() {
    let txtType = function (el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 1) || 1;
      this.txt = "";
      this.tick();
      this.isDeleting = false;
    };
    txtType.prototype.tick = function () {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
      this.el.innerHTML = '<span className="wrap">' + this.txt + "</span>";
      var that = this;
      var delta = 200 - Math.random() * 200;
      if (this.isDeleting) {
        delta /= 2;
      }
      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 100;
      }
      setTimeout(function () {
        that.tick();
      }, delta);
    };
    window.onload = function () {
      var elements = document.getElementsByClassName("typewrite");
      for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-type");
        var period = elements[i].getAttribute("data-period");
        if (toRotate) {
          new txtType(elements[i], JSON.parse(toRotate), period);
        }
      }
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".typewrite > .wrap { border-right: 0.01em solid #fff}";
      document.body.appendChild(css);
    };
  }

  return (
    <>
      <body className="mainFirst" style={{ overflowY: "hidden" }}>
        <video
          ref={vidRef}
          loop
          muted
          id="bg-video"
          style={{
            maxWidth: "100%",
            backgroundSize: "cover",
            position: "fixed",
          }}
        >
          <source src="/bg3.mp4" type="video/mp4" />
        </video>
        <div
          className="container"
          style={{ position: "relative", marginTop: "16%" }}
        >
          <div className="container-fluid">
            <div className="d-flex justify-content-center">
              <h1
                style={{
                  fontWeight: 900,
                  fontStyle: "oblique",
                  color: "white",
                }}
                id="main1"
              >
                Welcome
              </h1>
            </div>
            <div
              style={{ paddingTop: "1%" }}
              className="d-flex justify-content-center"
            >
              <h2
                id="main2"
                href=""
                className="typewrite"
                data-period="1"
                data-type='[ "Supports 2G Technology","Supports 3G Technology","Supports 4G Technology","Supports 5G Technology","Supports Virtual RAN Technology" ]'
                style={{
                  fontWeight: 800,
                  color: "white",
                }}
                onLoad={typewrite()}
              >
                <div className="wrap"></div>
              </h2>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default App;
