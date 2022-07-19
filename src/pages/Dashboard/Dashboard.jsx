import PostBox from "../../components/Post/PostBox";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";
import { Link } from "react-router-dom";

const DashboardIndex = () => {
  return (
    <>
      <DashboardLayout>
       
          {/* Items from Api will be looped here  */}
          <Link to='/post/id'>
            <PostBox />
            <PostBox />
          </Link>
      
      </DashboardLayout>
    </>
  );
};

export default DashboardIndex;
