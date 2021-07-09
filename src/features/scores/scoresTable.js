import React from 'react';
import Cell from "../atoms/cell";
import HeaderCell from "../atoms/headerCell";

const ScoresTable = ({ scores }) => {
  if (!scores || !scores.length) {
    return <></>;
  }

  const colTitles = {
    name: "Name",
    totalPoints: "Total Points",
    clicks: "Clicks",
    average: "Avg. Points Per Click",
  };
  const columns = Object.keys(colTitles);
  const getColTitle = (col) => {
    return colTitles[col];
  };

  const newLocal = "preview";
  // Render
  return (
    <div>
      <div className="main-header">Leaderboard Table </div>
      <table>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <HeaderCell key={i} title={getColTitle(col)} />
            ))}
          </tr>
        </thead>
        <tbody>
          {scores.map((row, i) => (
            <tr key={i} className={row.isPreview ? newLocal : ""}>
              {columns.map((col, j) => {
                if (col === "average") {
                  return (
                    <Cell
                      key={j}
                      content={(row.totalPoints / row.clicks).toFixed(2)}
                    />
                  );
                }

                return <Cell key={j} content={row[col]} />;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoresTable;
