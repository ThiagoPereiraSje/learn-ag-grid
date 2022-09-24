import { useState, useEffect, useRef } from "react";
import { ICellRendererParams } from "ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer";
import { AgGridReact, AgGridColumnProps } from "ag-grid-react";

const CustomCell = (props: ICellRendererParams & { buttonText: string }) => {
  const handleClick = () => {
    window.alert(`Mais informacoes:  ${props.value}`);
  };

  return (
    <>
      <button onClick={handleClick}>{props.buttonText}</button>
      {props.value}
    </>
  );
};

function App() {
  const gridRef = useRef<AgGridReact>();

  const defaultColDef: AgGridColumnProps = {
    sortable: true,
    filter: true,
    editable: false,
  };

  const columnDefs: AgGridColumnProps[] = [
    {
      field: "make",
      cellRenderer: CustomCell,
      cellRendererParams: {
        buttonText: "=",
      },
    },
    {
      field: "model",
      cellRenderer: CustomCell,
      cellRendererParams: {
        buttonText: "#",
      },
    },
    { field: "price" },
  ];

  const [rowData, setRowData] = useState([
    { make: "Ford", model: "Focus", price: 40000 },
    { make: "Toyota", model: "Celica", price: 45000 },
    { make: "BMW", model: "4 Series", price: 40000 },
  ]);

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  const handleButtonClick = () => {
    console.log("dados: ", rowData);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 500 }}>
      <button onClick={handleButtonClick}>Mostrar dados</button>
      <AgGridReact
        ref={gridRef as any}
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
