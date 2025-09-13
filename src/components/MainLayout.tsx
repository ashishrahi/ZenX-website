import { Outlet } from "react-router-dom";
import Container from "@/components/Container";

const MainLayout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default MainLayout;
