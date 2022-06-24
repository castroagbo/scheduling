import React from "react";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function TeamItems({ boardData }) {
  return (
    <>
      {boardData
        .filter((r) => r.colType === "teams")
        .map((board, bIndex) => {
          return (
            <Droppable
              droppableId={board.id}
              key={board.id}
              // isDropDisabled={true}
            >
              {(provided, snapshot) => (
                <div {...provided.droppableProps}>
                  <div
                    style={{
                      minHeight: 120,
                      maxHeight: "calc(100vh - 290px)",
                      overflowY: "auto",
                      width: "200px",
                    }}
                    ref={provided.innerRef}
                    className={`bg-gray-100 rounded-md shadow-md
                            flex flex-col relative overflow-hidden
                            ${snapshot.isDraggingOver && "bg-green-100"}`}
                  >
                    <span
                      className="w-full h-1 bg-gradient-to-r from-pink-700 to-red-200
                          absolute inset-x-0 top-0"
                    ></span>
                    <h4 className=" p-3 flex justify-between items-center mb-2">
                      <span className="text-2xl text-gray-600">
                        {board.name}
                      </span>
                    </h4>

                    {board.items.map((item, iIndex) => {
                      return (
                        <Draggable
                          key={item.id.toString()}
                          index={iIndex}
                          draggableId={item.id.toString()}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white rounded-md p-3 m-3 mt-0 last:mb-0"
                            >
                              <h5 className="text-md my-3 text-lg leading-6">
                                {item.title}
                              </h5>
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
          );
        })}
    </>
  );
}

export default TeamItems;
