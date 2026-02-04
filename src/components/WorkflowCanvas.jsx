import React from "react";
import Node from "./Node";

export default function WorkflowCanvas({ nodes, rootId, ...actions }) {
  return <Node node={nodes[rootId]} nodes={nodes} {...actions} />;
}
