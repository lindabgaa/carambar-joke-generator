import axios from "axios";
import { useState } from "react";

import "./App.css";

function App() {
  const [joke, setJoke] = useState(null);
  const [errorMessage, setErrorMessage] = useState(
    "Oups, impossible de récupérer une blague pour le moment. Réessaye plus tard !"
  );

  const handleButtonClick = async () => {
    setErrorMessage(null);

    try {
      const response = await axios.get(
        "https://carambar-jokes-api.onrender.com/api/v1/jokes/random"
      );

      const jokeData = response.data;

      const { question, answer } = jokeData;

      if (!question && !answer) {
        setJoke(null);
        throw new Error(
          "Unable to retrieve a joke: both question and answer are missing."
        );
      } else if (!question) {
        setJoke(null);
        throw new Error("Unable to retrieve a joke: question is missing.");
      } else if (!answer) {
        setJoke(null);
        throw new Error("Unable to retrieve a joke: answer is missing.");
      }

      setJoke({ question, answer });
    } catch (error) {
      console.log(error);
      setJoke(null);
      setErrorMessage(
        "Oups, impossible de récupérer une blague pour le moment. Réessaye plus tard !"
      );
    }
  };

  return (
    <main>
      <header>
        <h1>Carambar & Co </h1>
      </header>

      <section>
        <p className="intro">Un clic, une blague, un sourire !</p>

        <div className="joke-generator">
          <button
            type="button"
            onClick={handleButtonClick}
            aria-label="Obtenir une blague"
          >
            {!joke ? "Clique moi !" : "Encore !"}
          </button>

          {errorMessage ? (
            <p className="error-message">{errorMessage}</p>
          ) : joke ? (
            <div className="joke-display">
              <p className="joke-question">{joke.question}</p>
              <p className="joke-answer">{joke.answer}</p>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export default App;
