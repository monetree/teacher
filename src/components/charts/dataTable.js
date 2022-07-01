import React from "react";
import { MDBDataTable } from "mdbreact";

const DatatablePage = ({ data_ }) => {
  const data = {
    columns: [
      {
        label: "name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      // {
      //   label: "completed",
      //   field: "completed",
      //   sort: "asc",
      //   width: 270,
      // },
      {
        label: "createdAt",
        field: "createdAt",
        sort: "asc",
        width: 200,
      },
      {
        label: "updatedAt",
        field: "updatedAt",
        sort: "asc",
        width: 100,
      },
      {
        label: "failed",
        field: "failed",
        sort: "asc",
        width: 150,
      },
      {
        label: "passed",
        field: "passed",
        sort: "asc",
        width: 100,
      },
      {
        label: "skipped",
        field: "skipped",
        sort: "asc",
        width: 100,
      },
    ],
    rows: data_,
  };

  return <MDBDataTable striped bordered small data={data} />;
};

export default DatatablePage;
