import {RepairData} from "./RepairsPage";

type RepairDetailProps = {
    open: boolean,
    onClose: () => void,
    title: string,
    repair: RepairData | null
}
const RepairDetail = ({open, repair, title, onClose}: RepairDetailProps) => {
  return (
      <div>


      </div>
  )
}

export default RepairDetail