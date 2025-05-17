import { ITransaction } from "../../Definitions/GlobalInterfaces";

export interface ITableExpense {
    title: string;
    data: ITransaction;
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}