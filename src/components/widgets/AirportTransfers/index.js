import React from "react";
import styles from "./styles.module.scss";
import { airportTransfers } from "../../../constants/airportTransfers";
import BlueBotton from "../../elements/Buttons/BlueButton";
const sliderTrackRef = React.createRef(null);
const sliderConRef = React.createRef(null);

class AirportTransfers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStep: 1,
      visibleItems: sliderConRef?.current?.clientWidth / 355,
      steps: 0,
      isScrolling: false,
      clientX: 0,
      scrollX: 0,
    };
  }

  componentDidMount() {
    this.getPoint();
    window.addEventListener("resize", () => {
      this.getPoint();
    });
  }

  onMouseMove(e) {
    if (ref && ref.current && !ref?.current?.contains(e.target)) {
      return;
    }
    e.preventDefault();
    const { clientX, scrollX, isScrolling } = state;

    if (isScrolling) {
      ref.current.scrollLeft = scrollX + e.clientX - clientX;
      let sX = scrollX + e.clientX - clientX;
      let cX = e.clientX;
      this.setState({
        ...state,
        scrollX: sX,
        clientX: cX,
      });
    }
  }
  onMouseUp(e) {
    if (ref && ref?.current && !ref?.current?.contains(e.target)) {
      return;
    }
    e.preventDefault();
    this.setState({ ...state, isScrolling: false });
  }
  onMouseDown(e) {
    if (ref && ref.current && !ref?.current?.contains(e.target)) {
      return;
    }
    e.preventDefault();
    this.setState({ ...state, isScrolling: true, clientX: e.clientX });
  }
  //getting visible items number and steps
  getPoint() {
    let silderWidth;
    if (sliderTrackRef?.current?.clientWidth) {
      silderWidth = sliderTrackRef?.current?.clientWidth;
    }
    let silderConWidth;
    if (sliderConRef?.current?.clientWidth) {
      silderConWidth = sliderConRef?.current?.clientWidth;
    }
    let items = Math.floor(silderConWidth / 355);
    let steps = Math.floor(silderWidth / (355 * items)) + 1;
    this.setState({ visibleItems: items, steps });
  }

  scrolling(i) {
    let left = this.state.visibleItems * 355 * i;
    document.getElementById("test").scrollTo({
      left: left,
      behavior: "smooth",
    });
    this.setState({ selectedStep: i + 1 });
  }
  componentWillUnmount() {
    this.getPoint();
    try {
      window.removeEventListener("mousedown");
      window.removeEventListener("mouseup");
      window.removeEventListener("mousemove");
      window.removeEventListener("resize", getPoint);
    } catch (error) {}
  }
  render() {
    return (
      <div className={styles.transfers_container} ref={sliderConRef}>
        <h2 className={styles.transfer_title}>Airport Transfers</h2>
        <div
          className={styles.slider_track}
          data-id="check"
          id="test"
          ref={sliderTrackRef}
        >
          {airportTransfers.map((item) => {
            return (
              <div key={item.id} className={styles.card}>
                <div className={styles.img_div}>
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className={styles.img_original}
                  />
                </div>
                <div className={styles.card_desc}>
                  <h2 className={styles.card_desc_title}>{item.title}</h2>
                  <div className={styles.card_desc_subtitle}>
                    <p className={styles.title}>Sub Description</p>
                    <div className={styles.card_detail_btn_box}>
                      <button className={styles.detail_btn}>See Details</button>
                      <p className={styles.detail_arrow_icon}>{`${">"}`}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.thumbnails}>
          {/* {this.state.steps &&
            Array.from(new Array(this.state.steps)).map((x, i) => {
              return (
                <p
                  style={{
                    backgroundColor:
                      this.state.selectedStep === i + 1 ? "blue" : "silver",
                  }}
                  key={i}
                  className={styles.thumb}
                  onClick={(e) => {
                    this.scrolling(i);
                  }}
                ></p>
              );
            })} */}
        </div>

        <div className={styles.btn_box}>
          <div className={styles.div}>
            <BlueBotton title="Read More" />
          </div>
        </div>
      </div>
    );
  }
}

export default AirportTransfers;
