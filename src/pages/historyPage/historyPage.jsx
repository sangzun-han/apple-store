import React, { useEffect, useState } from "react";
import clayful from "clayful/client-js";
import "./historyPage.css";
import Table from "react-bootstrap/Table";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const order = clayful.Order;
    const options = {
      customer: localStorage.getItem("accessToken"),
    };
    order.listForMe(options, (err, result) => {
      if (err) {
        console.log(err.code);
        return;
      } else setHistory(result.data);
    });
  }, []);
  return (
    <div className="history_wrapper">
      <div className="history_title">주문내역</div>

      <Table className="text-center" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>주문 번호</th>
            <th>주문 가격</th>
            <th>주문 일시</th>
          </tr>
        </thead>
        <tbody>
          {history.map((history, index) => (
            <tr key={history._id}>
              <td>{index + 1}</td>
              <td>{history._id}</td>
              <td>{history.total.amount.converted}</td>
              <td>{history.createdAt.formatted}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default HistoryPage;
