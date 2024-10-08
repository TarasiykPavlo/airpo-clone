import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import Profile from "./pages/Profile/Profile";

import Auth from "./pages/Auth/Auth";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Products from "./pages/Products/Products";
import Applications from "./pages/Applications/Applications";
import NewApplication from "./pages/NewApplication/NewApplication";
import PhoneValidation from "./pages/PhoneValidation/PhoneValidation";
import Settings from "./pages/Settings/Settings";
import BotSettings from "./pages/BotSettings/BotSettings";
import GroupsSettings from "./pages/GroupsSettings/GroupsSettings";
import Templates from "./pages/Templates/Templates";
import NewTemplate from "./pages/NewTemplate/NewTemplate";
import FAQ from "./pages/FAQ/FAQ";
import Payment from "./pages/Payment/Payment";
import UserAgreement from "./pages/UserAgreement/UserAgreement";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <Navigate
                  replace
                  to="profile"
                />
              }
            />
            <Route
              path="profile"
              element={<Profile />}
            />
            <Route
              path="products"
              element={<Products />}
            />
            <Route
              path="payment"
              element={<Payment />}
            />
            <Route
              path="applications"
              element={<Applications />}
            />
            <Route
              path="faq"
              element={<FAQ />}
            />
            <Route
              path="agreement"
              element={<UserAgreement />}
            />
            <Route
              path="policy"
              element={<PrivacyPolicy />}
            />
            <Route
              path="applications/new"
              element={<NewApplication />}
            />
            <Route
              path="applications/new/phone-validation"
              element={<PhoneValidation />}
            />

            <Route
              path="applications/settings"
              element={<Settings />}
            />
            <Route
              path="applications/bot-settings"
              element={<BotSettings />}
            />
            <Route
              path="applications/groups-settings"
              element={<GroupsSettings />}
            />
            <Route
              path="applications/templates"
              element={<Templates />}
            />
            <Route
              path="applications/templates/info"
              element={<NewTemplate />}
            />
          </Route>

          <Route
            path="login"
            element={<Auth />}
          />
          <Route
            path="login/:refid"
            element={<Auth />}
          />
          <Route
            path="signup"
            element={<Auth />}
          />
          <Route
            path="signup/:refid"
            element={<Auth />}
          />
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
