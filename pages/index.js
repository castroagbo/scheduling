import Layout from "../components/Layout";
import {
  boardsX,
  createGuidId,
  reorder,
  reorderRows,
} from "../data/board-data";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import TeamItems from "../components/TeamItems";
import MatchItem from "../components/MatchItem";

export default function Home() {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(boardsX);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);

  const [homeIndex, setHomeIndex] = useState(null);

  // console.log(boardData);

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  const onDragStart = (start) => {
    // console.log(start);

    const dropID = start.source.droppableId;
    setHomeIndex(dropID);
  };

  const onDragEnd = (re) => {
    if (!re.destination) return;
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    );
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    );
    setBoardData(newBoardData);
  };

  const onTextAreaKeyPress = (e) => {
    if (e.keyCode === 13) {
      //Enter
      const val = e.target.value;
      if (val.length === 0) {
        setShowForm(false);
      } else {
        const boardId = e.target.attributes["data-id"].value;
        const item = {
          id: createGuidId(),
          title: val,
          priority: 0,
          chat: 0,
          attachment: 0,
          assignees: [],
        };
        let newBoardData = boardData;
        newBoardData[boardId].items.push(item);
        setBoardData(newBoardData);
        setShowForm(false);
        e.target.value = "";
      }
    }
  };

  return (
    <Layout>
      <div className="p-10">
        {ready && (
          <DragDropContext
            onDragStart={onDragStart}
            onDragEnd={({ destination, source }) => {
              // console.log(source, destination);

              if (!destination) {
                return;
              }

              if (
                source.droppableId !== "teams" &&
                destination.droppableId === "teams"
              ) {
                return;
              }

              setBoardData(reorderRows(boardData, source, destination));
            }}
          >
            <div
              style={{
                display: "flex",
                margin: 20,
              }}
            >
              <TeamItems boardData={boardData} />
              <MatchItem boardData={boardData} setBoardData={setBoardData} />
            </div>
          </DragDropContext>
        )}
      </div>
    </Layout>
  );
}
