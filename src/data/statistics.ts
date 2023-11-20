import type { LogType, AccidentType } from "./log";

type FetchData = {
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
 */
export async function fetchWithRange(cctvId: string, from: Date, to: Date) {
  const response = await fetch(
    `http://127.0.0.1:8000/statistics/dateDetail?dateFrom=${from
      .toISOString()
      .slice(0, 10)}&dateTo=${to.toISOString().slice(0, 10)}`,
  );

  const data: FetchData[] = JSON.parse(await response.json());

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

export function handleData(data: Fields[], type: "hour" | "day" | "month") {}
