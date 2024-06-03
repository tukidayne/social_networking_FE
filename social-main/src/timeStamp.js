import moment from "moment";

const timeStamp = (time) => {
  const dateNow = moment(Date.now());
  const dateParams = moment(time);
  const resultsSec = dateNow.diff(dateParams, "seconds");
  const resultsMin = dateNow.diff(dateParams, "minutes");
  const resultsOur = dateNow.diff(dateParams, "hours");
  const resultsDay = dateNow.diff(dateParams, "days");
  const resultsDetails = dateNow.format("D [Tháng] M [lúc] HH:mm");

  let results = null;
  if (resultsSec <= 60) {
    results = resultsSec + " giây trước";
  } else if (resultsMin <= 60) {
    results = resultsMin + " phút trước";
  } else if (resultsOur <= 24) {
    results = resultsOur + " tiếng trước";
  } else if (resultsDay <= 6) {
    results = resultsDay + " ngày trước";
  } else {
    results = resultsDetails;
  }
  return results;
};

export default timeStamp;
