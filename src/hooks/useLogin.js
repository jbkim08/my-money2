import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { fireauth } from "../firebase/config";

export const useLogin = () => {
  const [error, setError] = useState(); //에러메세지
  const [isPending, setIsPending] = useState(false); //인증진행중상태
  const { dispatch } = useAuthContext(); //컨텍스트를 가져옴

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      //유저 로그인
      const res = await fireauth.signInWithEmailAndPassword(email, password);
      //로그인 액션 디스패치 => 스테이트 객체에 user가 업데이트 됨
      dispatch({ type: "LOGIN", payload: res.user });

      setError(null);
      setIsPending(false);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { login, error, isPending };
};
