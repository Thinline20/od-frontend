import type { LogType } from "./log";

type LogData = {
  fields: RawFields;
  model: string;
  pk: number;
};

type RawFields = {
  log: string;
  time: string;
  location: string;
};

type Fields = {
  log: LogType;
  time: Date;
  location: string;
};

/**
 * Fetch data from the server
 * @example
 * fetchWithRange(new Date("2021-08-01"), new Date("2021-08-02"))
 *
 * @param from Date object of the start date
 * @param to Date object of the end date
 * @param type "log" | "accident"
 */
export async function fetchWithRange(
  cctvId: string,
  from: Date,
  to: Date,
  type: "log" | "accident",
) {
  console.log(from);
  console.log(to);

  const urlBase = `${location.protocol}//${location.hostname}:8000/statistics`;
  const dateQuery = `dateFrom=${from.toISOString().slice(0, 10)}&dateTo=${to
    .toISOString()
    .slice(0, 10)}`;
  const url =
    type === "log"
      ? `${urlBase}/dateDetail?${dateQuery}`
      : `${urlBase}/accedentFindAll?${dateQuery}`;

  // cors
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  const data: LogData[] = JSON.parse(await response.json());

  if (data.length === 0) {
    return [];
  }

  return data.map((item) => {
    const rawFields = item.fields;
    return {
      log: JSON.parse(rawFields.log),
      time: new Date(rawFields.time),
      location: rawFields.location,
    } satisfies Fields;
  });
}

export function processData(data: Fields[], dataFor: "hour" | "day" | "month") {
  const processedData: { [key: string]: number } = {};

  data.forEach((item) => {
    const date = item.time;
    let key: string;

    switch (dataFor) {
      case "hour":
        key = date.getHours().toString();
        break;
      case "day":
        key = date.getDate().toString();
        break;
      case "month":
        key = date.getMonth().toString();
        break;
    }

    if (key in processedData) {
      processedData[key] += 1;
    } else {
      processedData[key] = 1;
    }
  });

  return processedData;
}
