import { useState } from "react";
import NextLink from "next/link";
import { ArticleType } from "../types";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import { StyledButtonPrimary } from "@yosefbeder/design-system/components/Button";
import { H3, P1, P2, Link } from "@yosefbeder/design-system/typography";
import { fade } from "../constants/variants";

const Container = styled.article`
  border-radius: var(--rounded);
  box-shadow: var(--shadow-lg);
  background-color: var(--color-white);

  overflow: hidden;
`;

export const Tag = styled(Link)`
  &:before {
    content: "#";
  }
`;

export const TagsContainer = styled.div`
  display: flex;

  & > ${Tag}:not(:last-child) {
    margin-right: var(--space-2);
  }
`;

interface TypographyProps {
  isDescriptionShown?: boolean;
}

const Typography = styled.div<TypographyProps>`
  padding: var(--gap);

  & > ${H3} {
    margin-bottom: var(--space-2);
  }

  ${(props) =>
    props.isDescriptionShown &&
    css`
      & > ${TagsContainer} {
        margin-bottom: var(--space-2);
      }
    `}
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--gap);
  background-color: var(--color-gray-50);
`;

const Article: React.FC<ArticleType & { isDescriptionShown?: boolean }> = ({
  id,
  title,
  tags,
  description,
  date,
  timeToRead,
  isDescriptionShown,
}) => {
  const [mouseIn, setMouseIn] = useState(false);

  return (
    <Container
      as={motion.div}
      layout
      onMouseEnter={() => setMouseIn(true)}
      onMouseLeave={() => setMouseIn(false)}
    >
      <Typography isDescriptionShown={isDescriptionShown || mouseIn}>
        <H3 resetMargin as={motion.h3} layout>
          {title}
        </H3>

        <TagsContainer as={motion.div} layout>
          {tags.map((tag) => (
            <NextLink key={tag} href={`/articles?tag=${tag}`} passHref>
              <Tag>{tag}</Tag>
            </NextLink>
          ))}
        </TagsContainer>

        {(isDescriptionShown || mouseIn) && (
          <P1
            resetMargin
            as={motion.p}
            layout
            variants={fade}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {description}
          </P1>
        )}
      </Typography>

      <Footer as={motion.div} layout>
        <NextLink href={`/articles/${id}`} passHref scroll={false}>
          <StyledButtonPrimary as="a">Read</StyledButtonPrimary>
        </NextLink>
        <P2 resetMargin>
          ⌚ {timeToRead} minute{timeToRead === 1 ? "" : "s"} - 📅{" "}
          {new Intl.DateTimeFormat("en", {
            month: "short",
            day: "numeric",
          }).format(new Date(date))}
        </P2>
      </Footer>
    </Container>
  );
};

export default Article;
