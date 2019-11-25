import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import matchSorter from "match-sorter";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./style.css";

const RecordList = ({ records, projectId }) => {
  if (!records) {
    return <div className="container center p-2">Loadig records...</div>;
  }
  if (records.length === 0) {
    return <div className="container center p-2">Không có dữ liệu nào</div>;
  }

  return (
    <Container fluid>
      <ReactTable
        data={records}
        filterable
        defaultFilterMethod={(filter, row) =>
          String(row[filter.id]) === filter.value
        }
        defaultPageSize={10}
        className="-striped -highlight"
        columns={[
          {
            Header: "Tên",
            id: "name",
            accessor: "name",
            minWidth: 120,
            maxWidth: 150,
            filterAll: true,
            Filter: ({ filter, onChange }) => (
              <input
                onChange={event => onChange(event.target.value)}
                value={filter ? filter.value : ""}
                placeholder="Search..."
              />
            ),
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["name"] })
          },
          {
            Header: "Điện thoại",
            id: "phone",
            accessor: "phone",
            minWidth: 100,
            maxWidth: 140,
            Filter: ({ filter, onChange }) => (
              <input
                onChange={event => onChange(event.target.value)}
                value={filter ? filter.value : ""}
                placeholder="Search..."
              />
            ),
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["phone"] }),
            filterAll: true
          },
          {
            Header: "Sản phẩm",
            id: "product",
            accessor: "product",
            // minWidth: 400,
            Filter: ({ filter, onChange }) => (
              <input
                onChange={event => onChange(event.target.value)}
                value={filter ? filter.value : ""}
                placeholder="Search..."
              />
            ),
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["product"] }),
            filterAll: true
          },
          {
            Header: "Đánh giá",
            id: "rate",
            accessor: "rate",
            minWidth: 80,
            maxWidth: 80,
            Filter: ({ filter, onChange }) => (
              <input
                onChange={event => onChange(event.target.value)}
                value={filter ? filter.value : ""}
                placeholder="Search..."
              />
            ),
            className: "text-center",
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["rate"] }),
            filterAll: true
          },
          {
            Header: "Khác",
            accessor: "id",
            id: "id",
            filterable: false,
            maxWidth: 50,
            className: "text-center",
            Cell: ({ value }) => (
              <Link to={`/projects/${projectId}/records/${value}`}>Link</Link>
            )
          }
        ]}
      />
    </Container>
  );
};

export default RecordList;
