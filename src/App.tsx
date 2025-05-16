import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';
import { format } from 'date-fns';


interface ITransaction {
  transactions: IExpense[];
  next: IPage;
  previous: IPage;
  totalPages: number;
  currentPage: number;
}

interface IPage{
  page: number;
  limit: number;
}

interface IExpense {
  id: number;
  date: Date;
  amount: number;
  merchant: string;
  category: string;
}

function App() {
  const [data, setData] = useState<ITransaction>();
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://tip-transactions.vercel.app/api/transactions?page=${pageNumber}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pageNumber]);

  return (
    <>
    {loading ? (<Container fluid>
      <Row>
        <Col align="center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
      </Row>
    </Container>) :
    (
    <>
    <Container fluid>
      <Row>
        <Col align="center">
          <h1>Expense Tracker</h1>
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
              {data?.transactions.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.id}</td>
                  <td>{format(expense.date, 'dd/MM/yyyy HH:mm')}</td>
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
          <Pagination.Prev disabled={pageNumber === 1} onClick={() => {if(pageNumber > 1){
            setPageNumber(pageNumber - 1);
          }}}/>
          <Pagination.Item active>{pageNumber}</Pagination.Item>
          <Pagination.Next disabled={pageNumber === data!.totalPages} onClick={() => {if(pageNumber < data!.totalPages){
            setPageNumber(pageNumber + 1);
          }}}/>
        </Pagination>
      </Row>
    </Container>
    </>)
    }
    </>
  );
}

export default App;
