import React from "react";
import BreadCrumb from "../../components/elements/breadCrubm";
import TextInput from "../../components/elements/TextInput";
import TextArea from "../../components/elements/TextArea";
import Layout from "../../components/layouts/Layout";
import styles from "./styles.module.scss";
import BlueBotton from "../../components/elements/Buttons/BlueButton";
import { useState } from "react";
import Alert from "../../components/elements/Alert";
const About = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    phone: "",
    subject: "",
    message: "",
    fullname: "",
  });
  const [error, setError] = useState({
    email: "",
    phone: "",
    subject: "",
    message: "",
    fullname: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    alert: false,
    message: "",
    close: false,
  });
  const onChangeHandler = (e) => {
    setFormValue((values) => ({ ...values, [e.target.name]: e.target.value }));
  };
  const handleSend = () => {
    if (!formValue.email) {
      setError((error) => ({ ...error, email: "Required" }));
    }
    if (!formValue.phone) {
      setError((error) => ({ ...error, phone: "Required" }));
    }
    if (!formValue.message) {
      setError((error) => ({ ...error, message: "Required" }));
    }
    if (!formValue.subject) {
      setError((error) => ({ ...error, subject: "Required" }));
    }
    if (!formValue.fullname) {
      setError((error) => ({ ...error, fullname: "Required" }));
    }
    if (
      formValue.email &&
      formValue.phone &&
      formValue.subject &&
      formValue.phone &&
      formValue.message
    ) {
      setLoading(true);
      let reqOptions = {
        method: "POST",
        body: JSON.stringify({ formValue }),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      };
      fetch("/api/contact_us_email", reqOptions)
        .then((res) => {
          console.log(res);
          setLoading(false);
          if (res.statusText === "OK") {
            setAlert({
              alert: true,
              close: true,
              message: "Email successfully sended",
            });
          } else {
            setAlert({
              alert: true,
              close: true,
              error: true,
              message: "Something went wrong ",
            });
          }

          setError({
            email: "",
            phone: "",
            subject: "",
            message: "",
            fullname: "",
          });
          setFormValue({
            email: "",
            phone: "",
            subject: "",
            message: "",
            fullname: "",
          });
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <Layout title="Contact Us" keywords="Contact Us" description="Contact Us">
      <div className={styles.contact_section}>
        <BreadCrumb title="Contact Us" />
        {alert.alert ? (
          <Alert
            setAlert={setAlert}
            alert={alert}
            message={alert.message}
            close={alert.close}
            error={alert.error}
            warning={alert.warning}
          />
        ) : (
          ""
        )}
        <div className={styles.contact_area}>
          <div className={styles.contact_container}>
            <div className={styles.left}>
              <div className={styles.form_box}>
                <div className={styles.form_title_wrap}>
                  <h3 className={styles.title}>We'd love to hear from you</h3>
                  <p className={styles.desc}>
                    Send us a message and we'll respond as soon as possible
                  </p>
                </div>
                <div className={styles.form_content}>
                  <div className={styles.contact_form_action}>
                    <form className={styles.form}>
                      <div className={styles.input_box}>
                        <div className={styles.input}>
                          <TextInput
                            title="Full name"
                            name="fullname"
                            icon="user"
                            placeholder="Your Fullname"
                            type="text"
                            onChange={onChangeHandler}
                            value={formValue.fullname}
                            noMarginTop={true}
                            errorMessage={
                              !formValue.fullname && error.fullname
                                ? error.fullname
                                : ""
                            }
                          />
                        </div>
                        <div className={styles.input}>
                          <TextInput
                            title="Subject"
                            name="subject"
                            icon="square-minus"
                            placeholder="Subject"
                            type="text"
                            onChange={onChangeHandler}
                            value={formValue.subject}
                            errorMessage={
                              !formValue.subject && error.subject
                                ? error.subject
                                : ""
                            }
                            noMarginTop={true}
                          />
                        </div>
                      </div>
                      <div className={styles.input_box}>
                        <div className={styles.input}>
                          <TextInput
                            title="Email"
                            name="email"
                            icon="at"
                            placeholder="Your email"
                            type="text"
                            onChange={onChangeHandler}
                            value={formValue.email}
                            noMarginTop={true}
                            errorMessage={
                              !formValue.email && error.email ? error.email : ""
                            }
                          />
                        </div>
                        <div className={styles.input}>
                          <TextInput
                            title="Phone"
                            name="phone"
                            icon="phone"
                            placeholder="Your phone"
                            type="text"
                            onChange={onChangeHandler}
                            value={formValue.phone}
                            errorMessage={
                              !formValue.phone && error.phone ? error.phone : ""
                            }
                            noMarginTop={true}
                          />
                        </div>
                      </div>
                    </form>

                    <div className={`${styles.input} ${styles.inp_textarea}`}>
                      <TextArea
                        name="message"
                        icon="pen-to-square"
                        value={formValue.message}
                        onChange={onChangeHandler}
                        fromTrDetails={true}
                        title="Write message"
                        errorMessage={
                          !formValue.message && error.message
                            ? error.message
                            : ""
                        }
                      />
                    </div>
                    <div onClick={handleSend} className={styles.lodbtn}>
                      {loading ? (
                        <div className={`${styles.loading}`}>
                          <div className={styles.dot}></div>
                          <div className={styles.dot}></div>
                          <div className={styles.dot}></div>
                          <div className={styles.dot}></div>
                        </div>
                      ) : (
                        <BlueBotton
                          title="Send Message"
                          type=""
                          responsive={true}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.form_box}>
                <div className={styles.form_title_wrap}>
                  <div className={styles.form_title_wrap}>
                    <h3 className={styles.title}>Contact Us</h3>
                  </div>

                  <div className={styles.form_content}>
                    <div className={styles.address_book}>
                      <ul>
                        <li>
                          <i className="fa-solid fa-location-dot"></i>
                          <h5 className="title font-size-16 pb-1">Address</h5>
                          <p className="map__desc">
                            Aero House, 611 Sipson Road, West Drayton, UB7 0JD,
                            United Kingdom
                          </p>
                        </li>
                        <li>
                          <i className="fa-solid fa-phone"></i>
                          <h5 className="title font-size-16 pb-1">Phone</h5>
                          <p className="map__desc">+44 (0) 208 683 2330</p>
                        </li>

                        <li>
                          <i className="fa-solid fa-print"></i>
                          <h5 className="title font-size-16 pb-1">Fax</h5>
                          <p className="map__desc">+44 (0) 208 683 0884</p>
                        </li>

                        <li>
                          <i className="fa-solid fa-envelope"></i>
                          <h5 className="title font-size-16 pb-1">Email</h5>
                          <p className="map__desc">
                            info@heathrow-gatwick-transfers.com
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
