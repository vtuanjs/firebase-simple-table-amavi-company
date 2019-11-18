import React from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const RecordList = ({ records }) => {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr className="text-left">
          <th>STT</th>
          <th>Tên</th>
          <th>Điện thoại</th>
          <th>Mặt hàng</th>
          <th>Điểm</th>
          <th>Khác</th>
        </tr>
      </thead>
      <tbody>
        {records &&
          records.map((record, index) => {
            return (
              <tr key={index + 1} className="text-left">
                <td>{index + 1}</td>
                <td>{record.name}</td>
                <td>{record.phone}</td>
                <td>{record.product}</td>
                <td>{record.rate} sao</td>
                <td>
                  <Link
                    to={`/projects/${record.projectId}/records/${record.id}`}
                  >
                    Link
                  </Link>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default RecordList;
