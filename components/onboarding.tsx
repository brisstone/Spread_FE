import { Props } from "@/types/props";
import Glass from "./glass";
import Image from "next/image";
import Background from "./background";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
// import FacebookLogin from "react-facebook-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useState } from "react";

export default function Onboarding({ children, className }: Props) {
  return (
    <Background>
      <div
        className={`min-h-screen w-full min-w-full box-border flex justify-center items-center flex-col ${className}`}
      >
        {children}
      </div>
    </Background>
  );
}

export function OnboardingGlass({ children }: Props) {
  return (
    <Glass>
      <div className="px-12 py-9 flex flex-col items-center">{children}</div>
    </Glass>
  );
}

export function Social({
  success,
  authError,
}: {
  success: any;
  authError: any;
}) {
  const [loginFacebook, setloginFacebook] = useState(false);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => success(codeResponse),
    onError: (error) => authError(error),
  });
  const responseFacebook = (response: any) => {
    console.log(response);
    // setData(response);
    // setPicture(response.picture.data.url);
    if (response.accessToken) {
      setloginFacebook(true);
    } else {
      setloginFacebook(false);
    }
  };
  return (
    <div className="flex justify-evenly items-center gap-4 mt-8">
      {["facebook", "apple", "google"].map((m) => (
        <Glass key={m} className="rounded-2xl">
          <div className="flex justify-center items-center p-6">
            {m == "google" && (
              <Image
                priority
                src={`/images/${m}.svg`}
                height={25}
                width={25}
                alt={`${m} logo`}
                onClick={() => login()}
                className="cursor-pointer"
              />
            )}

            {m == "facebook" && (
              // <Image
              //   priority
              //   src={`/images/${m}.svg`}
              //   height={25}
              //   width={25}
              //   alt={`${m} logo`}
              //   onClick={() => login()}
              //   className="cursor-pointer"
              // />
              <>
                {" "}
                {!loginFacebook && (
                  <FacebookLogin
                    appId="675301831110231"
                    // autoLoad
                    autoLoad={true}
                    fields="first_name, last_name, email, picture, birthday"
                    scope="public_profile, email, user_birthday"
                    returnScopes={true}
                    callback={responseFacebook}
                    render={(renderProps) => (
                      <Image
                        priority
                        src={`/images/${m}.svg`}
                        height={25}
                        width={25}
                        alt={`${m} logo`}
                        // onClick={() => login()}
                        className="cursor-pointer"
                      />
                    )}
                  />
                )}{" "}
                {loginFacebook && (
                  <Image
                    priority
                    src={`/images/${m}.svg`}
                    height={25}
                    width={25}
                    alt={`${m} logo`}
                    // onClick={() => login()}
                    className="cursor-pointer"
                  />
                )}
              </>
            )}
            {m == "apple" && (
              <Image
                priority
                src={`/images/${m}.svg`}
                height={25}
                width={25}
                alt={`${m} logo`}
              />
            )}
          </div>
        </Glass>
      ))}
    </div>
  );
}
