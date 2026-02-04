import React from "react";
import { useWorkflow } from "./hooks/useWorkflow";
import WorkflowCanvas from "./components/WorkflowCanvas";
import "./styles/workflow.css";

export default function App() {
  const workflow = useWorkflow();

  return (
    <div className="app">
      <div className="header">
        <h2>Workflow Builder</h2>
        <div className="controls">
          <button onClick={workflow.undo} className="undo">
            Undo
          </button>
          <button onClick={workflow.redo} className="redo">
            Redo
          </button>
          <button onClick={workflow.save} className="save">
            Save
          </button>
        </div>
      </div>
      <div className="canvas">
        <WorkflowCanvas {...workflow} />
      </div>
    </div>
  );
}
