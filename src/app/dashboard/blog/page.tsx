import { Breadcrumbs } from "@/components/commons/Breadcrumbs";
import CreatePostButton from "@/components/buttons/CreatePostButton";
import { DataTableDemo } from "@/components/layout/BlogPostTable";
import PageContainer from "@/components/layout/PageContainer";
import axios from "axios";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Blog", link: "/dashboard/blog" },
];
export default async function page() {
  const response = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/blog/posts`
  );

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <CreatePostButton />

        <DataTableDemo posts={response.data.posts} />
      </div>
    </PageContainer>
  );
}
