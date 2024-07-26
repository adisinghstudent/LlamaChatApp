import { appleAuth } from '@invertase/react-native-apple-authentication';
import { auth } from './firebaseConfig';
import { OAuthProvider, signInWithCredential } from 'firebase/auth';

export const signInWithApple = async () => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = OAuthProvider.credential(identityToken, nonce);

    const userCredential = await signInWithCredential(auth, appleCredential);
    return userCredential;
  } catch (error) {
    console.error('Error signing in with Apple', error);
    throw error;
  }
};
