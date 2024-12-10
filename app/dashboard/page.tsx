import ScamDetectionTable from "./components/detection-table";
import { getValidationRequests } from "../actions/validationRequest";

export default async function Dashboard() {
  const validationRequests = await getValidationRequests();
  console.log(validationRequests);

  return (
    <div>
        <ScamDetectionTable validationRequests={validationRequests} />
    </div>
  );
}