import { getValidationRequests } from "../../actions/validationRequest";
import ScamDetectionTable from "./../components/detection-table";

export default async function Dashboard() {
  const validationRequests = await getValidationRequests();

  return (
    <div>
      <ScamDetectionTable validationRequests={validationRequests} />
    </div>
  );
}