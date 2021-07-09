/** 
Score slice test
- Test where scores get posted, updated, and filltered
- I chose this test because:
-      - It is the brain of scores list. And where manipulate the scores
-      - To test reducers and actions
*/



import reducer, { initialState, changeTopTen, previewScore, clearPreviewScore, selectTopScores } from '../../src/features/scores/scoresSlice';

const currentState = {
    scores: [
    {
      "name": "Jane Doe",
      "totalPoints": 50,
      "clicks": 5,
      "id": 1
    },
    {
      "name": "Lily Allen",
      "totalPoints": 34,
      "clicks": 8,
      "id": 2
    },
    {
      "name": "John Smith",
      "totalPoints": 90,
      "clicks": 1,
      "id": 3
    },
    {
      "id": 4,
      "name": "Samya Shajrawi",
      "totalPoints": 97,
      "clicks": 10
    },
    {
      "name": "Laila",
      "totalPoints": 15,
      "clicks": 1,
      "id": 5
    },
    {
      "name": "Liane",
      "totalPoints": -94,
      "clicks": 1,
      "id": 6
    },
    {
      "name": "Tom",
      "totalPoints": -53,
      "clicks": 1,
      "id": 7
    },
    {
      "name": "Alin",
      "totalPoints": 5,
      "clicks": 1,
      "id": 8
    },
    {
      "name": "Kem",
      "totalPoints": -54,
      "clicks": 1,
      "id": 9
    },
    {
      "name": "Alis",
      "totalPoints": 78,
      "clicks": 5,
      "id": 10
    },
    {
      "name": "Nancy",
      "totalPoints": 53,
      "clicks": 10,
      "id": 11
    },
    {
      "name": "Jo",
      "totalPoints": 88,
      "clicks": 1,
      "id": 12
    },
    {
      "name": "samya shajrawi",
      "totalPoints": 21,
      "clicks": 1,
        "id": 13,
      isPreview: true
    }
  ],
    status: 'idle',
    error: null,
    postStatus: 'idle',
    order: 'total'
}
describe('scores slice', () => {
  describe('reducer, actions and selectors', () => {    
    it('previewScore should added within scores list', () => {

        const nextState = reducer(initialState, previewScore({
            payload: {
                name: 'Sam Jouy',
                totalPoint: 90,
                clicks: 2
        } }));

      // Assert
        expect(nextState.scores.length).toEqual(1);
        expect(nextState.scores[0].isPreview).toEqual(true);
    });

    it('clearPreviewScore, should remove all previews from score', () => {

        const nextState = reducer(currentState, clearPreviewScore());

      // Assert
        expect(nextState.scores.length).toEqual(currentState.scores.length - 1);
        expect(nextState.scores.filter(item => item.isPreview === true)).toEqual([]);
    });

    it('changeTopTen, should return top 10 total points', () => {

        const nextState = reducer(currentState, changeTopTen({ order: 'total' }));
        
        const rootState = { scores: nextState };
        const topTen = selectTopScores(rootState);
        expect(topTen.length).toEqual(10);
        expect(topTen[0].id).toEqual(4);

        
    });
      
    it('selectTopScores, should return top ten scores avg.', () => {
        const nextState = reducer(currentState, changeTopTen({ order: 'avg' }));
        
        const rootState = { scores: nextState };
        const topTen = selectTopScores(rootState);
        expect(topTen.length).toEqual(10);
        expect(topTen[0].id).toEqual(3);
    });
  });
});
