import ContextEditor from "@/components/editor/ContextEditor";
import { Breadcrumbs } from "@/components/commons/Breadcrumbs";
import PageContainer from "@/components/layout/PageContainer";
import axios from "axios";

import "quill/dist/quill.snow.css";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Blog", link: "/dashboard/blog" },
];

export default async function Page({ params }: { params: { id: string } }) {
  const response = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/blog/load`,
    {
      params: { id: params.id },
    }
  );

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <ContextEditor post={response.data} />
      </div>
    </PageContainer>
  );
}
