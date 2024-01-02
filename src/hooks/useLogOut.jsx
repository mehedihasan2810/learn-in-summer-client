import { auth } from '../configs/firebase/firebase';
import { signOut } from 'firebase/auth';

const useLogOut = () => {
    const logOut = () => {
        return signOut(auth);
      };

      return logOut;
}

export default useLogOut