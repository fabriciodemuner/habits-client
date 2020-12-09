import React from 'react';
import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ___PROD___ } from '../constants';
import useUser from '../common/helpers/useUser';
import Axios from 'axios';

interface NavbarProps {}

export const NavBar: React.FC<NavbarProps> = ({}) => {
  const { user, mutateUser, isLoading } = useUser();
  const router = useRouter();

  let body = null;
  if (isLoading) body = <div>Loading...</div>;
  else if (!user?.isLoggedIn) {
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
            router.push('/');
          }}
          variant="outline"
        >
          home
        </Button>
        <Button
          ml={2}
          onClick={() => {
            router.push('/add-habit');
          }}
          variant="outline"
        >
          add habit
        </Button>
        <Box ml={2}>{user.name}</Box>
        <NextLink href="/api/logout">
          <Button
            ml={2}
            onClick={async (e) => {
              e.preventDefault();
              await mutateUser(Axios.put('/api/logout'));
            }}
            variant="link"
          >
            logout
          </Button>
        </NextLink>
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
