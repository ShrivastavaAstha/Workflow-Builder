import React from "react";

export default function Node({
  node,
  nodes,
  addNode,
  deleteNode,
  updateLabel,
}) {
  return (
    <div className={`node ${node.type}`}>
      <input
        value={node.label}
        onChange={(e) => updateLabel(node.id, e.target.value)}
      />

      <div className="actions">
        {node.type !== "end" && node.type !== "branch" && (
          <button onClick={() => addNode(node.id, "action")}>+ Action</button>
        )}

        {node.type !== "end" && (
          <button onClick={() => addNode(node.id, "branch")}>+ Branch</button>
        )}

        {node.type !== "end" && (
          <button onClick={() => addNode(node.id, "end")}>+ End</button>
        )}

        {node.type !== "start" && (
          <button onClick={() => deleteNode(node.id)}>Delete</button>
        )}
      </div>

      {node.type === "branch" && (
        <div className="branches">
          {Object.entries(node.branches).map(([key, childId]) => (
            <div key={key} className="branch">
              <strong>{key.toUpperCase()}</strong>
              {!childId && (
                <button onClick={() => addNode(node.id, "action", key)}>
                  + Add
                </button>
              )}
              {childId && (
                <Node
                  node={nodes[childId]}
                  nodes={nodes}
                  addNode={addNode}
                  deleteNode={deleteNode}
                  updateLabel={updateLabel}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {node.children &&
        node.children.map((cid) => (
          <Node
            key={cid}
            node={nodes[cid]}
            nodes={nodes}
            addNode={addNode}
            deleteNode={deleteNode}
            updateLabel={updateLabel}
          />
        ))}
    </div>
  );
}
