export type PassColors = {
  appBg: string;
  headerBg: string;
  headerText: string;
  passBg: string;
  passText: string;
  passSubText: string;
  cardBg: string;
  cardText: string;
  cardSubText: string;
  accent: string;
  statusBg: string;
  statusText: string;
  dotActive: string;
  dotInactive: string;
};

export type PassData = {
  // Header bar
  logoText: string;
  headerTitle: string;

  // Passenger / route line
  passengerName: string;
  routeLabel: string;

  // Date + confirmation row
  dateLabel: string;
  confirmationLabel: string;
  confirmation: string;

  // Flight row
  originCode: string;
  originCity: string;
  destinationCode: string;
  destinationCity: string;
  flightNumber: string;

  // Gate / seat / group
  gateLabel: string;
  gate: string;
  seatLabel: string;
  seat: string;
  groupLabel: string;
  group: string;

  // Boarding times
  boardingPrefix: string;
  boardingTime: string;
  doorPrefix: string;
  doorCloseTime: string;

  // Inner card
  showTsaPre: boolean;
  memberName: string;
  memberLabel: string;
  qrData: string;
  bagLabel: string;

  // Bottom of card
  sequencePrefix: string;
  sequence: string;
  totalPages: number;
  currentPage: number;

  // Status pill below pass
  statusText: string;
  flightCode: string;

  // Colors
  colors: PassColors;
};
