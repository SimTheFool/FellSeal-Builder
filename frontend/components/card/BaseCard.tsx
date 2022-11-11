import { Box, Card, CardProps, Popover, SimpleGrid } from "@mantine/core";
import Image from "next/image";
import { HTMLProps, ReactNode, useEffect, useState } from "react";
import { portraitHeight, portraitWidth } from "../style";

type BaseCardProps = {
  background?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  footer?: ReactNode;
  aside?: ReactNode;
  onClick?: () => void;
};

export const BaseCard = ({
  background,
  title,
  subtitle,
  footer,
  aside,
  onClick,
}: BaseCardProps) => {
  return (
    <Card
      onClick={onClick}
      radius="md"
      shadow="md"
      component="li"
      sx={(t) => ({
        height: portraitHeight,
        color: t.colors.white[0],
        cursor: "pointer",
      })}
    >
      <Card.Section>{background}</Card.Section>

      <Box
        sx={(t) => ({
          position: "absolute",
          top: 0,
          left: 0,
        })}
      >
        {aside}
      </Box>

      <Box
        sx={(t) => ({
          position: "absolute",
          bottom: 0,
          width: "100%",
          left: 0,
        })}
      >
        <SimpleGrid
          cols={1}
          spacing="lg"
          verticalSpacing="md"
          p="xs"
          sx={(t) => ({
            background: `linear-gradient(0deg, rgba(0,0,0,1) 10%, rgba(0,0,0,0.4906337535014006) 80%, rgba(255,0,0,0) 100%)`,
          })}
        >
          {title}
          {subtitle}
          {footer}
        </SimpleGrid>
      </Box>
    </Card>
  );
};
