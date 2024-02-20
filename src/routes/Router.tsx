import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { PaymentProvider } from "../contexts/PaymentContext";

import {
  CarPage,
  HomePage,
  Register,
  BrandPage,
  OurTeamPage,
  ContactPage,
  PrivacyPolicy,
  ReservationPage,
  CookiePolicy,
  TermsOfUse,
  ProfilePage,
  NotFoundPage,
  Online,
  BankTransfer,
  Cash,
  CopyrightNotice,
  CRandComplaintProcedures,
  InsuranceInformation,
  LegalNotices,
  RentalAgreement,
  RentalConditions,
  SecurityNotices,
  TermsAndConditions,
  VehicleConditionReports,
  ResetPassword,
  ChangePassword,
  VerificationSuccessful,
  SuccessfulPayment,
  SuccessfulResetPassword,
  FailedPayment,
} from "../pages";

const Router = () => {
  return (
    <PaymentProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/*auth pages */}
        <Route path="/sign-in/reset-password" element={<ResetPassword />} />
        <Route path="/sign-in/change-password" element={<ChangePassword />} />
        <Route path="/sign-in" element={<Register />} />

        {/*navbar pages */}
        <Route path="/profile/:activepage" element={<ProfilePage />} />
        <Route path="/cars" element={<CarPage />} />
        <Route path="/our-team" element={<OurTeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/*legal pages */}
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/copyright-notice" element={<CopyrightNotice />} />
        <Route path="/cr-complaint-procedures" element={<CRandComplaintProcedures />}/>
        <Route path="/insurance" element={<InsuranceInformation />} />
        <Route path="/legal-notices" element={<LegalNotices />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/rental-agreements" element={<RentalAgreement />} />
        <Route path="/rental-conditions" element={<RentalConditions />} />
        <Route path="/security-notices" element={<SecurityNotices />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/vehicle-condition-reports" element={<VehicleConditionReports />}/>

        {/*payment & reservation pages */}
        <Route path="/reservation/:id" element={<ReservationPage />} />
        <Route path="/payment/cash" element={<Cash />} />
        <Route path="/payment/online" element={<Online />} />
        <Route path="/payment/bankTransfer" element={<BankTransfer />} />

        {/*response pages */}
        <Route path="/payment-successful" element={<SuccessfulPayment />} />
        <Route path="/payment-failed" element={<FailedPayment />} />
        <Route path="/reset-password-successful" element={<SuccessfulResetPassword />}/>
        <Route path="/email-verification-successful" element={<VerificationSuccessful />}/>
      </Routes>
    </PaymentProvider>
  );
};
export default Router;
