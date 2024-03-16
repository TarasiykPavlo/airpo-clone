import { useParams } from "react-router-dom";

function RefLink() {
  const { refid } = useParams();
  return (<h2 className="text-title font-bold">Virus Downloading... <br /></h2>);    
}

export default RefLink;
