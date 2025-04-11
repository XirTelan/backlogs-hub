import { ButtonBase, Title } from "@/shared/ui";
import { toastCustom } from "@/shared/lib/toast";
import { useSession } from "@/shared/providers/sessionProvider";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteAccount = () => {
  const { user } = useSession();
  const router = useRouter();
  const handleSubmit = async () => {
    if (!user?.username) return;
    const res = await fetch(`/api/users/${user?.username}/`, {
      method: "DELETE",
    });
    if (res.ok) {
      toastCustom.success("Success");
      router.refresh();
    }
  };
  return (
    <div className=" max-w-sm bg-bg-main p-4 text-white md:max-w-xl">
      <Title variant={2} title={"Delete account"} />
      <p className="my-4">
        Once you delete your account, your profile and username are permanently
        removed. All backlogs(and content) and templates will be deleted.
      </p>
      <ButtonBase
        onClick={handleSubmit}
        text="Delete account"
        variant="dangerPrimary"
      ></ButtonBase>
    </div>
  );
};

export default DeleteAccount;
