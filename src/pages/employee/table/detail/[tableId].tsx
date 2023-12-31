import { EmployeeHeader } from "@/components/Employee/Header";
import { TableDetail } from "@/features/Employee/Table/Detail";
import { getTable } from "@/features/Employee/Top/getTables";
import { Table } from "@/features/Employee/Table/Detail/type";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

const TableDetailPage = ({ table }: { table: Table }) => {
  return (
    <>
      <EmployeeHeader />
      <TableDetail table={table} />
    </>
  );
};

/**
 *
 * @param params tableIdを含むクエリパラメータ
 * @returns TableId or null
 *
 * この関数は、クエリパラメータからtableIdを取り出す。
 * tableIdが文字列であれば、数値に変換して返す。
 * tableIdが数値でなければ、nullを返す。
 */
const extractTableId = (params: ParsedUrlQuery): number | null => {
  const tableId = params.tableId;
  if (typeof tableId === "string") {
    const parsedId = parseInt(tableId, 10);
    return isNaN(parsedId) ? null : parsedId;
  }
  return null;
};

/**
 *
 * @param tableId
 * @returns Table or null
 *
 * この関数は、tableIdを引数にして、テーブル情報を取得する。
 * テーブル情報が取得できれば、テーブル情報を返す。
 * テーブル情報が取得できなければ、nullを返す。
 */
const fetchTableData = async (tableId: number) => {
  try {
    const table = await getTable(tableId);
    return table;
  } catch (error) {
    console.error("Failed to fetch table data:", error);
    return null;
  }
};

/**
 *
 * @param context
 * @returns
 *
 * この関数は、サーバーサイドで実行される。
 * クエリパラメータからtableIdを取り出し、テーブル情報を取得する。
 * テーブル情報が取得できれば、propsとして渡す。
 * テーブル情報が取得できなければ、notFoundを返す。
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const tableId = context.params ? extractTableId(context.params) : null;

  if (tableId === null) {
    return {
      notFound: true,
    };
  }

  const table = await fetchTableData(tableId);

  if (!table) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      table,
    },
  };
};

export default TableDetailPage;
