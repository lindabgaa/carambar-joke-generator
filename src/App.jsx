import axios from "axios";
import { useState } from "react";

import "./App.css";

function App() {
  const [joke, setJoke] = useState(null);

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(
        "https://carambar-jokes-api.onrender.com/api/v1/jokes/random"
      );

      const jokeData = response.data;

      const { question, answer } = jokeData;

      if (!question || !answer) {
        return;
      }

      setJoke({ question, answer });
    } catch (error) {
      console.log(error);
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
          {joke && (
            <div className="joke-display">
              <p className="joke-question">{joke.question}</p>
              <p className="joke-answer">{joke.answer}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
