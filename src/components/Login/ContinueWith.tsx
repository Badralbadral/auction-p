import { FBook } from "@/svgs/Fbook";
import { Button, Stack, Typography } from "@mui/material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export const ContinueWith = () => {
  const id: string = process.env.CLIENT_ID as string;
  return (
    <Stack gap={`16px`} mb={`26px`}>
      <GoogleOAuthProvider clientId={id}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
      <Button
        sx={{
          color: `#151515`,
          textTransform: `none`,
          border: `1px solid #E0E0E0`,
          width: 376,
          height: 48,
        }}
      >
        <Stack position={`relative`} right={75}>
          <FBook />
        </Stack>
        <Typography fontSize={16} fontWeight={500}>
          Continue with Facebook
        </Typography>
      </Button>
    </Stack>
  );
};
