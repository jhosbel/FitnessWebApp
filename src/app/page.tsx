import Image from "next/image";
import TrainingList from "./components/TrainingList";
import TrainingForm from "./components/TrainingForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Fitness App</h1>
      <TrainingForm />
      <TrainingList />
    </main>
  );
}
