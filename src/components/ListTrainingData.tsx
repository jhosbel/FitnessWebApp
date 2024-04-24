/* eslint-disable react-hooks/exhaustive-deps */
import useAuthAndApi from "@/app/api/training";
import DataTable, {
  ExpanderComponentProps,
  TableColumn,
} from "react-data-table-component";
import React, { useEffect, useState } from "react";

interface DataRow {
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

interface Training {
  _id: string;
  createdAt: string;
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
  const { getTrainingListOne, getOneUser } = useAuthAndApi();
  const [listTrainingData, setListTrainingData] = useState<Training>();
  const [user, setUser] = useState<DataRow[]>([]);

  const ver = async () => {
    const res = await getTrainingListOne("6621c44798294f7498438af1");
    const data = await res.json();

    const res2 = await getOneUser("65fdd18264aabc5a889d50c8");
    const data2 = await res2.json();

    setUser(data2);
    setListTrainingData(data);
  };

  useEffect(() => {
    ver();
  }, []);

  console.log(listTrainingData);
  console.log(user);

  return (
    <div>
      {<div>
        {listTrainingData &&
          listTrainingData.exercises.map((i: any) => (
            <div key={i._id}>
              <p>{i.name}</p>
              <p>{i.muscle}</p>
              <p>{i.note}</p>
            </div>
          ))}
      </div>}
    </div>
  );
}

export default ListTrainingData;
