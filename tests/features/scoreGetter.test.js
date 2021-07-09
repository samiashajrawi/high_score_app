/** 
Score getter test
- I used custom render to render the getter card
- I used fireEvent to check dom changes with each event
- I chose this test because:
-      - It is important part of UI where user interacts and plays the game
-      - To test react-redux component
-      - It works with fireEvent and screen
*/


import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, screen } from '../test-utils'
import ScoreGetter from '../../src/features/getter/scoreGetter'

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

// We use msw to intercept the network request during the test,
// and return the response after 150ms
// when receiving a get request to the `http://localhost:8000/HighScoreApp/` endpoint
export const handlers = [
  rest.get('http://localhost:8000/HighScoreApp/', (req, res, ctx) => {
    return res(ctx.json(currentState.scores), ctx.delay(150))
  }),
  rest.post('http://localhost:8000/HighScoreApp/', (req, res, ctx) => {
    return res(ctx.json(currentState.scores[1]), ctx.delay(150))
  }),
  rest.put('http://localhost:8000/HighScoreApp/3', (req, res, ctx) => {
    return res(ctx.json(currentState.scores[2]), ctx.delay(150))
  })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('ScoreGetter', async () => {
  render(<ScoreGetter />)

  // should show High Score Game at header
  expect(screen.getByText(/High Score Game/i)).toBeInTheDocument();

  //at start reset and submit should be disabled
  expect(screen.getByTestId('reset')).toBeDisabled()
  expect(screen.getByTestId('submit')).toBeDisabled()

  // Click get Score
  fireEvent.click(screen.getByTestId('get'));

  //Button reset should be enabled but submit still disabled

  expect(screen.getByText(`You have 9 out of 10 clicks`)).toBeInTheDocument();
  expect(screen.getByTestId('reset')).toBeEnabled()
  expect(screen.getByTestId('submit')).toBeDisabled()

  // Enter name
  fireEvent.change(screen.getByTestId('name'), { target: { value: 'Samya Shajrawi' } })

  //Button reset and submit should be enabled

  expect(screen.getByTestId('reset')).toBeEnabled()
  expect(screen.getByTestId('submit')).toBeEnabled()

  // Click get score more 9 times
  for (let i = 1; i < 10; i++) {
    expect(screen.getByText(`You have ${10 - i} out of 10 clicks`)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('get'));
  }
  
  // Button get score will be disabled
  expect(screen.getByTestId('get')).toBeDisabled()
  //You are out of clicks will be show
  expect(screen.getByText(/You are out of clicks/i)).toBeInTheDocument();
})