import { useParams } from 'react-router-dom';

const EditOption = () => {
  let { optionId } = useParams();
  console.log({optionId})
  return (
    <div>
      {optionId}
    </div>
  )
}

export default EditOption