/* eslint-disable react-hooks/exhaustive-deps */
import useAuthAndApi from "@/app/api/training";
import React, { useEffect, useState } from "react";

function ListTrainingData() {
  const { getTrainingListOne } = useAuthAndApi();
  const [listTrainingData, setListTrainingData] = useState<any>();

  const ver = async () => {
    const res = await getTrainingListOne("6621c44798294f7498438af1");
    const data = await res.json();
    setListTrainingData(data);
    console.log(data);
  };
  useEffect(() => {
    ver();
  }, []);

  console.log(listTrainingData);

  return (
    <div>
      <button onClick={ver}>Ver</button>
      {listTrainingData && listTrainingData.exercises.map((i:any) => (
        <div key={i._id}>
            <p>{i.name}</p>
            <p>{i.muscle}</p>
        </div>
      ))}
    </div>
  );
}

export default ListTrainingData;
