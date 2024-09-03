import { Breadcrumbs } from "@/components/commons/Breadcrumbs";
import { ProfileForm } from "@/components/forms/ProfileForm";
import PageContainer from "@/components/layout/PageContainer";
import { getServerSession } from "next-auth";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Profile", link: "/dashboard/profile" },
];
export default async function page() {
  const session = await getServerSession();
  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        {session.user?.name && session.user?.email ? (
          <ProfileForm
            user={{ name: session.user.name, email: session.user.email }}
          />
        ) : (
          <p>User infromation is incomplete</p>
        )}
      </div>
    </PageContainer>
  );
}
