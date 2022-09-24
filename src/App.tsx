import { useState, useEffect, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";

function App() {
  const [rowData, setRowData] = useState([
    { make: "Ford", model: "Focus", price: 40000 },
    { make: "Toyota", model: "Celica", price: 45000 },
    { make: "BMW", model: "4 Series", price: 40000 },
  ]);

  const [columnDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  const gridRef: any = useRef();

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  const handleRowClick = () => {
    alert("Foi clicado!");
  };

  const handleButtonClick = () => {
    gridRef.current.api.deselectAll();
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 500 }}>
      <button onClick={handleButtonClick}>DeSelectAll</button>
      <AgGridReact
        ref={gridRef}
        onRowClicked={handleRowClick}
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
