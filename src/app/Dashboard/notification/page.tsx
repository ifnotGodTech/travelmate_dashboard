import { NotificationModule } from "@/components/molecues/notification/NotificationModule";
import { getCookies } from "@/context/Auth-Cookies";

const page = async ({ params }: { params: { sessionId: string } }) => {
  const { accessToken } = await getCookies();
  return <NotificationModule accessToken={accessToken} />;
};

export default page;
