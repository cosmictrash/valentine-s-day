import React, { useState } from "react";
import "./App.css";

const flashRainbowColors = (callback) => {
  const colors = [
    "#ff0000",
    "#ff7f00",
    "#ffff00",
    "#00ff00",
    "#0000ff",
    "#4b0082",
    "#9400d3",
  ];
  let i = 0;
  const interval = setInterval(() => {
    document.body.style.backgroundColor = colors[i];
    i = (i + 1) % colors.length;
  }, 200); // Change color every 200 milliseconds

  setTimeout(() => {
    clearInterval(interval);
    document.body.style.backgroundColor = ""; // Reset background color
    if (callback) {
      callback();
    }
  }, 2000); // Flash colors for 2 seconds
};

function App() {
  const [activeImage, setActiveImage] = useState("cat"); // "cat" or "cat-heart"
  const [isQuestionVisible, setIsQuestionVisible] = useState(true);
  const [noButtonText, setNoButtonText] = useState("No");
  const [clickCount, setClickCount] = useState(0);
  const [isGifShown, setIsGifShown] = useState(false); // To control showing after gif text
  const [areButtonsVisible, setAreButtonsVisible] = useState(true); // Track button visibility
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [questionText, setQuestionText] = useState("Will you be my valentine?"); // State for the question text

  const noTexts = [
    "Are you sure about your decision?", // After 1st click
    "Don't you like these biceps, huh?", // After 2nd click
    "I can't believe this, KATTU KHA!", // After 3rd click
    "Muski, you really gonna say no to this??", // After 4th click
    "ZA nabol, katti!! asking for the last time!! ", // After 5th click (and onwards)
  ];

  const handleNoClick = () => {
    setClickCount((prevCount) => prevCount + 1);

    if (clickCount < 4) {
      setActiveImage(`no${clickCount + 1}`);
      setQuestionText(noTexts[clickCount]);
    } else {
      const area = document.getElementById("button-area");
      const noButton = document.getElementById("no-button");

      if (area && noButton) {
        const areaRect = area.getBoundingClientRect();
        const buttonWidth = noButton.offsetWidth;
        const buttonHeight = noButton.offsetHeight;

        const maxTop = areaRect.height - buttonHeight;
        const maxLeft = areaRect.width - buttonWidth;

        const randomTop = Math.random() * maxTop;
        const randomLeft = Math.random() * maxLeft;

        noButton.style.top = `${randomTop}px`;
        noButton.style.left = `${randomLeft}px`;
      }

      setQuestionText(noTexts[4]);
    }
  };

  const handleYesClick = () => {
    flashRainbowColors(() => {
      setIsQuestionVisible(false); // Hide the question
      setAreButtonsVisible(false); // Hide the buttons after Yes is clicked
      setActiveImage("cat-heart"); // Set the image to cat-heart

      setIsGifShown(true); // Show after gif text

      // Delay the audio playback by 500 milliseconds (adjust as needed)
      setTimeout(() => {
        setIsSongPlaying(true);
      }, 500); // 500 milliseconds delay before audio starts
    });
  };
  // Render cat or cat-heart image based on activeImage state
  const renderImage = () => {
    if (activeImage === "cat") {
      return <img src="/images/cat.png" alt="Cat" className="cat" />;
    } else if (activeImage === "cat-heart") {
      return (
        <img src="/images/cat-heart.gif" alt="Cat Heart" className="cat" />
      );
    } else if (activeImage.includes("no")) {
      return (
        <img
          src={`/images/${activeImage}.jpg`}
          alt={`No ${activeImage}`}
          className="cat"
        />
      );
    }
    return null;
  };

  return (
    <div className="App">
      <div>
        <img src="/Images/logo1.JPEG" alt="Logo" className="Logo" />
      </div>
      <div className="Proposal">
        <img src="/Images/no3.jpg" alt="No 3" className="No3Image" />
        <div className="ProposalText">
          <h1>I am sorry, I am quite late...</h1>
          <p>
            I know I have been a bit late to the party regarding asking you out
            for Valentine's Day. I am really sorry that I took so long. I had to
            keep it a surprise and I couldn't let you know that I was planning
            something while you were here. I can’t remember the last time I
            asked out someone for Valentine’s Day. I was pretty much lonely on
            Valentine’s Day for the longest time I can remember; however, this
            isn’t actually about me but us. I have never been this happy in a
            relationship. I love how we just get each other, I wonder if the
            placement of the planets and moons really led me to get together
            with you. This nerdy boy is doing his coding shenanigans to win you
            over, and I hope it helps (fingers crossed).
          </p>
        </div>
      </div>
      <div className="Reasons">
        <h1>REASONS YOU SHOULD GO OUT WITH ME:</h1>
        <h2>I can carry your bags</h2>
        <img src="/Images/carry.JPG" alt="carry 3" className="No3Image" />
        <h2>I care about you</h2>
        <img src="/Images/ph.jpg" alt="ph" className="No3Image" />
        <img src="/Images/ph1.jpg" alt="ph1" className="No3Image" />
        <img src="/Images/ph2.JPG" alt="ph2" className="No3Image" />
        <img src="/Images/ph3.jpg" alt="ph3" className="No3Image" />

        <h2>I have a nice body</h2>
        <img src="/Images/bd.jpg" alt="bd" className="No3Image" />
        <img src="/Images/bd1.jpg" alt="bd1" className="No3Image" />
        <img src="/Images/bd2.jpg" alt="bd2" className="No3Image" />
        <img src="/Images/bd3.jpg" alt="bd3" className="No3Image" />
        <h2>I buy you flowers</h2>
        <img src="/Images/f1.JPG" alt="No 3" className="No3Image" />
        <img src="/Images/f2.JPG" alt="No 3" className="No3Image" />
        <img src="/Images/f3.JPG" alt="No 3" className="No3Image" />
        <h2>I let you win at UNO</h2>
        <img src="/Images/u1.JPG" alt="No 3" className="No3Image" />
        <img src="/Images/u2.jpg" alt="No 3" className="No3Image" />
        <h2>This is literally us</h2>
        <img src="/Images/us.jpg" alt="No 3" className="No3Image" />
        <img src="/Images/us1.JPEG" alt="No 3" className="No3Image" />
      </div>

      <div id="container">
        <div
          id="button-area"
          style={{ position: "relative", display: "inline-block" }}
        >
          <div id="image-container">{renderImage()}</div>
          <div id="text-container">
            {isQuestionVisible && <div id="question">{questionText}</div>}
            {areButtonsVisible && (
              <div id="options">
                <button id="yes-button" onClick={handleYesClick}>
                  Yes
                </button>
                <button
                  id="no-button"
                  onClick={handleNoClick}
                  style={{ position: "absolute" }}
                >
                  {noButtonText}
                </button>
              </div>
            )}
          </div>
        </div>

        {isGifShown && (
          <>
            <div id="after-gif-text">
              <p>
                Let's Gooooo!!!!! OOO III III AAA III III <br />
                Thank you for being my valentine!
              </p>
            </div>
            {isSongPlaying && (
              <audio autoPlay loop>
                <source src="/song.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
