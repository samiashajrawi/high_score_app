/** 
Score table test
- It is simple react component which tests react-dom, render, and act
- I chose this test because:
-      - It is important part of UI where user can see the scores and real time preview
-      - To test react component
*/
import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ScoresTable from '../../src/features/scores/scoresTable';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const scores = [{ name: "Jane Doe", totalPoints: 157, clicks: 5 },

{ name: "Lily Allen", totalPoints: 234, clicks: 8 },

{ name: "John Smith", totalPoints: 390, clicks: 10 , isPreview: true}];
it("ScoresTable renders without scores", () => {
    act(() => {
      render(<ScoresTable />, container);
    });
    //Table should not render if Array is empty or undefined
    expect(container.textContent).toBe("");
});
it("ScoresTable renders with scores", () => {
  
  act(() => {
    render(<ScoresTable scores={scores}/>, container);
    });
    //Table should have number of row equal the array length puls one for header
    expect(container.querySelectorAll("tr").length).toBe(scores.length + 1);
});

it("ScoresTable renders with a preview score", () => {
  
  act(() => {
    render(<ScoresTable scores={scores}/>, container);
    });
    //Table should have one preview row
    expect(container.querySelectorAll(".preview").length).toBe(1);
});
