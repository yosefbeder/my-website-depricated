import styled from "styled-components";
import { breakPoints } from "@yosefbeder/design-system/constants";
import Sidebar from "./Sidebar";
import { Provider } from "react-redux";
import store from "../store";

const Container = styled.div`
  --gap: var(--space-4);

  display: flex;
  max-width: ${breakPoints.lg}px;
  margin: 0 auto;
  gap: var(--space-4);

  @media (max-width: ${breakPoints.sm}px) {
    flex-direction: column;
  }
`;

const Layout: React.FC = ({ children }) => {
  return (
    <Provider store={store}>
      <Container>
        <Sidebar />
        {children}
      </Container>
    </Provider>
  );
};

export default Layout;
