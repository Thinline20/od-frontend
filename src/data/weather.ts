// prettier-ignore
export const getWeather = async (
  locationX: number,
  locationY: number,
  date: Date,
) => {
  const formattedDate = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
  const formattedTime = `${date.getHours()}${date.getMinutes()}`;

  let url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";

  url += "?" + encodeURIComponent("serviceKey") + "=" + "서비스키";
  url += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1");
  url += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("1000");
  url += "&" + encodeURIComponent("dataType") + "=" + encodeURIComponent("XML");
  url += "&" + encodeURIComponent("base_date") + "=" + encodeURIComponent(formattedDate);
  url += "&" + encodeURIComponent("base_time") + "=" + encodeURIComponent(formattedTime);
  url += "&" + encodeURIComponent("nx") + "=" + encodeURIComponent(locationX);
  url += "&" + encodeURIComponent("ny") + "=" + encodeURIComponent(locationY);

  const response = await fetch(url);

  return await response.json();
};
