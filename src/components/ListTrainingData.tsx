/* eslint-disable react-hooks/exhaustive-deps */
import useAuthAndApi from "@/app/api/training";
import DataTable, {
  ExpanderComponentProps,
  TableColumn,
} from "react-data-table-component";
import React, { useEffect, useState } from "react";

interface DataRow {
  _id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  userEmail: string;
  exercises: [
    {
      _id: string;
      breakTime: string;
      breakTimeType: string;
      id: string;
      image: string;
      name: string;
      muscle: string;
      note: string;
      reps: number;
      series: number;
      weight: number;
      weightType: string;
    }
  ];
}

function ListTrainingData() {
  const { getTrainingListOne } = useAuthAndApi();
  const [listTrainingData, setListTrainingData] = useState<DataRow[]>([]);
  const [users, setUsers] = useState<DataRow[]>([]);

  const ver = async () => {
    const res = await getTrainingListOne("6621c44798294f7498438af1");
    const data = await res.json();
    console.log(data);
    setListTrainingData(data);
  };
  const test = [
    {
      userEmail: 'jhosbel',
      title: 'malditasea'
    }
  ]

  const columns: TableColumn<DataRow>[] = [
    {
      name: "Nombre",
      selector: (row) => row.userEmail,
    },
    {
      name: 'otra baina',
      selector: (row) => row.title,
    }
  ];

  useEffect(() => {
    ver();
  }, []);

  console.log(listTrainingData);

  return (
    <div>
      {/* <div>
        {listTrainingData &&
          listTrainingData.exercises.map((i: any) => (
            <div key={i._id}>
              <p>{i.name}</p>
              <p>{i.muscle}</p>
              <p>{i.note}</p>
            </div>
          ))}
      </div> */}
      <DataTable
        columns={columns}
        data={test}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  );
}

const ExpandedComponent: React.FC<ExpanderComponentProps<DataRow>> = ({
  data,
}) => {
  return (
    <div>
      <p>{data.userEmail}</p>
    </div>
  );
};

export default ListTrainingData;
