import { t } from "utils";

import { Page, PageHeader } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";
import { useSearchParams } from "shared/Router";

import { withRequireImage } from "modules/image/application";

const PreviewPage = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url') || undefined;

  return (
    <Page>
      <PageHeader
        title={t("List of selected products")}
        description={t(
          "a description"
        )}
      >
      </PageHeader>
      <img src={url} />
    </Page>
  );
};

export const Component = PreviewPage; //withRequireImage(PreviewPage, { to: "/open" });

export const ErrorBoundary = ErrorPageStrategy;
