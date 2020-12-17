import { Box, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import useUser from '../common/helpers/useUser';
import { Layout } from '../components/Layout';
import { WrapperVariant } from '../components/Wrapper';

const Profile: React.FC<{}> = ({}) => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <Layout variant={WrapperVariant.small}>
      <Box children={'Username: ' + user?.name} />
      <Button
        mt={4}
        onClick={() => {
          router.push('/change-password');
        }}
        variant="outline"
        colorScheme="teal"
      >
        change password
      </Button>
    </Layout>
  );
};

export default Profile;
