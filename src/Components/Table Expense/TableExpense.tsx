import { Container, Row, Col, Table, Pagination } from "react-bootstrap";
import formatDate from "../../Helpers/Formatter";
import { ITableExpense } from "./ITableExpense";

    
export function TableExpense(props: ITableExpense) {
    return (
    <>
    <Container fluid>
      <Row>
        <Col align="center">
          <h1>{props.title}</h1>
        </Col>
      </Row>
    </Container>
    <Container>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Merchant</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {props.data?.transactions.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.id}</td>
                  <td>{formatDate(expense.date)}</td>
                  <td>£{expense.amount}</td>
                  <td>{expense.merchant}</td>
                  <td>{expense.category}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Pagination className="justify-content-center">
          <Pagination.Prev disabled={props.pageNumber === 1} onClick={() => {if(props.pageNumber > 1){
            props.setPageNumber(props.pageNumber - 1);
          }}}/>
          <Pagination.Item active>{props.pageNumber}</Pagination.Item>
          <Pagination.Next disabled={props.pageNumber === props.data!.totalPages} onClick={() => {if(props.pageNumber < props.data!.totalPages){
            props.setPageNumber(props.pageNumber + 1);
          }}}/>
        </Pagination>
      </Row>
    </Container>
    </>);
    }