import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectTopScores, fetchScores, changeTopTen } from './scoresSlice'
import Message from '../atoms/message'
import ScoresTable from './scoresTable'
import OrderSelect from './orderSelect'

const ScoresList = () => {
    const dispatch = useDispatch()
    const scores = useSelector(selectTopScores)

    const scoresStatus = useSelector((state) => state.scores.status)
    const error = useSelector((state) => state.scores.error)

    useEffect(() => {
        if (scoresStatus === 'idle') {
            dispatch(fetchScores())
        }
    }, [scoresStatus, scores, dispatch])

    if (scoresStatus === 'loading') {
        return <Message color="positive" message="Loading..." />
    } 
    if (scoresStatus === 'error') {
        return <Message color="negative" message={error} />
    }
    const handelOrderChange = function(e) {
        dispatch(changeTopTen({order: e.target.value}))
    }

    return <div>
        <ScoresTable scores={scores} />
        <OrderSelect onChange={handelOrderChange}/>
    </div>
}

export default ScoresList;