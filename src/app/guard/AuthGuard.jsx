import { Outlet } from "react-router-dom";
import GullLayout from "app/view/layout/GullLayout";

export default function AuthGuard() {
  // 🚨 Tạm thời bỏ qua check login, ép authenticated = true
  const authenticated = true;

  if (!authenticated) {
    // Nếu muốn sau này redirect về signin thì để ở đây
    // return <Navigate to="/signin" />;
    return null;
  }

  // ✅ Luôn trả về GullLayout, render các route con bên trong
  return (
    <GullLayout>
      <Outlet />
    </GullLayout>
  );
}
