import {useState} from 'react';

const postScore = async function(data) {
    const response = await fetch("http://localhost:8000/HighScoreApp/", {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    return response.json();
}

const HighScoreApp = () => {
    const [currentScore, setCurrentScore] = useState(0);
    const [name, setName] = useState("");
    const [counter, setCounter] = useState(0);

    const getScore = function() {
        setCurrentScore(Math.floor(Math.random() * 200 - 100));
        setCounter(1 + counter);
    }
    
    const onChangeHandler = function(event) {
        setName(event.target.value);
    }

    const resetForm = () => {
        setCurrentScore(0);
        setName("")
        setCounter(0);
    }
    const handleSubmit = function(event) {
        event.preventDefault();
        const response = postScore({
            name: name,
            totalPoints: currentScore,
            clicks: counter
        })

        response.then(data => {
            console.log(data); // JSON data parsed by `data.json()` call

            resetForm();
        });
    }

    return <form onSubmit={handleSubmit}>
        <div>
            <input type="button" value="Get score" onClick={getScore} disabled={(counter > 10)? "disabled" : ""} />
        </div>
        <div>
            <label>
                Current score:{currentScore}
            </label>
        </div>
        <div>
            <label>
                Name:
                <input type="text" name="name" value={name} onChange={onChangeHandler}/>
            </label>
        </div>
        <input type="submit" value="Submit" disabled={(currentScore === 0)? "disabled" : ""} />
  </form>
}

export default HighScoreApp;
