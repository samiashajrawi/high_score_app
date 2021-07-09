import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getScore, setName, resetAll } from './getterSlice'
import { addNewScore, updateScore, clearStatus, previewScore, clearPreviewScore } from '../scores/scoresSlice'
import { useEffect } from 'react';
import Message from '../atoms/message'

let timerA;

const ScoreGetter = () => {
    const dispatch = useDispatch()
    const currentScore = useSelector((state) => state.getter.currentScore);
    const totalPoints = useSelector((state) => state.getter.totalPoints);
    const name = useSelector((state) => state.getter.name);
    const counter = useSelector((state) => state.getter.counter);
    const scores = useSelector((state) => state.scores.scores);
    const postStatus = useSelector((state) => state.scores.postStatus);
    const error = useSelector((state) => state.scores.error);
    
    useEffect(()=> {
        if(currentScore !== '') {
            dispatch(previewScore({
                name: name,
                totalPoints: totalPoints,
                clicks: counter
            }));
        }
    }, [name, currentScore, dispatch, counter])
    
    const onChangeHandler = function(event) {
        dispatch(setName(event.target.value));
    }

    const handleSubmit = function(event) {
        event.preventDefault();
        if(name === "" || currentScore === 0) {
            return;
        }
        dispatch(clearPreviewScore());

        // Check input name already exists fetch PUT otherwaise fetch POST
        const found =  scores.find(element => element.name === name);

        if (found && found.id) {
            dispatch(updateScore({
                id: found.id,
                name: name,
                totalPoints: totalPoints,
                clicks: counter
            }));
        } else {
            dispatch(addNewScore({
                name: name,
                totalPoints: totalPoints,
                clicks: counter
            }));
        }
        
        dispatch(resetAll());
    }

    const reset = function() {
        dispatch(resetAll());
        dispatch(clearPreviewScore());
    }

    if (postStatus){
        timerA = setInterval(function () {
            clearInterval(timerA);
            dispatch(clearStatus());
        }, 10000)
    }
    
    return (
    <div className="card">
        {postStatus === 'succeeded' ? <Message color="positive" message="Your score saved successful" /> : postStatus === 'failed' ? `<Message color="negative" message="${error}" />` : ""}
        <div className="main-header">High Score Game</div>
         <form onSubmit={handleSubmit}>
            <div>
                    {currentScore === "" ? <label>Click <b>Get Score</b> to start the game.</label> : <label>Current score: <b>{currentScore}</b></label>}
                    <label>Total Points: <b>{totalPoints}</b></label>
                    <input className="name" type="button" data-testid="get" value="Get Score" onClick={() => {dispatch(getScore())}} disabled={(counter >= 10)? "disabled" : ""} />
                    <p>{counter === 10 ? `You are out of clicks`: `You have ${10 - counter} out of 10 clicks`}</p>
            </div>
            <div>
                <label><b>
                    Name:*
                </b></label>
                    <input className="name" data-testid="name" type="text" name="name" value={name} onChange={onChangeHandler}/>
            </div>
            <div className="buttons">
                <input className="submit"  data-testid="reset" type="reset" value="Reset" disabled={(currentScore === '')? "disabled" : ""} onClick={reset} />
                <input className="submit"  data-testid="submit" type="submit" value="Send it!" disabled={(currentScore === '' || name === "") ? "disabled" : ""} />
            </div>
            <p>Click <b>Send it</b> to save your score.</p>
            <p>Click <b>Reset</b> to start over.</p>
    </form>
  </div>)
}

export default ScoreGetter;