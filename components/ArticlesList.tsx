import { useRef } from "react";
import styled from "styled-components";
import { breakPoints } from "@yosefbeder/design-system/constants";
import { ArticleType } from "../types";
import Article from "./Article";
import { AnimateSharedLayout, motion } from "framer-motion";
import useViewPortWidth from "../hooks/useViewPortWidth";

import { mainSharedStyles, routeTransitions } from "../pages/_app";
import useAutoScrolling from "../hooks/useAutoScrolling";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: var(--gap);

  ${mainSharedStyles}

  @media (min-width: ${breakPoints.lg}px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Column = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: var(--gap);
  height: max-content;

  @media (min-width: ${breakPoints.lg}px) {
    flex: 0.5;
  }
`;

interface ArticlesListProps {
  articles: ArticleType[];
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles }) => {
  const viewPortWidth = useViewPortWidth();
  const mainRef = useRef<HTMLDivElement>(null);

  useAutoScrolling(mainRef);

  return (
    <Container ref={mainRef}>
      {viewPortWidth < 1024 ? (
        <Column>
          {articles.map((article) => (
            <Article isDescriptionShown={true} key={article.id} {...article} />
          ))}
        </Column>
      ) : (
        <>
          <AnimateSharedLayout>
            <Column>
              {articles
                .filter((_, i) => i % 2 === 0)
                .map((article) => (
                  <Article key={article.id} {...article} />
                ))}
            </Column>
            <Column>
              {articles
                .filter((_, i) => i % 2 !== 0)
                .map((article) => (
                  <Article key={article.id} {...article} />
                ))}
            </Column>
          </AnimateSharedLayout>
        </>
      )}
    </Container>
  );
};

export default ArticlesList;
