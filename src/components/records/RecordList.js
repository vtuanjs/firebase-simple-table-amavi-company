import React from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const RecordList = ({ records }) => {
  const handleShowRecords = () => {
    if (!records) {
      return <tr><td className="text-center" colSpan="6">Loading records...</td></tr>;
    }
    if (records.length === 0) {
      return <tr><td className="text-center" colSpan="6">Không có dữ liệu nào</td></tr>;
    }

    return records.map((record, index) => {
      return (
        <tr key={index + 1} className="text-left">
          <td>{index + 1}</td>
          <td>{record.name}</td>
          <td>{record.phone}</td>
          <td>{record.product}</td>
          <td>{record.rate} sao</td>
          <td>
            <Link to={`/projects/${record.projectId}/records/${record.id}`}>
              Link
            </Link>
          </td>
        </tr>
      );
    });
  };
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
      <tbody>{handleShowRecords()}</tbody>
    </Table>
  );
};

export default RecordList;
