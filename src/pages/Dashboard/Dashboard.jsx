import PostBox from "../../components/Post/PostBox";
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";

const DashboardIndex = () => {
  return (
    <>
      <DashboardLayout>
       
          {/* Items from Api will be looped here  */}
          <PostBox />
      
      </DashboardLayout>
    </>
  );
};

export default DashboardIndex;
