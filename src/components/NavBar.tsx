import React, { useState } from "react";
import { Box, Button, Flex, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ___PROD___ } from "../constants";

interface NavbarProps {}

export const NavBar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const [logoutFetching, setLogoutFetching] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  let body = null;
  if (!loggedIn) {
    body = (
      <>
        <NextLink href={"/login"}>
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href={"/register"}>
          <Link>register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex alignItems="center">
        <Button
          ml={2}
          onClick={() => {
            router.push("/");
          }}
          variant="outline"
        >
          home
        </Button>
        <Button
          ml={2}
          onClick={() => {
            router.push("/add-habit");
          }}
          variant="outline"
        >
          add habit
        </Button>
        <Box ml={2}>Username</Box>
        <Button
          ml={2}
          onClick={() => {
            setLoggedIn(false);
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tan" p={4} alignItems="center">
      <Box>{!___PROD___ ? <p>development mode</p> : null}</Box>
      <Heading mx="4">Habits Tracker</Heading>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
