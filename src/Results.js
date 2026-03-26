import React from "react";
import Meaning from "./Definition";

export default function Results(props) {
  if (props.results) {
    // Safely look through the API data to find a REAL audio link
    let audioUrl = "";
    if (props.results.phonetics) {
      const validPhonetic = props.results.phonetics.find(function (phonetic) {
        return phonetic.audio && phonetic.audio !== "";
      });
      if (validPhonetic) {
        audioUrl = validPhonetic.audio;
      }
    }

    // Function to play the sound
    function playAudio() {
      if (audioUrl) {
        let audio = new Audio(audioUrl);
        audio.play();
      }
    }

    return (
      <div className="Results">
        <section>
          <div className="d-flex align-items-center mb-3">
            <h2 className="mb-0 me-3 fw-bold text-capitalize" style={{ fontSize: "40px" }}>
              {props.results.word}
            </h2>
            
            {/* The button only shows up if we successfully found a valid audio URL */}
            {audioUrl && (
              <button 
                onClick={playAudio} 
                className="btn btn-primary btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: "45px", height: "45px" }}
                title="Listen to pronunciation"
              >
                <i className="fa-solid fa-volume-high"></i>
              </button>
            )}
          </div>
        </section>

        {props.results.meanings.map(function (meaning, index) {
          return (
            <section key={index} className="mt-3">
              <Meaning meaning={meaning} />
            </section>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}