import { useParams } from "react-router";
import useGetPerson from "../features/movies/useGetPerson";
import PersonData from "../ui/actors/PersonData";
import Spinner from "../ui/loading/Spinner";

function Person() {
  const { id } = useParams();
  const { person, isLoading } = useGetPerson(id);
  if (isLoading) return <Spinner/>
  return (
    <div>
      <PersonData person={person} />
    </div>
  );
}

export default Person;
