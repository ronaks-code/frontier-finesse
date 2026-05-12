import type { PassData } from "./types";
import { PRESETS } from "./presets";

export const DEFAULT_PASS: PassData = {
  logoText: "F",
  headerTitle: "Boarding Pass",

  passengerName: "Ronak Agarwal",
  routeLabel: "TPA - DEN (1/2)",

  dateLabel: "Tue, May 12, 2026",
  confirmationLabel: "Confirmation:",
  confirmation: "FIY9MD",

  originCode: "TPA",
  originCity: "Tampa",
  destinationCode: "DEN",
  destinationCity: "Denver",
  flightNumber: "F9 1113",

  gateLabel: "Gate",
  gate: "E70",
  seatLabel: "Seat",
  seat: "17C",
  groupLabel: "Group",
  group: "3",

  boardingPrefix: "Boarding",
  boardingTime: "1:07 PM",
  doorPrefix: "Door closes",
  doorCloseTime: "1:32 PM",

  showTsaPre: true,
  memberName: "Ronak Agarwal",
  memberLabel: "Member",
  qrData: "BOARDINGPASS|F9|1113|TPA|DEN|17C|2026-05-12|FIY9MD",
  bagLabel: "Carry-On",

  sequencePrefix: "Seq.",
  sequence: "175",
  totalPages: 2,
  currentPage: 1,

  statusText: "On Time",
  flightCode: "F9 1113",

  colors: PRESETS[0].colors,
};
