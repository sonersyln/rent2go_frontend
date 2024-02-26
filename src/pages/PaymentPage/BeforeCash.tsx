import React, { useEffect } from "react";
import { Footer, Navbar, PriceCard } from "../../components";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import "./payment.css";
import { Form, Formik } from "formik";

import { useAuth } from "../../contexts/AuthContext";
import ReceiptPDF from "./Receipt";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { MailInfoModel } from "../../models/mail/MailInfıModel";
import MailService from "../../services/emailService/MailService";
import axios from "axios";
import { toast } from "react-toastify";

type Props = {};

const BeforeCash = (props: Props) => {
  const { t } = useTranslation();
  const { car } = useSelector((state: any) => state.rental);
  const { priceCard } = useSelector((state: any) => state.rental);
  const navigate = useNavigate();

  const auth = useAuth();
  const getCurrentDate = (): string => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const rentalInfo = useSelector((state: any) => state.rental);

  const handleButtonClick = async () => {
    const mailInfo: MailInfoModel = {
      name: rentalInfo.user.name + " " + rentalInfo.user.surname,
      email: rentalInfo.user.email,
      phone: rentalInfo.user.phoneNumber,
      startDate: new Date(rentalInfo.startDate),
      endDate: new Date(rentalInfo.endDate),
      totalDay: rentalInfo.day,
      plate: rentalInfo.car.plate,
      carInfo:
        rentalInfo.car.model.brand.name + " " + rentalInfo.car.model.name,
      totalPrice: rentalInfo.priceCard.totalPrice,
    };
    try {
      await MailService.cashSuccessful(mailInfo);
      toast.success("Mail sent successfully");
      setTimeout(() => {
        navigate("/payment/cash");
      }, 3000);
    } catch (error) {
      console.error("Mail post error", error);
    }
  };

  useEffect(() => {
    sessionStorage.setItem("rentalInfo", JSON.stringify(rentalInfo));
  }, [rentalInfo]);

  const currentDate = getCurrentDate();
  const { selectedPaymentMethod } = useParams<{
    selectedPaymentMethod: string;
  }>();
  const initialValues = () => {};
  const onSubmit = () => {};
  return (
    <>
      <Navbar />
      <div className="payment container-fluid">
        <div className="secContainer shadow-rounded-box">
          <div className="headingDiv">
            <h2>
              {t("cashPayment")} {selectedPaymentMethod}
            </h2>
          </div>
          <div className="contentDiv">
            <div className="informationContainer shadow-rounded-box">
              <h2>Sevgili Müşterimiz,</h2>
              <p>
                Rezervasyon işleminizi nakit ödeme seçeneği ile gerçekleştirmeyi
                seçtiniz. Lütfen aşağıdaki bilgileri dikkatlice okuyunuz:
              </p>

              <p>
                Rezervasyonunuz, seçtiğiniz araç ve belirttiğiniz tarihler için
                geçerlidir.
                <br />
                Ödemenizi, rezervasyonun başlangıç tarihinden önce şirketimizin
                ofisine gelerek gerçekleştirmeniz gerekmektedir.
                <br />
                Ödemenizi yapmadan önce lütfen rezervasyon bilgilerinizi kontrol
                edin ve onaylayın.
                <br />
                Ödeme yapılmadan araç teslimi gerçekleştirilmeyecektir.
                <br />
                Rezervasyonunuz ve ödemeniz hakkında herhangi bir sorunuz
                olursa, lütfen bizimle iletişime geçiniz.
              </p>

              <p>
                Bu bilgilendirme mesajını okuduğunuzu ve anladığınızı onaylamak
                için 'Kabul Et' butonuna tıklayınız. Kabul ettiğinizde,
                rezervasyon detaylarınızı içeren bir e-posta alacaksınız.
              </p>
            </div>
            <div className="formContainer shadow-rounded-box">
              <div className="row infoRow">
                <div className="col-xl-6 col-l-6 col-md-12 col-sm-12">
                  <div className="row ">
                    <div className="col-12">
                      <p>
                        <b>{t("name")} : </b>
                        {auth.authInformation.user.firstname}{" "}
                        {auth.authInformation.user.lastname}
                      </p>
                    </div>
                    <div className="col-12">
                      <p>
                        <b>{t("phone")} : </b>
                        {auth.authInformation.user.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-l-6 col-md-12 col-sm-12">
                  <div className="row">
                    <div className="col-12">
                      <p>
                        <b>{t("date")} : </b>
                        {currentDate}
                      </p>
                    </div>
                    <div className="col-12">
                      <p>
                        <b>{t("email")} : </b>
                        {auth.authInformation.user.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row amountRow">
                <div className="row">
                  <div className="col-xl-6 col-8">
                    <div className="row">
                      <div className="col-12 subAmountRow">
                        <p>
                          <b>{t("amount")} : </b>
                          {(
                            priceCard.totalPrice + priceCard.discountRate
                          ).toFixed(2)}{" "}
                          ₺
                        </p>
                      </div>
                      <div className="col-12 subAmountRow">
                        {" "}
                        <p>
                          <b>{t("discount")} : </b>
                          {priceCard.discountRate.toFixed(2)} ₺
                        </p>
                      </div>
                      <div className="col-12 subAmountRow">
                        {" "}
                        <p>
                          <b>{t("totalAmount")} : </b>
                          {priceCard.totalPrice.toFixed(2)} ₺
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-5 col-4 mt-3">
                    <div className="logoRow">
                      <img src="/assets/logo.png" alt="logo"/>
                    </div>
                  </div>
                </div>
              </div>

              <div className="btnRow">
                <button className="btn btn-warning" onClick={handleButtonClick}>
                  Accept
                </button>

                <Link
                  type="button"
                  to={`/reservation/${car.id}`}
                  className="btn btn-cancel"
                >
                  {t("cancel")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BeforeCash;
