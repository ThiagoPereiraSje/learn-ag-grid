import { useState, useRef, memo, CSSProperties } from "react";
import { ValueSetterParams } from "ag-grid-community";
import { AgGridReact, AgGridColumnProps } from "ag-grid-react";
import NumericCellEditor from "./components/NumericCellEditor";

const divStyle: CSSProperties = {
  widows: "100%",
  height: "95vh",
};

function App() {
  const gridRef = useRef<AgGridReact>();

  const defaultColDef: AgGridColumnProps = {
    sortable: true,
    filter: true,
    editable: true,
    valueSetter: (params: ValueSetterParams) => {
      params.data[params.colDef.field!] = params.newValue;
      return true;
    },
  };

  const columnDefs: AgGridColumnProps[] = [
    {
      field: "make",
    },
    {
      field: "model",
    },
    {
      field: "price",
      cellEditor: memo(NumericCellEditor),
    },
  ];

  const [rowData] = useState([
    { make: "Ford", model: "Focus", price: 40000 },
    { make: "Toyota", model: "Celica", price: 45000 },
    { make: "BMW", model: "4 Series", price: 40000 },
  ]);

  const handleClick = () => {
    console.log("dados: ", rowData);
  };

  return (
    <div className="ag-theme-alpine" style={divStyle}>
      <button onClick={handleClick}>Mostrar dados</button>
      <AgGridReact
        ref={gridRef as any}
        containerStyle={{ flex: 1 }}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        animateRows={true}
      />
    </div>
  );
}

export default App;
