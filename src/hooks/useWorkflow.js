import { useReducer, useCallback } from "react";
import { createNode } from "../utils/nodeFactory";

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const init = () => {
  const start = createNode("start", "Start");
  return {
    past: [],
    present: { [start.id]: start },
    future: [],
  };
};

function reducer(state, action) {
  switch (action.type) {
    case "SET":
      return {
        past: [...state.past, state.present],
        present: action.payload,
        future: [],
      };

    case "UNDO": {
      if (!state.past.length) return state;
      const previous = state.past[state.past.length - 1];
      return {
        past: state.past.slice(0, -1),
        present: previous,
        future: [state.present, ...state.future],
      };
    }

    case "REDO": {
      if (!state.future.length) return state;
      const next = state.future[0];
      return {
        past: [...state.past, state.present],
        present: next,
        future: state.future.slice(1),
      };
    }

    default:
      return state;
  }
}

export function useWorkflow() {
  const [state, dispatch] = useReducer(reducer, null, init);
  const nodes = state.present;
  const rootId = Object.keys(nodes)[0];

  const commit = useCallback((next) => {
    dispatch({ type: "SET", payload: next });
  }, []);

  const addNode = (parentId, type, branchKey = null) => {
    const next = deepClone(nodes);
    const parent = next[parentId];
    const newNode = createNode(type, type.toUpperCase());

    if (parent.type === "branch") {
      if (!branchKey) return;
      parent.branches[branchKey] = newNode.id;
    } else {
      parent.children = [newNode.id];
    }

    next[newNode.id] = newNode;
    commit(next);
  };

  const deleteNode = (nodeId) => {
    const next = deepClone(nodes);

    Object.values(next).forEach((node) => {
      if (node.children) {
        node.children = node.children.filter((c) => c !== nodeId);
      }

      if (node.branches) {
        Object.keys(node.branches).forEach((k) => {
          if (node.branches[k] === nodeId) node.branches[k] = null;
        });
      }
    });

    delete next[nodeId];
    commit(next);
  };

  const updateLabel = (id, label) => {
    const next = deepClone(nodes);
    next[id].label = label;
    commit(next);
  };

  const save = () => {
    console.log("WORKFLOW DATA →", JSON.stringify(nodes, null, 2));
  };

  return {
    nodes,
    rootId,
    addNode,
    deleteNode,
    updateLabel,
    undo: () => dispatch({ type: "UNDO" }),
    redo: () => dispatch({ type: "REDO" }),
    save,
  };
}
