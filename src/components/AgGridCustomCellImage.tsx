import { useState, useEffect, useRef, CSSProperties, memo } from "react";
import { ICellRendererParams } from "ag-grid-community/dist/lib/rendering/cellRenderers/iCellRenderer";
import { AgGridReact, AgGridColumnProps } from "ag-grid-react";

const CustomCell = (props: ICellRendererParams & { buttonText: string }) => {
  const imageUrl = "https://picsum.photos/200";
  const imgStyle: CSSProperties = {
    width: 30,
    height: 30,
    borderRadius: 30,
    top: 5,
    left: 0,
    position: "absolute",
  };
  const style: CSSProperties = { marginLeft: 20 };

  const renderCountRef = useRef(1);

  return (
    <>
      <span style={style}>
        <img src={imageUrl} alt="test" style={imgStyle} />
        {props.value}
      </span>
      <b>({renderCountRef.current++})</b>
    </>
  );
};

function AgGridCustomCellImage() {
  const gridRef = useRef<AgGridReact>();

  const defaultColDef: AgGridColumnProps = {
    sortable: true,
    filter: true,
    editable: false,
  };

  const columnDefs: AgGridColumnProps[] = [
    {
      field: "make",
      cellRenderer: memo(CustomCell),
      cellRendererParams: {
        buttonText: "=",
      },
    },
    {
      field: "model",
      cellRenderer: memo(CustomCell),
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

export default AgGridCustomCellImage;
