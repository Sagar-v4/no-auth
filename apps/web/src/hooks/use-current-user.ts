export function useCurrentUser() {
  const client = {
    _id: "67ca9a078e591331d8e817f7",
    uuid: "32397c32-e584-4ced-b9da-e58128c7fab9",
    name: "sgr",
    email: "sagarvariya4@gmail.com",
    login_method: "EMAIL_OTP",
    status: "ACTIVE",
    roles: ["CLIENT"],
    createdAt: "2025-03-07T07:02:31.655Z",
    updatedAt: "2025-03-07T07:02:31.655Z",
  };

  const organization = {
    _id: "67ca9a198e591331d8e817f9",
    uuid: "504bc814-dc0a-4d0e-bda8-13dc93a45e3e",
    client_id: "67ca9a078e591331d8e817f7",
    name: "test",
    description: "gsdlmkldsmfkldsmkl",
    status: "ACTIVE",
    createdAt: "2025-03-07T07:02:49.096Z",
    updatedAt: "2025-03-07T07:02:49.096Z",
  };

  return { client, organization };
}
