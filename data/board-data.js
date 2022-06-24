import { DraggableLocation } from "react-beautiful-dnd";

export const boardsX = [
  {
    id: "teams",
    name: "Teams",
    colType: "teams",
    items: [
      {
        id: 1,
        title: "Team A",
      },
      {
        id: 2,
        title: "Team B",
      },
      {
        id: 3,
        title: "Team C",
      },
      {
        id: 4,
        title: "Team D",
      },
      {
        id: 5,
        title: "Team E",
      },
      {
        id: 6,
        title: "Team F",
      },
      {
        id: 7,
        title: "Team G",
      },
      {
        id: 8,
        title: "Team H",
      },
    ],
  },
  // {
  //   id: createGuidId(),
  //   name: "Matches",
  //   colType: "matches",
  //   items: [],
  // },
];

const initialData = {
  columnOrder: ["teams", "matches"],
};

export function createGuidId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  // console.log(list, startIndex, endIndex);
  const result = Array.from(list);

  const [removed] = result.splice(startIndex, 1);

  console.log({ removed });
  result.splice(endIndex, 0, removed);

  return result;
};

export const reorderRows = (rows, source, destination) => {
  // console.log(rows, source, destination);
  const current = rows.find((x) => x.id === source.droppableId);
  const next = rows.find((x) => x.id === destination.droppableId);
  const target = current.items[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current.items, source.index, destination.index);
    return rows.map((x) =>
      x.id === source.droppableId
        ? {
            ...x,
            items: reordered,
          }
        : x
    );
  }

  // moving to different list

  // remove from original
  current.items.splice(source.index, 1);
  // insert into next
  next.items.splice(destination.index, 0, target);

  return rows.map((x) => {
    if (x.id === source.droppableId) {
      return {
        ...x,
        items: current.items,
      };
    } else if (x.id === destination.droppableId) {
      return {
        ...x,
        items: next.items,
      };
    }

    return x;
  });
};
