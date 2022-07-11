import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import {
  Button,
  Form,
  Modal,
  Spinner,
  Container,
  Row,
  Col
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  PaginationTotalStandalone,
  SizePerPageDropdownStandalone
} from "react-bootstrap-table2-paginator";

export default function Tabled() {
  const { SearchBar } = Search;
  const [show, setShow] = React.useState(true);
  const [disabled, setDisabled] = React.useState(true);

  const columns = [
    {
      dataField: "id",
      text: "Product ID",
      sort: true
    },
    {
      dataField: "name",
      text: "Product Name"
    },
    {
      dataField: "price",
      text: "Product Price"
    },
    {
      dataField: "aksi",
      text: "Action",
      headerStyle: {
        textAlign: "center"
      },
      formatter: (a) => {
       
        return (
          <>
            <button className="btn btn-primary">
              <a onClick={() => setModalShow(true)}>VIEW</a>
            </button>
            <button className="btn btn-success" disabled>
              <a onClick={() => setModalSetujuShow(true)}>ACCEPT</a>
            </button>

            {show ? (
              <span className="btn btn-danger">
                <a onClick={() => setModalTolakShow(true)}>DENIED</a>
              </span>
            ) : null}
          </>
        );
      }
    }
  ];

  const datas = [
    {
      id: "1",
      name: "Pen",
      price: "$1"
    },
    {
      id: "2",
      name: "Book",
      price: "$5"
    },
    {
      id: "3",
      name: "Mouse Wireless",
      price: "$155"
    },
    {
      id: "4",
      name: "Keyboard",
      price: "$155"
    },
    {
      id: "5",
      name: "Vga Card",
      price: "$5155"
    },
    {
      id: "6",
      name: "Ram DDR4 8 GB",
      price: "$455"
    },
    {
      id: "7",
      name: "Monitor",
      price: "$3545"
    },
    {
      id: "8",
      name: "Ram DDR4 4 GB",
      price: "$225"
    },
    {
      id: "9",
      name: "Motherboard",
      price: "$3425"
    },
    {
      id: "10",
      name: "Core",
      price: "$5121"
    },
    {
      id: "11",
      name: "Fan CPU",
      price: "$2120"
    }
  ];
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Menampilkan {from} - {to} dari {size} entri
    </span>
  );

  const pagination = {
    // custom: true,
    loading: true,
    hidePageListOnlyOnePage: true,
    totalSize: datas.length,
    page: 1,
    lastPageText: "TERAKHIR",
    firstPageText: "PERTAMA",
    nextPageText: "BERIKUTNYA",
    prePageText: "SEBELUMNYA",
    showTotal: true,
    alwaysShowAllBtns: true,
    paginationTotalRenderer: customTotal,
    sizePerPageList: [
      {
        text: "5",
        value: 5
      },
      {
        text: "10",
        value: 10
      },
      {
        text: "20",
        value: 20
      },
      {
        text: "30",
        value: 30
      },
      {
        text: "All",
        value: datas.length
      }
    ]
  };

  const options = {
    // custom: true,
    sizePerPage: 5,
    paginationSize: 4,
    pageStartIndex: 1,
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    totalSize: datas.length
  };
  const NoDataIndication = () => (
    <Spinner animation="border" className="loader" />
  );

  const handleChange = (e) => {
    if (true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleChange2 = (e) => {
    if (true) {
      setShow(!show);
    } else {
      setShow(true);
    }
    return false;
  };

  const checkBox = {
    mode: "checkbox",

    // style: { color: "#2d3c6c"},
    clickToSelect: true
   
  };

  const selectRow = {
    mode: "checkbox",
    style: { color: "blue", backgroundColor: "red" }
   
  };

 
  const MySearch = (props) => {
    let input;
    const handleClick = () => {
      props.onSearch(input.value);
    };
    return (
      <div>
        <input
          className="form-control"
          style={{ backgroundColor: "pink" }}
          ref={(n) => (input = n)}
          type="text"
          onChange={handleClick}
        />
        {/* <button className="btn btn-warning" onClick={ handleClick }>Click to Search!!</button> */}
      </div>
    );
  };

  return (
    <div>
      <h2>
        PaginationProvider will care the data size change. You dont do anything
      </h2>
      <ToolkitProvider
        keyField="id"
        data={datas}
        columns={columns}
        search
        bootstrap4
      >
        {(props) => (
          <div>
            <h3>Input something at below input field:</h3>
            <div className="float-right">
              <SearchBar {...props.searchProps} placeholder="Cari Disini" />
            </div>

            <BootstrapTable
              wrapperClasses="table-responsive"
              noDataIndication={() => <NoDataIndication />}
              striped
              bordered={false}
              hover
              pagination={paginationFactory(pagination)}
              {...props.baseProps}
            />
          </div>
        )}
      </ToolkitProvider>
      {}
    </div>
  );
}
