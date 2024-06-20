import { useState } from "react";
import { fireauth } from "../firebase/config";

//미리 가입하기를 만듬
export const useSignup = () => {
  const [error, setError] = useState(); //에러메세지
  const [isPending, setIsPending] = useState(false); //인증진행중상태

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      // 이메일,패스워드로 가입
      const res = await fireauth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(res.user); //가입후 유저정보를 출력

      if (!res) {
        throw new Error("가입중 오류가 발생했습니다.");
      }
      // 유저 프로파일에 이름을 업데이트
      await res.user.updateProfile({ displayName: displayName });

      setError(null);
      setIsPending(false);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setIsPending(false);
    }
  };

  return { signup, error, isPending };
};
