import React from 'react';
import { Box, Button, Flex, Heading, IconButton, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ___PROD___ } from '../constants';
import useUser from '../common/helpers/useUser';
import Axios from 'axios';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { CgProfile } from 'react-icons/cg';
import { FiHome, FiLogOut } from 'react-icons/fi';

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
          rightIcon={<FiHome />}
          onClick={() => {
            router.push('/');
          }}
          variant="outline"
        >
          home
        </Button>
        <Button
          ml={2}
          rightIcon={<PlusSquareIcon />}
          onClick={() => {
            router.push('/add-habit');
          }}
          variant="outline"
        >
          new habit
        </Button>
        <IconButton aria-label="profile" ml={2} icon={<CgProfile />} onClick={() => router.push('/profile')} variant="ghost" />
        <IconButton
          aria-label="logout"
          icon={<FiLogOut />}
          ml={2}
          onClick={async (e) => {
            e.preventDefault();
            await mutateUser(Axios.put('/api/logout'));
            router.push('/login');
          }}
          variant="ghost"
        />
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
