## Getting started

This repository was setup with [`create-react-app`](https://github.com/facebook/create-react-app).
To run the web application:

1. Simply install dependencies with: `yarn`.
2. Start the application with: `yarn start`.
3. Open your web browser to [localhost:3000](localhost:3000).

## JSON server

To start json server

```
cd json-mock-api
```

Install JSON Server

```
yarn install
```

Start JSON Server

```
json-server --watch src/db.json --port 8000
```

Now if you go to `http://localhost:8000/HighScoreApp/`, you'll get the HighScoreApp JSON.

## Code Challenge Comments

### Tests

I wrote tests for three files; `scoreGetter`, `scoresTable`, and `scoresSlice`. I chose these three files to show test variety, and because they are crucial to the app.


#### Score Getter Test:
- I used custom render to render the getter card
- I used fireEvent to check dom changes with each event
- I chose this test because:

    - It is important part of UI where user interacts and plays the game
    - To test react-redux component
    - It works with fireEvent and screen


#### Score Slice Test
- Test where scores get posted, updated, and filltered
- I chose this test because:

    - It is the brain of scores list, and where we manipulate the scores
    - To test reducers and actions


#### Score Table Test
- It is simple react component which tests react-dom, render, and act
- I chose this test because:

    - It is important part of UI where user can see the scores and real time preview
    - To test react component


### Options: developer’s choice:

#### Pros and cons of limiting the number of clicks to ten:
 ##### Pros:
  1. The game will be more challenging as the user knows they have only ten clicks to  choose a score from
 ##### Cons:
  1. With ten clicks only, the user will be less interactive with the app as they spend less time with it
  2. The user will have less control over their score as it will depend merely on their luck. They will not have options  for continuous clicking till achieving the desired score

#### Pros and cons of  resetting the ten clicks after the 10th click:
 ##### Pros:
  1. It increases the time of user’s interaction
  2. The user will have more control over their score as they can keep clicking until reaching the desired score
 ##### Cons:
  1. There is a great chance that the user  loses their score by mistake with the automatic resetting after the 10th click

 #### Rather  than just  reset the ten clicks automatically, I designed a reset button that has the following pros and cons:
  ##### Pros:
   1. The user will be more interactive with the app as they click the reset button
   2. The user will have control over the number of clicks. They can click “Reset”  anytime to start over
   3. The user will also have control over their score as they can keep clicking until reaching the desired score
   4. There will be less room for a mistake to lose the score  after the 10th click as the user has to reset the whole process consciously
   5. The game will be more exciting, and the user will spend more time on the game

  ##### Cons:
   1. The game will be less challenge as the user can do reset any time until they get the desired score and average

### Bounces:

1. Toggle the table display between the top 10 total points, or the top 10 avg points per click. Please see the screenshots below:

<img width="350" alt="Screen Shot 2021-07-11 at 11 27 46 PM" src="https://user-images.githubusercontent.com/6185972/125241903-e89a4080-e2a0-11eb-8c03-ee1d5ca4fdcb.png">

<img width="350" alt="Screen Shot 2021-07-11 at 11 27 54 PM" src="https://user-images.githubusercontent.com/6185972/125241925-ef28b800-e2a0-11eb-840a-6b421ab3f304.png">

<img width="350" alt="Screen Shot 2021-07-11 at 11 28 02 PM" src="https://user-images.githubusercontent.com/6185972/125241935-f4860280-e2a0-11eb-940b-a7dec6981dab.png">

2. Responsive Design:

##### Wide Screen View

<img width="969" alt="Screen Shot 2021-07-12 at 2 35 11 PM" src="https://user-images.githubusercontent.com/6185972/125358969-7a945e80-e31e-11eb-8f74-f168c31fe771.png">

##### Mobile Screen View

<img width="355" alt="Screen Shot 2021-07-12 at 2 35 23 PM" src="https://user-images.githubusercontent.com/6185972/125358957-76684100-e31e-11eb-8990-db97904ddd38.png">

3. What API parameters would you request from a BE developer to optimize data processing on the front end? Assume those parameters are made available to you, and incorporate them into your code.

   - I added id parameter to the scores array objects that come from API. I used this id to know if a new input is a new score or an updated score, and send the post request accordingly.

   - I will request API to get sorted scores from BE developer. Instead of handling big data at FE. BE API should just return the top 10 values that will  be displayed to the user. I didn't add this to my code.

## Questions?

Email Samya Shajrawi at [samiashajrawi@gmail.com](mailto:samiashajrawi@gmail.com).
