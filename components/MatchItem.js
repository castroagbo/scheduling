import React from "react";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { createGuidId, reorder } from "../data/board-data";

function MatchItem({ boardData, setBoardData }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // border: "2px solid red",
        alignItems: "center",
        minWidth: 900,
        maxHeight: "calc(100vh - 290px)",
        overflowY: "auto",
      }}
    >
      <button
        style={{
          color: "black",
          backgroundColor: "lightgreen",
          borderRadius: 5,
          padding: "1px 10px",
          textTransform: "uppercase",
        }}
        onClick={() => {
          setBoardData((data) => [
            ...data,
            {
              id: createGuidId(),
              name: "Matches",
              colType: "matches",
              items: [],
            },
          ]);
        }}
      >
        add row
      </button>
      {boardData
        .filter((r) => r.colType === "matches")
        .map((board, bIndex) => {
          return (
            <div
              key={board.id}
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "20px 0",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <button
                    style={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderRadius: 5,
                      padding: "1px 10px",
                      textTransform: "uppercase",
                    }}
                    onClick={() => {
                      setBoardData([
                        ...boardData.filter((r) => r.colType === "teams"),
                        ...reorder(
                          boardData.filter((r) => r.colType === "matches"),
                          bIndex,
                          bIndex - 1
                        ),
                      ]);
                    }}
                  >
                    up
                  </button>
                  <button
                    style={{
                      color: "black",
                      backgroundColor: "lightblue",
                      borderRadius: 5,
                      padding: "1px 10px",
                      textTransform: "uppercase",
                    }}
                    onClick={() => {
                      setBoardData([
                        ...boardData.filter((r) => r.colType === "teams"),
                        ...reorder(
                          boardData.filter((r) => r.colType === "matches"),
                          bIndex,
                          bIndex + 1
                        ),
                      ]);
                    }}
                  >
                    down
                  </button>
                </div>
              </div>
              <Droppable
                droppableId={board.id.toString()}
                isCombineEnabled={false}
                direction="horizontal"
              >
                {(provided, snapshot) => (
                  <div {...provided.droppableProps}>
                    <div
                      style={{
                        display: "flex",
                        minHeight: 90,
                        overflowX: "auto",
                        minWidth: "400px",
                        maxWidth: "500px",
                      }}
                      ref={provided.innerRef}
                      className={`bg-gray-100 rounded-md
                    ${snapshot.isDraggingOver && "bg-green-100"}`}
                    >
                      {board.items.map((item, iIndex) => {
                        return (
                          <Draggable
                            index={iIndex}
                            draggableId={item.id.toString()}
                            key={item.id.toString()}
                          >
                            {(dragProvided) => (
                              <div
                                ref={dragProvided.innerRef}
                                {...dragProvided.draggableProps}
                                {...dragProvided.dragHandleProps}
                                className="bg-white rounded-md p-3 m-3 mt-0 last:mb-0"
                              >
                                <h5 className="text-md my-3">{item.title}</h5>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>

              <div
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  display: "flex",
                  flexDirection: "row",
                  width: "20%",
                }}
              >
                <input type="time" />
                <button
                  onClick={() => {
                    setBoardData(
                      boardData
                        .filter((x) => x.id !== board.id)
                        .map((x) =>
                          x.id === "teams"
                            ? {
                                ...x,
                                items: [...board.items, ...x.items],
                              }
                            : x
                        )
                    );
                  }}
                  style={{
                    height: 30,
                    width: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "row",
                    border: "1px solid red",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    color: "white",
                  }}
                >
                  x
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default MatchItem;
