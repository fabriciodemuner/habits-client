import React, { useState } from 'react';
import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ___PROD___ } from '../constants';

interface NavbarProps {}

export const NavBar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const [logoutFetching, setLogoutFetching] = useState(false);
  const [loggedIn, setLoggedIn] = useState(() => {
    const logged = router.query.logged;
    if (typeof logged === 'string') return Boolean(logged);
    return false;
  });
  const [name, setName] = useState(() => {
    const name = router.query.name;
    console.log(router.query);
    if (typeof name === 'string') return name;
  });

  let body = null;
  if (!loggedIn) {
    body = (
      <>
        <NextLink href={'/login'}>
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href={'/register'}>
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
            router.push(`/?logged=${loggedIn}&name=${name}`, '/');
          }}
          variant="outline"
        >
          home
        </Button>
        <Button
          ml={2}
          onClick={() => {
            router.push(`/add-habit?logged=${loggedIn}&name=${name}`, '/add-habit');
          }}
          variant="outline"
        >
          add habit
        </Button>
        <Box ml={2}>{name || 'username'}</Box>
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
      {___PROD___ ? null : <Box>{process.env.NODE_ENV} env</Box>}
      <Heading mx="4">Habits Tracker</Heading>
      <Box ml={'auto'}>{body}</Box>
    </Flex>
  );
};
