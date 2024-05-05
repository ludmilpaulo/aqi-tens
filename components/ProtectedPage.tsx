import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust the import path as necessary
import { useNavigation } from '@react-navigation/native';

// Define a TypeScript type for the properties you expect to pass into the component
type Props = {
  [key: string]: any;
};

const withAuth = (WrappedComponent: React.ComponentType<Props>) => {
  const Wrapper: React.FC<Props> = (props) => {
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
      // Navigate to the login screen if the user is not authenticated
      if (!user) {
        navigation.navigate('LoginScreenUser');
      }
    }, [user, navigation]);

    // Component renders only when user is available
    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
