import React, {
  useState,
  useImperativeHandle,
  CSSProperties,
  KeyboardEvent,
} from "react";
import { ICellEditorParams, ICellEditor } from "ag-grid-community";

const inputStyle: CSSProperties = {
  border: "none",
  outline: "none",
  background: "unset",
};

const KEYS = ["Backspace", "Delete", "Enter", "Tab"];

export default React.forwardRef<ICellEditor, ICellEditorParams>(
  ({ value }, ref) => {
    const [curValue, setCurValue] = useState(value);

    useImperativeHandle(ref, () => {
      return {
        getValue() {
          return Number(curValue);
        },
      };
    });

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (KEYS.includes(e.key)) {
        e.stopPropagation();
        return;
      }

      if (!/\d/g.test(e.key)) {
        e.preventDefault();
      }
    };

    return (
      <input
        style={inputStyle}
        autoFocus
        value={curValue}
        onChange={(e) => setCurValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    );
  }
);
