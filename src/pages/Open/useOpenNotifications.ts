import { t } from "utils";

import { useToast } from "shared/Toast";

export const useOpenNotifications = () => {
  const toast = useToast();

  const success = () =>
    toast({
      status: "success",
      title: t("Open URL"),
      description: t("Success!"),
    });

  const failure = () =>
    toast({
      status: "error",
      title: t("Open URL"),
      description: t(
        "Something went wrong while opening. Please try again or contact us."
      ),
    });

  return [success, failure] as const;
};
