import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed Out!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="text-[#14213d] px-3 font-bold bg-white hover:bg-[#f4f1de] rounded-md"
      data-testid="header-sign-out-button"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
