import { useEffect, useState } from 'react';
import Loader from './Components/Loader/Loader';
import { TableExpense } from './Components/Table Expense/TableExpense';
import { ITransaction } from './Definitions/GlobalInterfaces';

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
    {loading ? (<Loader/>) :
    (
      data && (
        <>
        <TableExpense
          title="Expenses Tracker"
          data={data}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
        </>
      )
    )
    }
    </>
  );
}

export default App;
